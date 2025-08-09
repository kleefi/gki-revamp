"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <header className="w-full font-sans fixed z-50">
      <div className="max-w-screen-xl flex items-center lg:mx-auto justify-between my-8 px-8 py-4 bg-white rounded-md">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="GKI BAJEM Cileungsi"
            width={150}
            height={50}
            priority
          />
        </Link>

        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className="hidden lg:flex pr-[20px]">
          <ul className="flex flex-row gap-4 items-center relative">
            <li>
              <Link href={"/"} className={isActive("/") ? "font-bold" : ""}>
                Home
              </Link>
            </li>

            <li className="group relative">
              <Link
                href={"/media"}
                className={`flex items-center ${
                  isActive("/media") ? "font-bold" : ""
                }`}
              >
                Media
                <FiChevronDown className="ml-1" />
              </Link>
              <ul
                className="absolute left-0 top-full w-40 bg-white border border-gray-200 rounded-lg shadow-lg 
                opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-1 
                transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50"
              >
                <li>
                  <Link
                    href="/media/video"
                    className={`block px-4 py-2 hover:bg-gray-100 ${
                      isActive("/media/video") ? "font-bold" : ""
                    }`}
                  >
                    Video
                  </Link>
                </li>
                <li>
                  <Link
                    href="/media/foto"
                    className={`block px-4 py-2 hover:bg-gray-100 ${
                      isActive("/media/foto") ? "font-bold" : ""
                    }`}
                  >
                    Foto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/media/audio"
                    className={`block px-4 py-2 hover:bg-gray-100 ${
                      isActive("/media/audio") ? "font-bold" : ""
                    }`}
                  >
                    Audio
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                href={"/berita"}
                className={isActive("/berita") ? "font-bold" : ""}
              >
                Berita
              </Link>
            </li>
            <li>
              <Link
                href={"/galeri"}
                className={isActive("/galeri") ? "font-bold" : ""}
              >
                Galeri
              </Link>
            </li>
            <li>
              <Link
                href={"/hubungi-kami"}
                className={isActive("/hubungi-kami") ? "font-bold" : ""}
              >
                Hubungi Kami
              </Link>
            </li>
            <li
              className="cursor-pointer bg-blue-500 text-white rounded-lg px-4 py-2"
              onClick={() => alert("untuk persembahan image nanti")}
            >
              Persembahan
            </li>
          </ul>
        </nav>

        {isMenuOpen && (
          <nav className="lg:hidden absolute top-28 left-0 w-full bg-white shadow-md border-t border-gray-200">
            <ul className="flex flex-col gap-2 p-4">
              <li>
                <Link
                  href={"/"}
                  onClick={() => setIsMenuOpen(false)}
                  className={isActive("/") ? "font-bold" : ""}
                >
                  Home
                </Link>
              </li>

              <li>
                <button
                  onClick={() => setIsMediaOpen(!isMediaOpen)}
                  className="flex justify-between items-center w-full"
                >
                  <span className={isActive("/media") ? "font-bold" : ""}>
                    Media
                  </span>
                  <FiChevronDown
                    className={`transition-transform ${
                      isMediaOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMediaOpen && (
                  <ul className="ml-4 mt-1 flex flex-col gap-1">
                    <li>
                      <Link
                        href="/media/video"
                        onClick={() => setIsMenuOpen(false)}
                        className={isActive("/media/video") ? "font-bold" : ""}
                      >
                        Video
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/media/foto"
                        onClick={() => setIsMenuOpen(false)}
                        className={isActive("/media/foto") ? "font-bold" : ""}
                      >
                        Foto
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/media/audio"
                        onClick={() => setIsMenuOpen(false)}
                        className={isActive("/media/audio") ? "font-bold" : ""}
                      >
                        Audio
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link
                  href={"/berita"}
                  onClick={() => setIsMenuOpen(false)}
                  className={isActive("/berita") ? "font-bold" : ""}
                >
                  Berita
                </Link>
              </li>
              <li>
                <Link
                  href={"/galeri"}
                  onClick={() => setIsMenuOpen(false)}
                  className={isActive("/galeri") ? "font-bold" : ""}
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  href={"/hubungi-kami"}
                  onClick={() => setIsMenuOpen(false)}
                  className={isActive("/hubungi-kami") ? "font-bold" : ""}
                >
                  Hubungi Kami
                </Link>
              </li>
              <li
                className="cursor-pointer bg-blue-500 text-white rounded-lg px-4 py-2 text-center"
                onClick={() => {
                  alert("untuk persembahan image nanti");
                  setIsMenuOpen(false);
                }}
              >
                Persembahan
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
