"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdMenuBook,
  MdDescription,
  MdEventNote,
  MdAnnouncement,
  MdPhotoLibrary,
  MdContacts,
  MdSettings,
} from "react-icons/md";

const menuItems = [
  { label: "Dashboard", icon: MdDashboard, path: "/dashboard" },
  { label: "Renungan", icon: MdMenuBook, path: "/dashboard/renungan" },
  { label: "e-Warta", icon: MdDescription, path: "/dashboard/warta" },
  { label: "e-Liturgi", icon: MdEventNote, path: "/dashboard/liturgi" },
  { label: "Berita", icon: MdAnnouncement, path: "/dashboard/berita" },
  { label: "Galeri", icon: MdPhotoLibrary, path: "/dashboard/galeri" },
  { label: "Kontak", icon: MdContacts, path: "/dashboard/kontak" },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0 flex flex-col`}
      aria-label="Sidebar"
    >
      <div className="flex-grow px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {menuItems.map(({ label, icon: Icon, path }) => {
            const isActive =
              path === "/dashboard"
                ? pathname === path
                : pathname === path || pathname.startsWith(path + "/");

            return (
              <li key={path}>
                <Link
                  href={path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive
                      ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                      : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition duration-75 ${
                      isActive
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    }`}
                  />
                  <span className="ms-3">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-3 pb-4 border-t border-gray-200 dark:border-gray-700">
        <ul className="font-medium">
          <li>
            <Link
              href="/dashboard/settings"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center p-2 rounded-lg group ${
                pathname === "/dashboard/settings"
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              }`}
            >
              <MdSettings
                className={`w-5 h-5 transition duration-75 ${
                  pathname === "/dashboard/settings"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                }`}
              />
              <span className="ms-3">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
