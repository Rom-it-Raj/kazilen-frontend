import "./globals.css";
import ConditionalHeader from "./components/ConditionalHeader";
import ConditionalBottomNav from "./components/ConditionalBottomNav";
import ServiceWorkerRegister from "./ServiceWorkerRegister";

export const metadata = {
  title: "Kazilen",
  description: "Rom writing ya disc",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ServiceWorkerRegister />
        <ConditionalHeader />
        {children}
        <ConditionalBottomNav />
      </body>
    </html>
  );
}