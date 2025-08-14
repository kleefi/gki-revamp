"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/public/Loading";

export default function ListGaleri() {
  const [albums, setAlbums] = useState([]);
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
      .from("albums")
      .select("*", { count: "exact", head: true })
      .ilike("title", `%${searchTerm}%`);

    setTotalPosts(count || 0);

    // Ambil data sesuai range & search
    const { data, error } = await supabase
      .from("albums")
      .select("id, title, slug,description, created_at")
      .ilike("title", `%${searchTerm}%`)
      .order("created_at", { ascending: false })
      .range(start, end);

    if (error) {
      console.error("Error fetching albums:", error);
    } else {
      setAlbums(data);
    }
    setLoading(false);
  }

  function handleEdit(id) {
    router.push(`/dashboard/galeri/edit/${id}`);
  }
  async function handleDelete(id) {
    if (!confirm("Yakin mau hapus data ini beserta semua fotonya?")) return;

    try {
      // 1️⃣ Ambil cover album
      const { data: albumData, error: albumError } = await supabase
        .from("albums")
        .select("image_url")
        .eq("id", id)
        .single();

      if (albumError) throw albumError;

      // 2️⃣ Ambil semua foto gallery
      const { data: imagesData, error: imagesError } = await supabase
        .from("images")
        .select("image_url")
        .eq("album_id", id);

      if (imagesError) throw imagesError;

      // 3️⃣ Gabungkan semua URL jadi satu array
      const allUrls = [
        albumData?.image_url,
        ...imagesData.map((img) => img.image_url),
      ].filter(Boolean); // buang yang null/undefined

      // 4️⃣ Ubah dari public URL → path di storage
      const storagePaths = allUrls.map((url) =>
        url.replace(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/`,
          ""
        )
      );

      // 5️⃣ Hapus file dari storage
      if (storagePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("images")
          .remove(storagePaths);
        if (storageError) console.warn("Gagal hapus file:", storageError);
      }

      // 6️⃣ Hapus semua foto dari tabel `images`
      await supabase.from("images").delete().eq("album_id", id);

      // 7️⃣ Hapus album dari tabel `albums`
      await supabase.from("albums").delete().eq("id", id);

      // 8️⃣ Update state lokal
      setAlbums((prev) => prev.filter((post) => post.id !== id));

      alert("Album dan semua fotonya sudah dihapus!");
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  }

  const totalPages = Math.ceil(totalPosts / pageSize);

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Cari judul album..."
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
                <th className="text-left px-4 py-2">Title</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {albums.length > 0 ? (
                albums.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="text-left px-4 py-2">{item.title}</td>
                    <td className="text-left px-4 py-2">{item.description}</td>
                    <td className="text-left px-4 py-2">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="text-left px-4 py-2 space-x-2">
                      <Link
                        href={`/galeri/${item.slug}`}
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
                  <td colSpan="4" className="text-center py-4">
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
