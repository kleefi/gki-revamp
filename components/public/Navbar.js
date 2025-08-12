"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showPersembahanModal, setShowPersembahanModal] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  const openPersembahanModal = () => {
    setShowPersembahanModal(true);
    setIsMenuOpen(false);
  };

  const closePersembahanModal = () => {
    setShowPersembahanModal(false);
  };

  // Menu utama + sub menu
  const menuItems = [
    { label: "Home", href: "/" },
    {
      label: "Media",
      href: "#",
      sub: [
        { label: "Renungan", href: "/renungan" },
        { label: "e-Warta", href: "/warta" },
        { label: "e-Liturgi", href: "/liturgi" },
      ],
    },
    { label: "Berita", href: "/berita" },
    { label: "Galeri", href: "/galeri" },
    { label: "Hubungi Kami", href: "/kontak" },
    { label: "Persembahan", type: "button" },
  ];

  return (
    <header className="w-full fixed z-50">
      <div className="max-w-screen-xl flex items-center lg:mx-auto justify-between md:my-8 my-0 px-8 py-4 bg-white rounded-md shadow-lg">
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
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className="hidden lg:flex pr-[20px]">
          <ul className="flex flex-row gap-4 items-center relative">
            {menuItems.map((item, idx) => {
              if (item.type === "button") {
                return (
                  <li
                    key={idx}
                    className="cursor-pointer bg-blue-500 text-white rounded-lg px-4 py-2"
                    onClick={openPersembahanModal}
                  >
                    {item.label}
                  </li>
                );
              }

              if (item.sub) {
                return (
                  <li key={idx} className="group relative">
                    <Link
                      href={item.href}
                      className={`flex items-center ${
                        isActive(item.href) ? "font-bold" : ""
                      }`}
                    >
                      {item.label}
                      <FiChevronDown className="ml-1" />
                    </Link>
                    <ul
                      className="absolute left-0 top-full w-40 bg-white border border-gray-200 rounded-lg shadow-lg 
                      opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-1 
                      transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50"
                    >
                      {item.sub.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <Link
                            href={subItem.href}
                            className={`block px-4 py-2 hover:bg-gray-100 ${
                              isActive(subItem.href) ? "font-bold" : ""
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={isActive(item.href) ? "font-bold" : ""}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {isMenuOpen && (
          <nav className="lg:hidden absolute md:top-28 top-24 left-0 w-full bg-white shadow-md border-t border-gray-200">
            <ul className="flex flex-col gap-2 p-4">
              {menuItems.map((item, idx) => {
                if (item.type === "button") {
                  return (
                    <li
                      key={idx}
                      className="cursor-pointer bg-blue-500 text-white rounded-lg px-4 py-2 text-center"
                      onClick={() => {
                        openPersembahanModal();
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </li>
                  );
                }

                if (item.sub) {
                  return (
                    <li key={idx}>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === idx ? null : idx)
                        }
                        className="flex justify-between items-center w-full"
                      >
                        <span
                          className={isActive(item.href) ? "font-bold" : ""}
                        >
                          {item.label}
                        </span>
                        <FiChevronDown
                          className={`transition-transform ${
                            openDropdown === idx ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === idx && (
                        <ul className="ml-4 mt-1 flex flex-col gap-1">
                          {item.sub.map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <Link
                                href={subItem.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={
                                  isActive(subItem.href) ? "font-bold" : ""
                                }
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={isActive(item.href) ? "font-bold" : ""}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {showPersembahanModal && (
          <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
            className="fixed inset-0 flex justify-center items-center z-50"
            onClick={closePersembahanModal}
          >
            <div
              className="bg-white rounded-xl p-6 relative max-w-3xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePersembahanModal}
                aria-label="Close modal"
                className="absolute -top-5 -right-5 bg-white rounded-full p-2 text-gray-600 hover:text-gray-900 text-2xl cursor-pointer shadow-md"
              >
                <FiX />
              </button>
              <Image
                src="/persembahan.jpg"
                alt="Persembahan"
                width={800}
                height={500}
                className="rounded-lg object-contain"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
