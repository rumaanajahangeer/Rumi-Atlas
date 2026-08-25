"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TipTapEditor from "@/components/blog/TipTapEditor";
import FloatingPetals from "@/components/effects/FloatingPetals";
import {
  Save,
  Eye,
  Send,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Monitor,
  Smartphone,
  Upload,
  Trash2,
  EyeOff,
  Camera,
  Film,
} from "lucide-react";

interface AdminWritingStudioProps {
  initialData?: any;
  isEditing?: boolean;
}

interface DayChapterState {
  dayNumber: string;
  title: string;
  story: string;
  photos: string[];
  videos: string[];
}

export default function AdminWritingStudio({
  initialData,
  isEditing = false,
}: AdminWritingStudioProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(true);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [lastSaved, setLastSaved] = useState("Just now");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "Whispering Sands of Merzouga");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "Ascending golden dunes at sunset and stargazing over Berber luxury camps.");
  const [content, setContent] = useState(initialData?.content || "<p>The golden dunes rose like giant sleeping waves against the dusk sky...</p>");
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80");
  const [destination, setDestination] = useState(initialData?.destination || "Merzouga Dunes");
  const [country, setCountry] = useState(initialData?.country || "Morocco");
  const [readingTime, setReadingTime] = useState(initialData?.readingTime || 5);
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true);

  // Day-by-Day Chapters List State (Unlimited Days & Media)
  const [days, setDays] = useState<DayChapterState[]>(() => {

    if (initialData?.galleryImages) {
      try {
        const parsed = typeof initialData.galleryImages === "string"
          ? JSON.parse(initialData.galleryImages)
          : initialData.galleryImages;
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.dayNumber) {
          return parsed;
        }
      } catch (e) {
        console.error("Error loading initial days:", e);
      }
    }
    return [
      {
        dayNumber: "Day 1",
        title: "Arriving at the Golden Dunes of Merzouga",
        story: "We arrived at the edge of the Sahara as dusk began to painterly tint the sky in hues of deep violet...",
        photos: [
          "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        ],
        videos: [
          "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
        ],
      },
      {
        dayNumber: "Day 2",
        title: "Stargazing over Nomadic Berber Camps",
        story: "Night fell like a heavy velvet curtain over the desert...",
        photos: [
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
        ],
        videos: [
          "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
        ],
      },
      {
        dayNumber: "Day 3",
        title: "Valley of Roses & Cedar Trails",
        story: "Leaving the dunes behind, we crossed winding mountain passes flanked by ancient mud-brick kasbahs...",
        photos: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        ],
        videos: [
          "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
        ],
      },
    ];
  });


  // Collapsible Sections Toggle State
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    cover: true,
    dayChapters: true,
    story: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Direct Local Image File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetSetter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          targetSetter(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDayPhoto = (e: React.ChangeEvent<HTMLInputElement>, dayIdx: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const copy = [...days];
          copy[dayIdx].photos.push(reader.result);
          setDays(copy);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDayVideo = (e: React.ChangeEvent<HTMLInputElement>, dayIdx: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const copy = [...days];
          copy[dayIdx].videos.push(reader.result);
          setDays(copy);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDay = () => {
    const nextDayNum = `Day ${days.length + 1}`;
    setDays([
      ...days,
      {
        dayNumber: nextDayNum,
        title: `Exploring Destination Part ${days.length + 1}`,
        story: "A new morning brought peaceful discoveries along the trail...",
        photos: [],
        videos: [],
      },
    ]);
  };

  const handleSubmit = async (publishState: boolean) => {
    setLoading(true);
    try {
      const endpoint = isEditing ? `/api/blogs/${initialData.id}` : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          featuredImage,
          galleryImages: JSON.stringify(days),
          destination,
          country,
          readingTime,
          isPublished: publishState,
        }),
      });

      if (res.ok) {
        setIsPublished(publishState);
        setLastSaved(new Date().toLocaleTimeString());
        router.push("/admin/blogs");
        router.refresh();
      } else {
        alert("Failed to save journal entry.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJournal = async () => {
    if (!initialData?.id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${initialData.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        alert("Failed to delete journal entry.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0813] text-[#F3E8FF] flex flex-col relative overflow-hidden font-sans">
      <FloatingPetals />

      {/* TOP NAVIGATION ACTION BAR */}
      <header className="liquid-glass px-6 py-4 border-b border-[#2E2352] flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 bg-[#0B0813]/95">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search studio..."
              className="bg-white/5 border border-[#2E2352] rounded-full px-4 py-2 pl-9 text-xs text-white placeholder-stone-500 outline-none focus:border-[#8B5CF6]"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#FDE047]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px]">Autosaved • {lastSaved}</span>
          </div>
        </div>

        {/* Action Controls Cluster */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              previewMode
                ? "bg-[#8B5CF6] text-white shadow-md"
                : "liquid-glass text-stone-300 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{previewMode ? "Hide Preview" : "Split Preview"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="px-4 py-2 rounded-full liquid-glass text-stone-300 hover:text-white text-xs uppercase tracking-wider font-semibold transition-all flex items-center space-x-1.5"
          >
            <Save className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>Save Draft</span>
          </button>

          {isEditing && isPublished && (
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="px-4 py-2 rounded-full liquid-glass text-amber-300 hover:bg-amber-500/20 text-xs uppercase tracking-wider font-semibold transition-all flex items-center space-x-1.5"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Unpublish</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={loading}
            className="px-5 py-2 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs uppercase tracking-wider font-semibold shadow-xl transition-all flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{loading ? "Publishing..." : "Publish Journal"}</span>
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              disabled={loading}
              className="p-2 rounded-full liquid-glass text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 transition-all"
              title="Delete Journal"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <div className="w-8 h-8 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-serif font-bold text-xs shadow-md shrink-0">
            R
          </div>
        </div>
      </header>

      {/* WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <main className={`p-6 sm:p-10 space-y-8 overflow-y-auto ${previewMode ? "w-full lg:w-7/12 border-r border-[#2E2352]" : "max-w-4xl mx-auto w-full"}`}>
          <div className="space-y-1 border-b border-[#2E2352] pb-6">
            <h1 className="font-instrument italic text-4xl sm:text-5xl font-normal text-white">
              {isEditing ? "Edit Journal Entry" : "Create a New Journal"}
            </h1>
            <p className="text-xs font-serif italic text-[#A78BFA]">
              "Every memory deserves a beautiful place to live."
            </p>
          </div>

          {/* COLLAPSIBLE 1: COVER WITH DIRECT FILE UPLOAD */}
          <div className="liquid-glass rounded-3xl border border-[#2E2352] shadow-xl overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleSection("cover")}
              className="w-full px-8 py-5 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">🌸</span>
                <span className="font-instrument italic text-2xl text-white">Cover Image & Details</span>
              </div>
              {openSections.cover ? <ChevronUp className="w-4 h-4 text-[#FDE047]" /> : <ChevronDown className="w-4 h-4 text-[#FDE047]" />}
            </button>

            {openSections.cover && (
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#A78BFA]">
                    Journal Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Whispering Sands of Merzouga"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-[#2E2352] rounded-2xl px-5 py-3 text-base text-white outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#A78BFA]">
                    Poetic Subtitle *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="A quiet description of this journey..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full bg-white/5 border border-[#2E2352] rounded-2xl p-4 text-xs text-white placeholder-stone-500 outline-none focus:border-[#8B5CF6] resize-none"
                  />
                </div>

                {/* Direct Image File Upload Button */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#A78BFA] block">
                    Cover Hero Image (Direct File Upload)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {featuredImage && (
                      <img src={featuredImage} alt="Cover preview" className="w-24 h-24 object-cover rounded-2xl border border-[#2E2352]" />
                    )}
                    <label className="flex-1 w-full py-4 px-6 rounded-2xl border border-dashed border-[#8B5CF6] hover:bg-white/5 cursor-pointer flex items-center justify-center space-x-2 text-xs font-semibold text-[#FDE047] uppercase tracking-wider transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Select Image File From Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, setFeaturedImage)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* COLLAPSIBLE 2: DAY-BY-DAY CHAPTER BUILDER (UNLIMITED DAYS + DAY-WISE VIDEOS) */}
          <div className="liquid-glass rounded-3xl border border-[#2E2352] shadow-xl overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleSection("dayChapters")}
              className="w-full px-8 py-5 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">🗓</span>
                <span className="font-instrument italic text-2xl text-white">Day-by-Day Chapter Builder ({days.length} Days)</span>
              </div>
              {openSections.dayChapters ? <ChevronUp className="w-4 h-4 text-[#FDE047]" /> : <ChevronDown className="w-4 h-4 text-[#FDE047]" />}
            </button>

            {openSections.dayChapters && (
              <div className="p-8 space-y-8">
                {days.map((dayItem, i) => (
                  <div key={i} className="liquid-glass p-6 rounded-2xl border border-[#2E2352] space-y-4 relative">
                    <div className="flex items-center justify-between border-b border-[#2E2352] pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 rounded-full bg-[#8B5CF6] text-white text-xs font-bold font-mono">
                          {dayItem.dayNumber}
                        </span>
                        <input
                          type="text"
                          value={dayItem.title}
                          onChange={(e) => {
                            const copy = [...days];
                            copy[i].title = e.target.value;
                            setDays(copy);
                          }}
                          placeholder="Day Title..."
                          className="bg-transparent font-instrument italic text-xl text-white outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setDays(days.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={3}
                      value={dayItem.story}
                      onChange={(e) => {
                        const copy = [...days];
                        copy[i].story = e.target.value;
                        setDays(copy);
                      }}
                      placeholder="Story for this specific day..."
                      className="w-full bg-white/5 border border-[#2E2352] rounded-xl p-3 text-xs text-white outline-none resize-none"
                    />

                    {/* DAY-WISE VIDEO CLIPS UPLOAD (1ST) */}
                    <div className="space-y-2 pt-2 border-t border-[#2E2352]/40">
                      <div className="flex items-center space-x-1.5 text-[11px] uppercase tracking-wider font-semibold text-[#FDE047]">
                        <Film className="w-3.5 h-3.5" />
                        <span>1st: {dayItem.dayNumber} Video Clips ({dayItem.videos.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        {dayItem.videos.map((vUrl: string, vIdx: number) => (
                          <div key={vIdx} className="relative w-28 h-18 rounded-lg overflow-hidden border border-white/50 bg-black group">
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                              <source src={vUrl} type="video/mp4" />
                            </video>
                            <button
                              type="button"
                              onClick={() => {
                                const copy = [...days];
                                copy[i].videos = copy[i].videos.filter((_: string, idx: number) => idx !== vIdx);
                                setDays(copy);
                              }}
                              className="absolute top-1 right-1 p-1 bg-rose-600/90 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                              title="Delete video"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <label className="h-16 px-4 rounded-lg border border-dashed border-[#8B5CF6] hover:bg-white/5 cursor-pointer flex items-center justify-center text-xs text-[#FDE047] space-x-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Video File</span>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleAddDayVideo(e, i)}
                            className="hidden"
                          />
                        </label>
                        <input
                          type="text"
                          placeholder="Or paste video MP4 URL..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const val = (e.target as HTMLInputElement).value.trim();
                              if (val) {
                                const copy = [...days];
                                copy[i].videos.push(val);
                                setDays(copy);
                                (e.target as HTMLInputElement).value = "";
                              }
                            }
                          }}
                          className="bg-white/5 border border-[#2E2352] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 outline-none focus:border-[#8B5CF6] w-48"
                        />
                      </div>
                    </div>

                    {/* DAY-WISE POSTCARD PHOTOS UPLOAD (2ND) */}
                    <div className="space-y-2 pt-2 border-t border-[#2E2352]/40">
                      <div className="flex items-center space-x-1.5 text-[11px] uppercase tracking-wider font-semibold text-[#FDE047]">
                        <Camera className="w-3.5 h-3.5" />
                        <span>2nd: {dayItem.dayNumber} Postcard Photos ({dayItem.photos.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        {dayItem.photos.map((pUrl: string, pIdx: number) => (
                          <div key={pIdx} className="relative w-24 h-16 rounded-lg overflow-hidden border border-white/50 group">
                            <img src={pUrl} alt="Day photo" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                const copy = [...days];
                                copy[i].photos = copy[i].photos.filter((_: string, idx: number) => idx !== pIdx);
                                setDays(copy);
                              }}
                              className="absolute top-1 right-1 p-1 bg-rose-600/90 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                              title="Delete photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <label className="h-14 px-4 rounded-lg border border-dashed border-[#8B5CF6] hover:bg-white/5 cursor-pointer flex items-center justify-center text-xs text-[#FDE047] space-x-1">
                          <Plus className="w-3.5 h-3.5" />
                          <span>Upload Photo File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleAddDayPhoto(e, i)}
                            className="hidden"
                          />
                        </label>
                        <input
                          type="text"
                          placeholder="Or paste photo URL..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const val = (e.target as HTMLInputElement).value.trim();
                              if (val) {
                                const copy = [...days];
                                copy[i].photos.push(val);
                                setDays(copy);
                                (e.target as HTMLInputElement).value = "";
                              }
                            }
                          }}
                          className="bg-white/5 border border-[#2E2352] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 outline-none focus:border-[#8B5CF6] w-48"
                        />
                      </div>
                    </div>


                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddDay}
                  className="w-full py-4 rounded-2xl border border-dashed border-[#8B5CF6] hover:bg-white/5 text-xs uppercase tracking-wider font-semibold text-[#FDE047] flex items-center justify-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Day Chapter</span>
                </button>
              </div>
            )}
          </div>

          {/* COLLAPSIBLE 3: MAIN STORY EDITOR */}
          <div className="liquid-glass rounded-3xl border border-[#2E2352] shadow-xl overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleSection("story")}
              className="w-full px-8 py-5 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">📖</span>
                <span className="font-instrument italic text-2xl text-white">Main Story Overview</span>
              </div>
              {openSections.story ? <ChevronUp className="w-4 h-4 text-[#FDE047]" /> : <ChevronDown className="w-4 h-4 text-[#FDE047]" />}
            </button>

            {openSections.story && (
              <div className="p-6">
                <TipTapEditor content={content} onChange={setContent} />
              </div>
            )}
          </div>
        </main>

        {/* RIGHT PREVIEW */}
        {previewMode && (
          <aside className="w-full lg:w-5/12 p-6 sm:p-8 bg-[#0B0813] overflow-y-auto max-h-screen border-l border-[#2E2352]">
            <div className="space-y-6 max-w-md mx-auto">
              <div className="flex items-center justify-between border-b border-[#2E2352] pb-3">
                <span className="text-xs uppercase tracking-widest text-[#FDE047] font-semibold">
                  Live Reader Preview Mode
                </span>
                <div className="flex items-center space-x-2 liquid-glass rounded-full p-1 border border-[#2E2352]">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1.5 rounded-full transition-colors ${
                      previewDevice === "desktop" ? "bg-[#8B5CF6] text-white" : "text-stone-400"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1.5 rounded-full transition-colors ${
                      previewDevice === "mobile" ? "bg-[#8B5CF6] text-white" : "text-stone-400"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div
                className={`mx-auto transition-all duration-500 overflow-hidden rounded-3xl bg-[#130F24] shadow-2xl border border-[#2E2352] ${
                  previewDevice === "mobile" ? "w-[320px]" : "w-full"
                }`}
              >
                <div className="p-6 space-y-4">
                  <span className="text-[10px] uppercase font-mono text-[#FDE047]">{days.length} Day Chapters</span>
                  <h2 className="font-instrument italic text-2xl text-white">{title || "Untitled Journal"}</h2>
                  <div className="space-y-2 border-t border-[#2E2352] pt-3">
                    {days.map((d, idx) => (
                      <div key={idx} className="text-xs text-stone-300">
                        <span className="font-bold text-[#FDE047]">{d.dayNumber}:</span> {d.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="liquid-glass p-8 rounded-3xl max-w-sm w-full text-center space-y-6">
            <h3 className="font-instrument text-2xl font-normal text-white">Delete Journal Story?</h3>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Are you sure you want to delete this story? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center space-x-4 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2.5 rounded-full liquid-glass text-xs font-semibold uppercase tracking-wider text-stone-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteJournal}
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
