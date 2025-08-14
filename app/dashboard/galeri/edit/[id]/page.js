import FormGaleri from "../../form/FormGaleri";
export const metadata = {
  title: "Edit Galeri - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function EditGaleriPage({ params }) {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        <FormGaleri id={params.id} />
      </div>
    </div>
  );
}
