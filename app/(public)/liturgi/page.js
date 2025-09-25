import CardAlt from "@/components/public/CardAlt";

export const metadata = {
  title: "e-Liturgi - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function Liturgi() {
  return (
    <div className="bg-[#ececec]">
      <div className="max-w-screen-xl mx-auto md:pt-46 pt-30">
        <h2 className="font-bold mx-auto md:text-4xl text-xl pb-8 md:w-full w-11/12">
          Liturgi
        </h2>
        <div className="grid md:grid-cols-2 grid-cols-1 mx-auto gap-12 pb-8">
          <CardAlt type="eliturgi" limit={6} ctaLabel="Download e-Liturgi" />
        </div>
      </div>
    </div>
  );
}
