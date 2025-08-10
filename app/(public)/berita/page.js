import Card from "@/component/layouts/Card";

export const metadata = {
  title: "Berita - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function Berita() {
  return (
    <div className="max-w-screen-xl mx-auto pt-48">
      <h2 className="font-bold mx-auto md:text-4xl text-xl pb-8 md:w-full w-11/12">
        Berita
      </h2>
      <Card />
    </div>
  );
}
