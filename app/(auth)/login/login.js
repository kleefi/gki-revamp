"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Login berhasil!");
    window.location.href = "/dashboard";
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

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot your password?
            </a>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-900 hover:bg-indigo-800 text-white py-2 px-5 rounded-md shadow cursor-pointer"
            >
              {loading ? "Loading..." : "LOG IN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
