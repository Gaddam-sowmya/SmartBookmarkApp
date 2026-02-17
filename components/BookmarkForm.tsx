"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkForm({ userId, onAdd }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    if (!title || !url) return;

    let finalUrl = url;
    if (!url.startsWith("http")) {
      finalUrl = "https://" + url;
    }

    // Fetch metadata before insert
    const meta = await fetch("/api/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: finalUrl }),
    });

    const metaData = await meta.json();

    const { data } = await supabase
      .from("bookmarks")
      .insert({
        title: metaData.title || title,
        url: finalUrl,
        favicon: metaData.favicon || "",
        user_id: userId,
      })
      .select()
      .single();

    if (data) {
      onAdd(data);
    }

    setTitle("");
    setUrl("");
  };

// const addBookmark = async () => {
//     console.log("Clicked");
  
//     if (!title || !url) {
//       console.log("Missing fields");
//       return;
//     }
  
//     let finalUrl = url;
//     if (!url.startsWith("http")) {
//       finalUrl = "https://" + url;
//     }
  
//     console.log("Inserting:", finalUrl);
  
//     const { data, error } = await supabase
//       .from("bookmarks")
//       .insert({
//         title,
//         url: finalUrl,
//         user_id: userId,
//       })
//       .select()
//       .single();
  
//     console.log("Response:", data, error);
  
//     if (error) {
//       alert(error.message);
//       return;
//     }
  
//     if (data) {
//       onAdd(data);
//     }
  
//     setTitle("");
//     setUrl("");
//   };

  return (
    <div className="
  bg-white/5
  border border-white/10
  backdrop-blur-xl
  rounded-2xl
  p-8
  shadow-lg
">
      <h3 className="text-2xl font-bold mb-6">Add Bookmark</h3>

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
