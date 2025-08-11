"use client";

import Image from "next/image"; // <== ini yang kurang
import {
  FaWhatsapp,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-center bg-[#282828] lg:p-10 p-4 mx-auto rounded-[20px] my-12 max-w-screen-xl">
      <section className="grid lg:grid-cols-10 grid-cols-1 items-center lg:gap-4 gap-0 max-w-screen-xl mx-auto">
        <Image
          src="/logo.png"
          className="w-[200px] mx-auto col-span-3"
          alt="GKI BAJEM Cileungsi"
          width={200} // direkomendasikan kasih width & height
          height={200}
        />
        <div className="col-span-7 text-white mt-5 lg:mt-auto">
          <h2 className="text-left text-2xl font-bold">GKI BAJEM Cileungsi</h2>
          <p className="text-left">Perumahan Citraland Cibubur</p>
          <p className="text-left">
            Ruko The Avenue 1, Blok R.08/03-05 Jl. Raya Cileungsi Km.4
          </p>
          <p className="text-left">Bogor – Cileungsi.</p>
        </div>
      </section>

      <hr className="mt-[25px] -mb-[20px] max-w-[1200px] mx-auto text-white" />

      <section className="max-w-[1200px] mx-auto mt-10 flex items-center flex-col lg:flex-row justify-between">
        <p className="text-white text-left">
          Copyright © 2025 GKI Kranggan BAJEM Cileungsi | All rights reserved.
        </p>

        <div className="text-white text-center mt-[20px] lg:mt-0 flex">
          <a
            href="https://wa.me/6281214149253"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-[#F5F5F5] mr-[5px]"
          >
            <FaWhatsapp className="text-[#075e54]" size={20} />
          </a>
          <a
            href="https://www.facebook.com/groups/240898679587022/?ref=share&mibextid=lOuIew"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-[#F5F5F5] mr-[5px]"
          >
            <FaFacebookF className="text-[#0176ce]" size={20} />
          </a>
          <a
            href="https://www.youtube.com/@gkikrangganbajemcileungsi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-[#F5F5F5] mr-[5px]"
          >
            <FaYoutube className="text-[#CD201F]" size={20} />
          </a>
          <a
            href="https://www.instagram.com/gkik_bajemcileungsi/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-[#F5F5F5] mr-[5px]"
          >
            <FaInstagram className="text-[#F501CB]" size={20} />
          </a>
        </div>
      </section>
    </footer>
  );
}
