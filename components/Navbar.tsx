"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar({ email }: { email: string }) {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="glass p-4 rounded-2xl flex justify-between items-center mb-8">
      <h2 className="text-xl font-semibold gradient-text">
        Dashboard
      </h2>
  
      <div className="flex items-center gap-4">
        <span className="text-gray-300 text-sm">{email}</span>
  
        <button
          onClick={logout}
          className="bg-red-500/20 hover:bg-red-500/40 text-red-400 
          px-4 py-2 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
