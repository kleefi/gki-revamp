"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import Loading from "./Loading";

export default function Card({ type, limit, ctaLabel, showPagination = true }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    if (type) {
      fetchPosts(page);
    }
  }, [type, page, limit]);

  async function fetchPosts(currentPage) {
    setLoading(true);
    const from = (currentPage - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("posts")
      .select("id, title, created_at, image_url, slug,content", {
        count: "exact",
      })
      .eq("type", type)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data);
      setTotalPosts(count || 0);
    }
    setLoading(false);
  }

  if (loading) return <Loading />;
  if (posts.length === 0) return <p>Tidak ada data {type}</p>;
  function truncateWords(text, wordLimit) {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-md bg-white p-4 flex mx-auto flex-col md:w-full w-11/12"
          >
            <div className="w-full mx-auto">
              <Image
                className="object-cover max-h-[200px]"
                src={post.image_url || "/default.jpg"}
                height={50}
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
                href={`/${type}/${post.slug}`}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        ))}
      </div>
      {showPagination && totalPosts > limit && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>
          <span className="px-4 py-2">Halaman {page}</span>
          <button
            onClick={() => setPage((p) => (p * limit < totalPosts ? p + 1 : p))}
            disabled={page * limit >= totalPosts}
            className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
