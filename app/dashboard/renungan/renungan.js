"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/public/Loading";

export default function ListRenungan() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, [currentPage, searchTerm]);

  async function fetchPosts() {
    setLoading(true);

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize - 1;

    // Hitung total data sesuai search
    const { count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("type", "renungan")
      .ilike("title", `%${searchTerm}%`);

    setTotalPosts(count || 0);

    // Ambil data sesuai range & search
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, created_at, type")
      .eq("type", "renungan")
      .ilike("title", `%${searchTerm}%`)
      .order("created_at", { ascending: false })
      .range(start, end);

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data);
    }
    setLoading(false);
  }

  function handleEdit(id) {
    router.push(`/dashboard/renungan/edit/${id}`);
  }
  async function handleDelete(id) {
    if (!confirm("Yakin mau hapus data ini?")) return;
    try {
      const { data: sliderData, error: fetchError } = await supabase
        .from("posts")
        .select("image_url")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      // 2. Kalau ada gambar, coba hapus dari storage
      if (sliderData?.image_url) {
        try {
          const urlParts = sliderData.image_url.split("/");
          const fileName = urlParts[urlParts.length - 1];
          const folderPath = urlParts
            .slice(urlParts.indexOf("images") + 1, -1)
            .join("/");
          const fullPath = folderPath ? `${folderPath}/${fileName}` : fileName;

          const { error: storageError } = await supabase.storage
            .from("images") // ganti dengan nama bucket Anda
            .remove([fullPath]);

          if (storageError) console.warn("Gagal hapus gambar:", storageError);
        } catch (imgErr) {
          console.warn("Error saat parsing atau hapus gambar:", imgErr);
        }
      }

      // 3. Hapus data dari tabel
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // 4. Update state lokal
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post and/or image:", error);
    }
  }

  const totalPages = Math.ceil(totalPosts / pageSize);

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Cari judul renungan..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset ke page 1 setiap search berubah
          }}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 md:w-1/2">Title</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="text-left px-4 py-2">{item.title}</td>
                    <td className="text-left px-4 py-2">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="text-left px-4 py-2 space-x-2">
                      <Link
                        href={`/renungan/${item.slug}`}
                        target="_blank"
                        className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded inline-flex items-center gap-1"
                      >
                        <FaEye /> View
                      </Link>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded inline-flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded inline-flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
