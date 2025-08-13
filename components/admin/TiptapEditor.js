"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";

export default function TiptapEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Pastikan semua fitur StarterKit diaktifkan
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: true,
        orderedList: true,
        blockquote: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  useEffect(() => {
    if (!editor) return;
    if (content) {
      editor.commands.setContent(content);
    }
    return () => {
      editor.destroy();
    };
  }, [editor, content]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-2">
      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap gap-2">
        {/* Basic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("paragraph") ? "bg-gray-300" : ""
          }`}
        >
          Paragraph
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-2 py-1 border rounded ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("bulletList") ? "bg-gray-300" : ""
          }`}
        >
          Bullet List
        </button>

        {/* Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
          }`}
        >
          Left
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
          }`}
        >
          Center
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
          }`}
        >
          Right
        </button>

        {/* Quote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("blockquote") ? "bg-gray-300" : ""
          }`}
        >
          Quote
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="h-40 overflow-y-auto px-3 py-2 border rounded focus:outline-none prose prose-sm max-w-none"
      />
    </div>
  );
}
