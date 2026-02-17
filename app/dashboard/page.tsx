"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
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
      }
    };

    getUser();
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Navbar email={user.email} />
      <BookmarkForm userId={user.id} />
      <BookmarkList />
    </div>
  );
}
