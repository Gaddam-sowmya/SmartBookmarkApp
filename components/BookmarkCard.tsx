"use client";

import { supabase } from "@/lib/supabaseClient";

export default function BookmarkCard({ bookmark, onDelete }: any) {

  const deleteBookmark = async () => {
    onDelete(bookmark.id);
    await supabase.from("bookmarks").delete().eq("id", bookmark.id);
  };

  let domain = "";
  try {
    domain = new URL(bookmark.url).hostname;
  } catch {
    domain = bookmark.url;
  }

  return (
    <div
      className="
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        rounded-2xl
        p-6
        min-h-[150px]
        flex flex-col justify-between
        shadow-lg
        hover:shadow-indigo-500/30
        hover:-translate-y-1
        transition-all duration-300
      "
    >
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          {/* Favicon */}
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
            {bookmark.favicon ? (
              <img
                src={bookmark.favicon}
                alt="favicon"
                className="w-6 h-6"
              />
            ) : (
              <span>🌐</span>
            )}
          </div>

          {/* Title + Domain */}
          <div>
            <h3 className="text-xl font-semibold">
              {bookmark.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {domain}
            </p>
          </div>

        </div>

        {/* Delete */}
        <button
          onClick={deleteBookmark}
          className="text-gray-400 hover:text-red-400 transition"
        >
          ✕
        </button>

      </div>

      {/* Visit Button */}
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition"
      >
        Visit Website →
      </a>

    </div>
  );
}