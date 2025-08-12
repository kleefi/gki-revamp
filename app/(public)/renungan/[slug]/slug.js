"use client";

export default function Slug({ post }) {
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
