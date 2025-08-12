import Link from "next/link";
import ListKontak from "./kontak";

export const metadata = {
  title: "Kontak - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function KontakPage() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        <h1 className="font-bold md:text-3xl text-2xl mb-8">List Kontak</h1>
        <ListKontak />
      </div>
    </div>
  );
}
