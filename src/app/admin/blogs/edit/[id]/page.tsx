"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminWritingStudio from "@/components/admin/AdminWritingStudio";

export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id as string;
  const [initialData, setInitialData] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/blogs/${id}`)
        .then((res) => res.json())
        .then((post) => setInitialData(post))
        .catch((err) => console.error(err))
        .finally(() => setFetching(false));
    }
  }, [id]);

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] text-[#2D2342] flex items-center justify-center font-serif text-lg animate-pulse">
        Opening Writing Studio...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F5] text-[#2D2342] flex relative overflow-hidden">
      <AdminSidebar />
      <div className="flex-1">
        <AdminWritingStudio initialData={initialData} isEditing={true} />
      </div>
    </div>
  );
}
