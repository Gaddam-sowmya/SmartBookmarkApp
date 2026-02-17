"use client";

import { supabase } from "@/lib/supabaseClient";

export default function BookmarkCard({ bookmark }: any) {
  const deleteBookmark = async () => {
    await supabase.from("bookmarks").delete().eq("id", bookmark.id);
  };

  return (
    <div className="glass p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300">
      <h4 className="font-semibold mb-2 text-lg">
        {bookmark.title}
      </h4>
  
      <a
        href={bookmark.url}
        target="_blank"
        className="text-indigo-400 text-sm break-all hover:underline"
      >
        {bookmark.url}
      </a>
  
      <button
        onClick={deleteBookmark}
        className="mt-4 text-red-400 text-sm hover:text-red-300 transition"
      >
        Delete
      </button>
    </div>
  );
}
