import Image from "next/image";
import Link from "next/link";

export default function Card() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
      <div className="rounded-md bg-white p-4 flex mx-auto flex-col md:w-full w-11/12">
        <div className="w-full mx-auto">
          <Image
            className="object-cover "
            src="/renungan.jpg"
            height={50}
            width={450}
            alt="gambar renungan"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 mt-2">Title</h3>
          <span className="inline-block pb-2">9 Agustus 2025</span>
          <p className="text-gray-600">
            Yehezkiel 3:12 - 21 “Hai anak manusia, Aku telah menetapkan engkau
            menjadi penjaga kaum Israel. Bilamana engkau mendengar firman dari
            mulut-Ku, peringatkanlah mereka atas nama-Ku.” (Yehezkiel 3:17)
            “Kita hadir untuk memberikan dampak yang positif bagi kehidupan
            bersama,” begitu kata sebuah...
          </p>
          <Link
            className="inline-block rounded-md my-4 py-2 px-4 bg-[#0176CE] text-white font-bold"
            href="#"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
      <div className="rounded-md bg-white p-4 flex mx-auto flex-col md:w-full w-11/12">
        <div className="w-full mx-auto">
          <Image
            className="object-cover "
            src="/renungan.jpg"
            height={50}
            width={450}
            alt="gambar renungan"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 mt-2">Title</h3>
          <span className="inline-block pb-2">9 Agustus 2025</span>
          <p className="text-gray-600">
            Yehezkiel 3:12 - 21 “Hai anak manusia, Aku telah menetapkan engkau
            menjadi penjaga kaum Israel. Bilamana engkau mendengar firman dari
            mulut-Ku, peringatkanlah mereka atas nama-Ku.” (Yehezkiel 3:17)
            “Kita hadir untuk memberikan dampak yang positif bagi kehidupan
            bersama,” begitu kata sebuah...
          </p>
          <Link
            className="inline-block rounded-md my-4 py-2 px-4 bg-[#0176CE] text-white font-bold"
            href="#"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
      <div className="rounded-md bg-white p-4 flex mx-auto flex-col md:w-full w-11/12">
        <div className="w-full mx-auto">
          <Image
            className="object-cover "
            src="/renungan.jpg"
            height={50}
            width={450}
            alt="gambar renungan"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 mt-2">Title</h3>
          <span className="inline-block pb-2">9 Agustus 2025</span>
          <p className="text-gray-600">
            Yehezkiel 3:12 - 21 “Hai anak manusia, Aku telah menetapkan engkau
            menjadi penjaga kaum Israel. Bilamana engkau mendengar firman dari
            mulut-Ku, peringatkanlah mereka atas nama-Ku.” (Yehezkiel 3:17)
            “Kita hadir untuk memberikan dampak yang positif bagi kehidupan
            bersama,” begitu kata sebuah...
          </p>
          <Link
            className="inline-block rounded-md my-4 py-2 px-4 bg-[#0176CE] text-white font-bold"
            href="#"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
    </div>
  );
}
