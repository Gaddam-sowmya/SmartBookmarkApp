"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import BookmarkCard from "./BookmarkCard";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  user_id: string;
  created_at?: string;
}

export default function BookmarkList({
  userId,
  bookmarks,
  setBookmarks,
}: {
  userId: string;
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
}) {

  useEffect(() => {
    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newBookmark = payload.new as Bookmark;

            setBookmarks((prev) => {
              if (prev.find((b) => b.id === newBookmark.id)) return prev;
              return [newBookmark, ...prev];
            });
          }

          if (payload.eventType === "DELETE") {
            const deletedId = payload.old.id;

            setBookmarks((prev) =>
              prev.filter((b) => b.id !== deletedId)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, setBookmarks]);

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={(id: string) =>
            setBookmarks((prev) =>
              prev.filter((b) => b.id !== id)
            )
          }
        />
      ))}
    </div>
  );
}