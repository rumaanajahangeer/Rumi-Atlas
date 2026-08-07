"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface BookmarkContextType {
  bookmarks: string[];
  toggleBookmark: (postId: string) => void;
  isBookmarked: (postId: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
});

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rumi_atlas_bookmarks");
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleBookmark = (postId: string) => {
    setBookmarks((prev) => {
      let updated: string[];
      if (prev.includes(postId)) {
        updated = prev.filter((id) => id !== postId);
      } else {
        updated = [...prev, postId];
      }
      try {
        localStorage.setItem("rumi_atlas_bookmarks", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const isBookmarked = (postId: string) => bookmarks.includes(postId);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarkContext);
