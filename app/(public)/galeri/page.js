import CardAlt from "@/component/layouts/CardAlt";

export const metadata = {
  title: "Galeri - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function Galeri() {
  return (
    <div className="max-w-screen-xl mx-auto pt-48">
      <h2 className="font-bold mx-auto md:text-4xl text-xl pb-8 md:w-full w-11/12">
        Galeri
      </h2>
      <CardAlt />
    </div>
  );
}
