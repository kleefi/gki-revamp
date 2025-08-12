"use client";
import { useState, useRef } from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

export default function Kontak() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef(null); // Add form ref for better reset

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/kontak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Terjadi kesalahan");
      }

      setSuccessMsg(data.message);
      // Reset form
      setForm({ name: "", phone: "", email: "", message: "" });
      // Optional: Reset form validation
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto pt-48 px-6">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-12">
        {/* Left side content remains the same */}
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
          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
              {successMsg}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            ref={formRef}
          >
            <input
              type="text"
              name="name"
              value={form.name} // Add value binding
              onChange={handleChange}
              placeholder="Nama"
              className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b2aaaa] transition"
              required
            />
            <input
              type="tel" // Changed from "phone" to "tel" for better HTML5 validation
              name="phone"
              value={form.phone} // Add value binding
              onChange={handleChange}
              placeholder="Phone"
              className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b2aaaa] transition"
            />
            <input
              type="email"
              name="email"
              value={form.email} // Add value binding
              onChange={handleChange}
              placeholder="Email"
              className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b2aaaa] transition"
              required
            />
            <textarea
              name="message"
              value={form.message} // Add value binding
              placeholder="Pesan"
              onChange={handleChange}
              rows={5}
              className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b2aaaa] transition resize-none"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading} // Disable button when loading
              className={`bg-[#b2aaaa] text-white font-semibold py-4 rounded-xl hover:bg-[#998d8d] transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer flex justify-center items-center ${
                loading ? "opacity-75" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Kirim Pesan"
              )}
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
