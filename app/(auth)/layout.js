import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }) {
  return (
    <main>
      {children}
      <Toaster position="top-right" />
    </main>
  );
}
