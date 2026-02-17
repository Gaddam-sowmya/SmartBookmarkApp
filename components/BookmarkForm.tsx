"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: userId,
    });

    setTitle("");
    setUrl("");
  };

  return (
    <div className="glass p-8 rounded-2xl mb-8">
  <h3 className="text-lg font-semibold mb-6 gradient-text">
    Add Bookmark
  </h3>

  <input
    type="text"
    placeholder="Title"
    className="w-full mb-4 p-3 rounded-xl bg-white/5 border border-white/10 
    focus:outline-none focus:ring-2 focus:ring-indigo-500"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <input
    type="url"
    placeholder="URL"
    className="w-full mb-6 p-3 rounded-xl bg-white/5 border border-white/10 
    focus:outline-none focus:ring-2 focus:ring-purple-500"
    value={url}
    onChange={(e) => setUrl(e.target.value)}
  />

  <button
    onClick={addBookmark}
    className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500
    py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
  >
    Add Bookmark
  </button>
</div>
  );
}
