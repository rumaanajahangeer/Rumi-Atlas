"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Eye, CheckCircle2, XCircle } from "lucide-react";

interface BlogActionsProps {
  postId: string;
  isPublished: boolean;
  slug: string;
}

export default function BlogActions({ postId, isPublished, slug }: BlogActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePublishStatus = async () => {
    setLoading(true);
    try {
      await fetch(`/api/blogs/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async () => {
    setLoading(true);
    try {
      await fetch(`/api/blogs/${postId}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <Link
        href={`/blog/${slug}`}
        target="_blank"
        className="p-2 rounded-full liquid-glass text-stone-300 hover:text-white hover:bg-white/10 transition-all"
        title="Preview Story"
      >
        <Eye className="w-3.5 h-3.5" />
      </Link>

      <Link
        href={`/admin/blogs/edit/${postId}`}
        className="p-2 rounded-full liquid-glass text-stone-300 hover:text-[#D8B46A] hover:bg-white/10 transition-all"
        title="Edit Story"
      >
        <Edit className="w-3.5 h-3.5" />
      </Link>

      <button
        onClick={togglePublishStatus}
        disabled={loading}
        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
          isPublished
            ? "liquid-glass text-amber-300 hover:bg-amber-500/20"
            : "liquid-glass text-emerald-300 hover:bg-emerald-500/20"
        }`}
        title={isPublished ? "Unpublish Story" : "Publish Story"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </button>

      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="p-2 rounded-full liquid-glass text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 transition-all"
        title="Delete Story"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="liquid-glass p-8 rounded-3xl max-w-sm w-full text-center space-y-6 animate-fade-rise">
            <h3 className="font-instrument text-2xl font-normal text-white">Delete Journal Story?</h3>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Are you sure you want to delete this story? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center space-x-4 pt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2.5 rounded-full liquid-glass text-xs font-semibold uppercase tracking-wider text-stone-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={deletePost}
                disabled={loading}
                className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase tracking-wider shadow-lg"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
