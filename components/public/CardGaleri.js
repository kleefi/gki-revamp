"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import Loading from "./Loading";

export default function CardGaleri({ limit, ctaLabel, showPagination = true }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalAlbums, setTotalAlbums] = useState(0);

  useEffect(() => {
    fetchAlbums(page);
    if (page >= 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, limit]);

  async function fetchAlbums(currentPage) {
    setLoading(true);
    const from = (currentPage - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("albums")
      .select("id, title, created_at, image_url, slug", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching albums:", error);
    } else {
      setAlbums(data);
      setTotalAlbums(count || 0);
    }
    setLoading(false);
  }

  if (loading) return <Loading />;
  if (albums.length === 0) return <p>Tidak ada data galeri</p>;
  function truncateWords(text, wordLimit) {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return (
    <>
      {albums.map((post) => (
        <div
          key={post.id}
          className="rounded-md grid md:grid-cols-2 grid-cols-1 items-center gap-4 p-4 md:w-full"
        >
          <div className="w-full mx-auto">
            <Image
              className="object-cover rounded-xl h-[400px]"
              src={post.image_url || "/default.jpg"}
              height={400}
              width={450}
              alt={post.title}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 mt-2">{post.title}</h3>
            <span className="block pb-2">
              {new Date(post.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <div
              className="prose max-w-none hidden"
              dangerouslySetInnerHTML={{
                __html: truncateWords(post.content, 15),
              }}
            />
            <Link
              className="inline-block rounded-md my-4 py-2 px-4 bg-[#0176CE] text-white font-bold"
              href={`/galeri/${post.slug}`}
            >
              {ctaLabel}
            </Link>
            <Link
              href=""
              className="block rounded-md mt-[20px] text-[#555555] font-semibold"
            ></Link>
          </div>
        </div>
      ))}
      {showPagination && totalAlbums > limit && (
        <div className="col-span-full flex mx-auto text-center justify-center mt-8 space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>
          <span className="px-4 py-2">Halaman {page}</span>
          <button
            onClick={() =>
              setPage((p) => (p * limit < totalAlbums ? p + 1 : p))
            }
            disabled={page * limit >= totalAlbums}
            className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
