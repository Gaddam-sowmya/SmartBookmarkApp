"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/dashboard");
      }
    };

    checkSession();
  }, [router]);

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="glass p-12 rounded-3xl text-center max-w-md w-full">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Smart Bookmark
        </h1>
  
        <p className="text-gray-300 mb-8">
          Private. Secure. Realtime.
        </p>
  
        <button
          onClick={login}
          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 
          hover:scale-105 transition-all duration-300 
          py-3 rounded-xl font-semibold shadow-lg"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
