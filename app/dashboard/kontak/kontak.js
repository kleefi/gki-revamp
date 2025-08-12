"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { FaTrash } from "react-icons/fa";
import Loading from "@/components/public/Loading";

export default function ListKontak() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalcontacts, setTotalContacts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  useEffect(() => {
    fetchcontacts();
  }, [currentPage, searchTerm]);

  async function fetchcontacts() {
    setLoading(true);

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize - 1;

    // Hitung total data sesuai search
    const { count } = await supabase
      .from("contacts")
      .select("*", { count: "exact", head: true })
      .ilike("name", `%${searchTerm}%`);

    setTotalContacts(count || 0);

    // Ambil data sesuai range & search
    const { data, error } = await supabase
      .from("contacts")
      .select("id, name, phone, email, message,created_at")
      .ilike("name", `%${searchTerm}%`)
      .order("created_at", { ascending: false })
      .range(start, end);

    if (error) {
      console.error("Error fetching contacts:", error);
    } else {
      setContacts(data);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Yakin mau hapus data ini?")) return;
    const { error } = await supabase.from("contacts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting contact:", error);
    } else {
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    }
  }

  const totalPages = Math.ceil(totalcontacts / pageSize);

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Cari contact..."
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
                <th className="text-left px-4 py-2 ">Sender</th>
                <th className="text-left px-4 py-2 ">Phone</th>
                <th className="text-left px-4 py-2 ">Email</th>
                <th className="text-left px-4 py-2 ">Message</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="text-left px-4 py-2">{item.name}</td>
                    <td className="text-left px-4 py-2">{item.phone ?? "-"}</td>
                    <td className="text-left px-4 py-2">{item.email}</td>
                    <td className="text-left px-4 py-2">{item.message}</td>
                    <td className="text-left px-4 py-2">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="text-left px-4 py-2 space-x-2">
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
                  <td colSpan="6" className="text-center py-4">
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
