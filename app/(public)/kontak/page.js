import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

export const metadata = {
  title: "Hubungi Kami - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cielungs. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};

export default function HubungiKami() {
  return (
    <div className="max-w-screen-xl mx-auto pt-48 px-6">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-4xl font-semibold mb-8 text-gray-600 tracking-wide">
            Hubungi Kami
          </h2>

          <div className="flex items-start gap-5 bg-white rounded-xl p-6 shadow-lg mb-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-[#b2aaaa] rounded-full p-3 text-white text-3xl flex-shrink-0">
              <MdLocationOn />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#b2aaaa] mb-2">
                Alamat
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Perumahan Citraland Cibubur <br />
                Ruko The Avenue 1, Blok R.08/03-05 Jl. Raya Cileungsi Km.4{" "}
                <br />
                Bogor - Cileungsi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 bg-white rounded-xl p-6 shadow-lg mb-6 hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-[#b2aaaa] rounded-full p-3 text-white text-3xl flex-shrink-0">
              <MdPhone />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#b2aaaa] mb-1">
                Telp / WhatsApp
              </h3>
              <p className="text-gray-600">+62 812-1414-9253</p>
            </div>
          </div>

          <div className="flex items-center gap-5 bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-[#b2aaaa] rounded-full p-3 text-white text-3xl flex-shrink-0">
              <MdEmail />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#b2aaaa] mb-1">
                Email
              </h3>
              <p className="text-gray-600">info@gkikranggan.id</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-[#f4f4f4] to-[#e0dede] rounded-3xl p-10 shadow-xl">
          <h2 className="text-4xl font-semibold mb-10 text-gray-600 tracking-wide text-center">
            Kirim Pesan
          </h2>
          <form className="flex flex-col gap-6">
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b2aaaa] transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b2aaaa] transition"
              required
            />
            <textarea
              name="message"
              placeholder="Pesan"
              rows={5}
              className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b2aaaa] transition resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-[#b2aaaa] text-white font-semibold py-4 rounded-xl hover:bg-[#998d8d] transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>

      {/* Maps bawah */}
      <div className="mt-12 rounded-3xl overflow-hidden shadow-xl h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7929.845870596485!2d107.00745!3d-6.40393!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69979532424f97%3A0x132c6d989d3387e!2sGKI%20Kranggan%20-%20BAJEM%20Cileungsi!5e0!3m2!1sen!2sid!4v1754807408208!5m2!1sen!2sid"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi GKI Kranggan BAJEM Cileungsi"
        ></iframe>
      </div>
    </div>
  );
}
