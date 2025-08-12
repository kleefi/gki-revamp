"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";

export default function Card({ type }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (type) {
      fetchPosts();
    }
  }, [type]);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, created_at, image_url, slug")
      .eq("type", type)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data);
    }
    setLoading(false);
  }

  if (loading) return <p>Loading...</p>;
  if (posts.length === 0) return <p>Tidak ada data {type}</p>;

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-md bg-white p-4 flex mx-auto flex-col md:w-full w-11/12"
        >
          <div className="w-full mx-auto">
            <Image
              className="object-cover"
              src={post.image_url || "/default.jpg"}
              height={50}
              width={450}
              alt={post.title}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 mt-2">{post.title}</h3>
            <span className="inline-block pb-2">
              {new Date(post.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <p className="text-gray-600">{post.excerpt}</p>
            <Link
              className="inline-block rounded-md my-4 py-2 px-4 bg-[#0176CE] text-white font-bold"
              href={`/${type}/${post.slug}`}
            >
              Selengkapnya
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
