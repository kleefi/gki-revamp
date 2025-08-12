"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "react-hot-toast";
import Image from "next/image";

export const metadata = {
  title: "Register - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setLoading(false);
      setErrorMsg(signUpError.message);
      return;
    }

    const user = data.user;

    if (user) {
      const { error: insertError } = await supabase
        .from("users")
        .insert([{ id: user.id, name }]);

      if (insertError) {
        setLoading(false);
        const message = insertError.message || "Unknown error";
        toast.error(`Failed to save user info: ${message}`);
        // setErrorMsg(message);
        return;
      }
    }

    setLoading(false);
    toast.success("Registrasi berhasil! Cek email untuk verifikasi.");
    // kosongin form
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 items-center">
      <div
        className="md:h-screen hidden md:flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/banner.avif')" }}
      >
        <div className="flex items-center w-[80%] flex-col leading-5 justify-center text-center bg-orange-100/90 p-8 rounded-md border border-[#1b1b1b]">
          <h2 className="text-2xl mb-2">
            &quot;Day one will become one day&quot;
          </h2>
          <p>
            — just keep going. Slow progress is still progress. Do it until your
            &apos;day one&apos; becomes the day you succeed. —
          </p>
        </div>
      </div>

      <div className="w-[70%] mx-auto md:block md:h-auto h-screen flex items-center justify-center">
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={140}
            height={40}
            className="mx-auto"
          />

          <div>
            <label className="block font-medium text-sm text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="border px-4 py-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="border px-4 py-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="border px-4 py-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-900 hover:bg-indigo-800 text-white py-2 px-5 rounded-md shadow cursor-pointer"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
