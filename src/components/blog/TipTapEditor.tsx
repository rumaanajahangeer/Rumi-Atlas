"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  ImageIcon,
  Link as LinkIcon,
  Undo,
  Redo,
  Code,
} from "lucide-react";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({
        inline: false,
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Write your luxury travel story here... Describe colors, textures, soundscapes, and personal reflections.",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-lg max-w-none focus:outline-none min-h-[300px] p-4 font-sans leading-relaxed text-stone-800 dark:text-stone-200",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="h-64 border border-stone-200 dark:border-slate-800 rounded-xl animate-pulse bg-stone-50 dark:bg-slate-900 flex items-center justify-center text-stone-400 text-sm">
        Initializing Rich Text Editor...
      </div>
    );
  }

  const addImage = () => {
    const url = prompt("Enter image URL (Unsplash or Cloudinary):");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = prompt("Enter link URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-stone-300 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#070D18] shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-stone-100 dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("bold") ? "bg-[#C5A059] text-white" : "hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300"
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("italic") ? "bg-[#C5A059] text-white" : "hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300"
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-stone-300 dark:bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("heading", { level: 1 }) ? "bg-[#C5A059] text-white" : "hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300"
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("heading", { level: 2 }) ? "bg-[#C5A059] text-white" : "hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300"
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("heading", { level: 3 }) ? "bg-[#C5A059] text-white" : "hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300"
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-stone-300 dark:bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("bulletList") ? "bg-[#C5A059] text-white" : "hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300"
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("orderedList") ? "bg-[#C5A059] text-white" : "hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300"
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("blockquote") ? "bg-[#C5A059] text-white" : "hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300"
          }`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-stone-300 dark:bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300 transition-colors"
          title="Insert Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addLink}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("link") ? "bg-[#C5A059] text-white" : "hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300"
          }`}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-stone-300 dark:bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300 transition-colors"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300 transition-colors"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Box */}
      <EditorContent editor={editor} />
    </div>
  );
}
