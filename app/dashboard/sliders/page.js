import Link from "next/link";
import ListSliders from "./sliders";

export const metadata = {
  title: "Sliders - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function SlidersPage() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        <h1 className="font-bold md:text-3xl text-2xl mb-8">
          List Sliders /{" "}
          <span className="text-lg bg-blue-600 px-4 py-3 text-white rounded-md md:inline-block block">
            <Link href="/dashboard/sliders/create">+ Create Sliders</Link>
          </span>
        </h1>
        <ListSliders />
      </div>
    </div>
  );
}
