"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function CreateWarta() {
  const [title, setTitle] = useState("");
  const [cta, setCta] = useState("");
  const [type, setType] = useState("ewarta");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const createSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  const slug = createSlug(title);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imagePath = null;

      if (file) {
        const filePath = `${type}/${slug}-${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        imagePath = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from("posts").insert([
        {
          title,
          type,
          slug,
          content,
          cta_link: cta,
          image_url: imagePath,
        },
      ]);

      if (insertError) throw insertError;

      setMessage("Berhasil menyimpan data!");
      setTitle("");
      setCta("");
      setType("ewarta");
      setContent("");
      setFile(null);
      setPreviewUrl("");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow border-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">CTA Link</label>
            <input
              type="text"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold">Isi</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={6}
            />
          </div>

          <div>
            <label className="block font-semibold">Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border-2 rounded-lg px-8 py-4 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full rounded-lg shadow"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">Preview gambar</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="block w-full cursor-pointer mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>

      {message && (
        <p className="mt-4 text-center font-medium text-green-600">{message}</p>
      )}
    </form>
  );
}
