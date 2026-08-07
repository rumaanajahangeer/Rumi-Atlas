"use client";

import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminWritingStudio from "@/components/admin/AdminWritingStudio";

export default function NewBlogPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F5] text-[#2D2342] flex relative overflow-hidden">
      <AdminSidebar />
      <div className="flex-1">
        <AdminWritingStudio />
      </div>
    </div>
  );
}
