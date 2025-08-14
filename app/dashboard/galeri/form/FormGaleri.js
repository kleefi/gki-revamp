"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function FormGaleri({ id }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [oldCoverUrl, setOldCoverUrl] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const createSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  const slug = createSlug(title);

  // Ambil data lama kalau edit
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("albums")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setTitle(data.title);
      setDescription(data.description);
      setCoverPreview(data.image_url || "");
      setOldCoverUrl(data.image_url || "");

      // Ambil gambar dari tabel images
      const { data: imagesData, error: imagesError } = await supabase
        .from("images")
        .select("*")
        .eq("album_id", id);

      if (!imagesError && imagesData) {
        setGalleryPreview(imagesData.map((img) => img.image_url));
      }
    };

    fetchData();
  }, [id]);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
    setGalleryPreview((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const uploadFileToStorage = async (file, folderSlug) => {
    const filePath = `${folderSlug}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let coverUrl = oldCoverUrl;

      // Upload cover kalau ada file baru
      if (coverFile) {
        coverUrl = await uploadFileToStorage(coverFile, `albums/${slug}`);
      }

      let albumId = id;

      if (!id) {
        // CREATE ALBUM
        const { data: albumData, error: insertError } = await supabase
          .from("albums")
          .insert([
            {
              title,
              description,
              slug,
              image_url: coverUrl,
            },
          ])
          .select("id")
          .single();

        if (insertError) throw insertError;
        albumId = albumData.id;
      } else {
        // UPDATE ALBUM
        const { error: updateError } = await supabase
          .from("albums")
          .update({
            title,
            description,
            slug,
            image_url: coverUrl,
          })
          .eq("id", id);

        if (updateError) throw updateError;
      }

      // Upload semua file gallery baru ke tabel images
      if (galleryFiles.length > 0) {
        const imagesToInsert = [];
        for (const file of galleryFiles) {
          const imgUrl = await uploadFileToStorage(file, `albums/${slug}`);
          imagesToInsert.push({
            album_id: albumId,
            image_url: imgUrl,
            description: "",
          });
        }

        const { error: imgInsertError } = await supabase
          .from("images")
          .insert(imagesToInsert);

        if (imgInsertError) throw imgInsertError;
      }

      setMessage(id ? "Album berhasil diupdate!" : "Album berhasil dibuat!");
      if (!id) {
        setTitle("");
        setDescription("");
        setCoverFile(null);
        setCoverPreview("");
        setGalleryFiles([]);
        setGalleryPreview([]);
        setOldCoverUrl("");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow border-2 space-y-6"
    >
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
        <label className="block font-semibold">Deskripsi</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Cover Album</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className="w-full border-2 rounded-lg px-8 py-4 cursor-pointer"
        />
        {coverPreview && (
          <img
            src={coverPreview}
            alt="Cover Preview"
            className="mt-2 w-full rounded-lg shadow"
          />
        )}
      </div>

      <div>
        <label className="block font-semibold">Foto Galeri</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
          className="w-full border-2 rounded-lg px-8 py-4 cursor-pointer"
        />
        {galleryPreview.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-2">
            {galleryPreview.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Preview ${idx}`}
                className="w-full h-32 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Menyimpan..." : id ? "Update" : "Create"}
      </button>

      {message && (
        <p className="mt-4 text-center font-medium text-green-600">{message}</p>
      )}
    </form>
  );
}
