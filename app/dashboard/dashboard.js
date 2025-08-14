"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import {
  MdSlideshow,
  MdMenuBook,
  MdDescription,
  MdEventNote,
  MdAnnouncement,
} from "react-icons/md";

export default function DashboardPage() {
  const [username, setUsername] = useState("");
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchLatestPosts();
  }, []);

  async function fetchUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("users")
      .select("name")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setUsername(data.name);
    }
  }

  async function fetchLatestPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("title, type, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    if (!error && data) {
      setLatestPosts(data);
    }
  }

  return (
    <div className="md:p-6 p-0 space-y-2 gap-2 grid">
      <h1 className="text-2xl font-semibold mb-6">
        Welcome{username ? `, ${username}` : ""}
      </h1>
      <div className="bg-white rounded-lg shadow md:p-6 p-0">
        <h2 className="text-xl font-semibold mb-4">Akses Cepat</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            href="/dashboard/sliders/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
          >
            <MdSlideshow size={18} /> Create Sliders
          </Link>
          <Link
            href="/dashboard/renungan/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
          >
            <MdMenuBook size={18} /> Create Renungan
          </Link>
          <Link
            href="/dashboard/warta/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
          >
            <MdDescription size={18} /> Create e-Warta
          </Link>
          <Link
            href="/dashboard/liturgi/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
          >
            <MdEventNote size={18} /> Create e-Liturgi
          </Link>
          <Link
            href="/dashboard/berita/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
          >
            <MdAnnouncement size={18} /> Create Berita
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow md:p-6 p-0">
        <h2 className="text-xl font-semibold mb-4">Konten Terbaru</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Judul</th>
              <th className="py-2 px-4">Jenis</th>
              <th className="py-2 px-4">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {latestPosts.map((post, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{post.title}</td>
                <td className="py-2 px-4">{post.type}</td>
                <td className="py-2 px-4">
                  {new Date(post.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
            {latestPosts.length === 0 && (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  Belum ada konten.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
