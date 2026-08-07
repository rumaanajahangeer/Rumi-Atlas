"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, Heart, CornerDownRight, Send, Check } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string | null;
  parentId?: string | null;
  isPinned?: boolean;
  likes: number;
  createdAt: any;
}

interface CommentsSectionProps {
  postId: string;
  initialComments: Comment[];
}

export default function CommentsSection({ postId, initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !authorName || !authorEmail) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content,
          authorName,
          authorEmail,
          parentId: replyToId,
        }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments([newComment, ...comments]);
        setContent("");
        setReplyToId(null);
        setSuccessMsg("Your comment has been posted!");
        setTimeout(() => setSuccessMsg(""), 3500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ like: true }),
      });
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const topLevelComments = comments.filter((c) => !c.parentId);

  return (
    <div className="my-16 pt-12 border-t border-stone-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-serif font-light text-stone-900 dark:text-stone-100 flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-[#C5A059]" />
          <span>Reader Reflections ({comments.length})</span>
        </h3>
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="mb-12 bg-stone-50 dark:bg-[#0F192C] p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800/80 shadow-md space-y-4">
        <div className="text-sm font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
          {replyToId ? "Leave a Reply" : "Join the Conversation"}
          {replyToId && (
            <button
              type="button"
              onClick={() => setReplyToId(null)}
              className="ml-3 text-xs text-[#C5A059] underline"
            >
              Cancel Reply
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Your Full Name *"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#C5A059]"
          />
          <input
            type="email"
            required
            placeholder="Your Email Address *"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#C5A059]"
          />
        </div>

        <textarea
          required
          rows={3}
          placeholder="Share your thoughts, experiences, or questions about this destination..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl p-4 text-sm outline-none focus:border-[#C5A059] resize-none"
        />

        <div className="flex items-center justify-between pt-2">
          {successMsg ? (
            <span className="text-xs text-emerald-600 font-semibold flex items-center space-x-1">
              <Check className="w-4 h-4" />
              <span>{successMsg}</span>
            </span>
          ) : (
            <span className="text-[11px] text-stone-400">Your email will not be published.</span>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#C5A059] hover:bg-[#b08b46] text-white text-xs uppercase tracking-widest font-semibold rounded-full flex items-center space-x-2 transition-all shadow"
          >
            <span>{isSubmitting ? "Posting..." : "Post Comment"}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* List of Comments */}
      <div className="space-y-6">
        {topLevelComments.map((comment) => {
          const replies = comments.filter((c) => c.parentId === comment.id);
          return (
            <div
              key={comment.id}
              className={`p-6 rounded-3xl border transition-all ${
                comment.isPinned
                  ? "bg-amber-500/5 border-[#C5A059]/40"
                  : "bg-white dark:bg-[#0F192C] border-stone-200/80 dark:border-slate-800/80 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src={comment.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                    alt={comment.authorName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover border border-[#C5A059]/40"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100">
                        {comment.authorName}
                      </span>
                      {comment.isPinned && (
                        <span className="px-2 py-0.5 rounded-full bg-[#C5A059] text-white text-[9px] font-bold uppercase tracking-widest">
                          Pinned Note
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-400">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center space-x-1 text-xs text-stone-500 hover:text-rose-500 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>{comment.likes}</span>
                  </button>

                  <button
                    onClick={() => setReplyToId(comment.id)}
                    className="flex items-center space-x-1 text-xs text-[#C5A059] hover:underline"
                  >
                    <CornerDownRight className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>

              <p className="mt-4 text-sm text-stone-700 dark:text-stone-300 font-light leading-relaxed">
                {comment.content}
              </p>

              {/* Nested Replies */}
              {replies.length > 0 && (
                <div className="mt-6 ml-6 pl-4 border-l-2 border-stone-200 dark:border-slate-800 space-y-4">
                  {replies.map((reply) => (
                    <div key={reply.id} className="pt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-semibold text-stone-800 dark:text-stone-200">
                          {reply.authorName}
                        </span>
                        <button
                          onClick={() => handleLike(reply.id)}
                          className="flex items-center space-x-1 text-xs text-stone-400 hover:text-rose-500"
                        >
                          <Heart className="w-3 h-3" />
                          <span>{reply.likes}</span>
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-stone-600 dark:text-stone-400 font-light">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
