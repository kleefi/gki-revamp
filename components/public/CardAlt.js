import Image from "next/image";
import Link from "next/link";
import { FiDownload, FiImage } from "react-icons/fi";

export default function CardAlt() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
      <div className="rounded-md grid md:grid-cols-2 grid-cols-1 items-center gap-4 p-4 mx-auto flex-col md:w-full w-11/12">
        <div className="w-full mx-auto">
          <Image
            className="rounded-4xl h-[300px] object-cover"
            src="/renungan.jpg"
            height={300}
            width={450}
            alt="gambar renungan"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 mt-2">Title</h3>
          <span className="block pb-2">9 Agustus 2025</span>
          <Link
            href="#"
            className="inline-block rounded-md py-2 px-8 bg-[#0176CE] text-white font-bold "
          >
            Download e-Warta
            <FiDownload className="inline-block ml-2 align-middle" />
          </Link>
          <Link
            href="#"
            className="block rounded-md mt-[20px] text-[#555555] font-semibold"
          >
            Lihat e-Warta selengkapnya
          </Link>
        </div>
      </div>
      <div className="rounded-md grid md:grid-cols-2 grid-cols-1 items-center gap-4 p-4 mx-auto flex-col md:w-full w-11/12">
        <div className="w-full mx-auto">
          <Image
            className="rounded-4xl h-[300px] object-cover"
            src="/renungan.jpg"
            height={300}
            width={450}
            alt="gambar renungan"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 mt-2">Title</h3>
          <span className="block pb-2">9 Agustus 2025</span>
          <Link
            href="#"
            className="inline-block rounded-md py-2 px-8 bg-[#0176CE] text-white font-bold "
          >
            Lihat Galeri
            <FiImage className="inline-block ml-2 align-middle" />
          </Link>
          <Link
            href="#"
            className="block rounded-md mt-[20px] text-[#555555] font-semibold"
          >
            Lihat galeri selengkapnya
          </Link>
        </div>
      </div>
    </div>
  );
}
