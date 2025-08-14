import DashboardPage from "./dashboard";

export const metadata = {
  title: "Dashboard - GKI Kranggan BAJEM Cileungsi",
  description:
    "Website official GKI Kranggan BAJEM Cileungsi. Berisi informasi dan kegiatan dari jemaat GKI Kranggan Bajem",
};
export default function Dashboard() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14">
        <DashboardPage />
      </div>
    </div>
  );
}
