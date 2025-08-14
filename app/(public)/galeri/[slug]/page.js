import Slug from "./slug";
import { supabase } from "@/utils/supabase/client";

export async function generateMetadata({ params }) {
  const { slug } = params;
  function truncateWords(text, wordLimit) {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  const { data: post, error } = await supabase
    .from("albums")
    .select("title")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    return {
      title: "Post tidak ditemukan - GKI Kranggan BAJEM Cileungsi",
    };
  }
  return {
    title: `${post.title} - GKI Kranggan BAJEM Cileungsi`,
    description:
      truncateWords(post.content, 15) ||
      "Detail post dari GKI Kranggan BAJEM Cileungsi",
  };
}

export default async function DetailPosts({ params }) {
  const { slug } = params;

  const { data: post, error } = await supabase
    .from("albums")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    return <p>Post tidak ditemukan</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto md:pt-46 pt-30 md:px-0 px-8">
      <Slug post={post} />
    </div>
  );
}
