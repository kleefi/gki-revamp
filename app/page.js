import Hero from "@/component/Hero";
import Card from "@/component/layouts/Card";
import CardAlt from "@/component/layouts/CardAlt";

export const metadata = {
  title: "Beranda - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cielungs. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function Beranda() {
  return (
    <div>
      <div className="w-full mx-auto flex md:mt-0 md:pt-0 pt-24">
        <Hero />
      </div>
      <div className="bg-gray-100 mb-16">
        <div className="max-w-screen-xl mx-auto py-8">
          <h2 className="text-center font-bold md:text-4xl text-xl md:mb-0 -mb-4">
            Jadwal Kebaktian
          </h2>
          <div className="grid md:grid-cols-3 grid-cols-1 text-center pt-8">
            <div className="hover:bg-blue-500 hover:text-white md:p-8 p-2">
              <h3 className="md:text-2xl text-md font-semibold">
                Kebaktian Anak
              </h3>
              <p>08.00 WIB</p>
            </div>
            <div className="hover:bg-blue-500 hover:text-white md:p-8 p-2">
              <h3 className="md:text-2xl text-md font-semibold">
                Kebaktian Pemuda/Remaja
              </h3>
              <p>08.00 WIB</p>
            </div>
            <div className="hover:bg-blue-500 hover:text-white md:p-8 p-2">
              <h3 className="md:text-2xl text-md font-semibold">
                Kebaktian Umum
              </h3>
              <p>08.00 WIB</p>
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
