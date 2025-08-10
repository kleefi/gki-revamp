import Hero from "@/component/Hero";
import Card from "@/component/layouts/Card";
import CardAlt from "@/component/layouts/CardAlt";
import { FiUsers, FiBookOpen, FiCalendar } from "react-icons/fi";

export const metadata = {
  title: "Beranda - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function Beranda() {
  return (
    <div>
      <div className="w-full mx-auto flex md:mt-0 md:pt-0 pt-24">
        <Hero />
      </div>
      <div className="bg-gray-100 mb-16">
        <div className="max-w-screen-xl mx-auto py-8 px-4">
          <h2 className="text-center font-bold md:text-4xl text-2xl md:mb-8 mb-6 text-gray-700 tracking-wide">
            Jadwal Kebaktian
          </h2>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center cursor-pointer transition duration-300 hover:shadow-md hover:bg-blue-50">
              <FiUsers className="text-4xl mb-4 text-[#7c6e6e]" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Kebaktian Anak
              </h3>
              <p className="text-md font-medium text-gray-600">08.00 WIB</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center cursor-pointer transition duration-300 hover:shadow-md hover:bg-green-50">
              <FiBookOpen className="text-4xl mb-4 text-[#7c6e6e]" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Kebaktian Pemuda/Remaja
              </h3>
              <p className="text-md font-medium text-gray-600">08.00 WIB</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center cursor-pointer transition duration-300 hover:shadow-md hover:bg-purple-50">
              <FiCalendar className="text-4xl mb-4 text-[#7c6e6e]" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Kebaktian Umum
              </h3>
              <p className="text-md font-medium text-gray-600">08.00 WIB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto my-16">
        <h2 className="font-bold mx-auto md:text-4xl text-xl pb-8 md:w-full w-11/12">
          Renungan
        </h2>
        <Card />
      </div>
      <div className="bg-gray-100 mb-16">
        <div className="max-w-screen-xl mx-auto py-8">
          <CardAlt />
        </div>
      </div>
    </div>
  );
}
