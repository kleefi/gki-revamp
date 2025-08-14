"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function Slug({ post }) {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (!post?.id) return;

    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("album_id", post.id);

      if (!error) {
        setGallery(data);
      }
    };

    fetchImages();
  }, [post?.id]);

  if (!post) return <p>Post tidak ditemukan</p>;

  return (
    <div>
      <h1 className="lg:text-4xl text-xl font-semibold">{post.title}</h1>
      <p className="mt-2 mb-4 text-black">
        Published on:{" "}
        {new Date(post.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Cover Album */}
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full md:h-[550px] h-[250px] object-cover rounded-lg mb-6"
        />
      )}

      {/* Deskripsi */}
      <div
        className="prose max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Gallery Foto */}
      {gallery.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Foto Album</h2>
          <PhotoProvider>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((img) => (
                <PhotoView key={img.id} src={img.image_url}>
                  <img
                    src={img.image_url}
                    alt={img.description || "Foto album"}
                    className="w-full h-48 object-cover rounded-lg shadow cursor-zoom-in hover:scale-105 transition-transform"
                  />
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        </>
      )}
    </div>
  );
}
