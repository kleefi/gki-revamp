import FormLiturgi from "../../form/FormLiturgi";
export const metadata = {
  title: "Edit Liturgi - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function EditLiturgiPage({ params }) {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        <FormLiturgi id={params.id} />
      </div>
    </div>
  );
}
