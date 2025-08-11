import CardAlt from "@/components/public/CardAlt";

export const metadata = {
  title: "e-Warta - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function Warta() {
  return (
    <div className="max-w-screen-xl mx-auto pt-48">
      <h2 className="font-bold mx-auto md:text-4xl text-xl pb-8 md:w-full w-11/12">
        e-Warta
      </h2>
      <CardAlt />
    </div>
  );
}
