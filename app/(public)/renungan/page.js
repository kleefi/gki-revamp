import Card from "@/components/public/Card";

export const metadata = {
  title: "Renungan - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function Renungan() {
  return (
    <div className="max-w-screen-xl mx-auto md:pt-46 pt-30">
      <h2 className="font-bold mx-auto md:text-4xl text-xl pb-8 md:w-full w-11/12">
        Renungan
      </h2>
      <Card type="renungan" limit={6} ctaLabel="Selengkapnya" />
    </div>
  );
}
