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
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-xl">
      <h2 className="font-bold text-xl">Dashboard</h2>
      <div className="flex gap-4 items-center">
        <span className="text-gray-600">{email}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
