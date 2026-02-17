"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
      } else {
        setUser(user);

        const { data } = await supabase
          .from("bookmarks")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        setBookmarks(data || []);
      }
    };

    getUser();
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <Navbar email={user.email} />

      {/* Welcome Section */}
      <div className="mt-8 mb-12 bg-gradient-to-r from-indigo-500/20 
      to-purple-500/20 border border-white/10 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-2">
          Welcome back 👋
        </h2>

        <p className="text-gray-400">
          Manage your bookmarks in real-time.
        </p>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-12 gap-10">

        {/* Left Panel */}
        <div className="col-span-12 lg:col-span-4">
          <BookmarkForm
            userId={user.id}
            onAdd={(bookmark: any) =>
              setBookmarks((prev) => [bookmark, ...prev])
            }
          />
        </div>

        {/* Right Panel */}
        <div className="col-span-12 lg:col-span-8">
          <BookmarkList
            userId={user.id}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        </div>

      </div>
    </div>
  );
}