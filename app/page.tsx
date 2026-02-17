"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">Smart Bookmark</h1>
        <p className="mb-6 text-gray-600">
          Minimal. Private. Realtime.
        </p>
        <button
          onClick={login}
          className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
