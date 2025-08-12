"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Loading from "@/components/public/Loading";

export default function Slug() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  async function fetchPost() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
    } else {
      setPost(data);
    }
    setLoading(false);
  }

  if (loading) return <Loading />;
  if (!post) return <p>Post tidak ditemukan</p>;

  return (
    <div>
      <h1 className="lg:text-4xl text-xl font-semibold">{post.title}</h1>
      <p className="mt-2 mb-4 text-black">
        Created at {new Date(post.created_at).toLocaleDateString()}
      </p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full md:h-[550px] h-[250px] object-cover rounded-lg mb-6"
        />
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
