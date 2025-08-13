import FormWarta from "../../form/FormWarta";
export const metadata = {
  title: "Edit eWarta - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function EditWartaPage({ params }) {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        <FormWarta id={params.id} />
      </div>
    </div>
  );
}
