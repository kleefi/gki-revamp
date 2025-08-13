import Formberita from "../../form/FormBerita";
export const metadata = {
  title: "Edit Berita - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function EditRenunganPage({ params }) {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        <Formberita id={params.id} />
      </div>
    </div>
  );
}
