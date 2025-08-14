import Link from "next/link";
import FormLiturgi from "../form/FormLiturgi";
export const metadata = {
  title: "Create e-Liturgi - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function CreateLiturgi() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        <h1 className="font-bold md:text-3xl text-2xl mb-8">
          Create Litrugi /{" "}
          <span className="text-lg bg-blue-600 px-4 py-3 text-white rounded-md md:inline-block block">
            <Link href="/dashboard/liturgi/">List Liturgi</Link>
          </span>
        </h1>
        <FormLiturgi />
      </div>
    </div>
  );
}
