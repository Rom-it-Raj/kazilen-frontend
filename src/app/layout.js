import "./globals.css";
import ConditionalHeader from "./components/ConditionalHeader";
    import ConditionalBottomNav from "./components/ConditionalBottomNav";
import ServiceWorkerRegister from "./ServiceWorkerRegister";
import LocationLoader from "./components/LocationLoader"
import Providers from "./providers";
import NetworkStatus from "./components/NetworkStatus";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export const metadata = {
  title: "Kazilen",
  description: "Rom writing ya disc",
  manifest: "/manifest.json",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>
          <Providers>
            <NetworkStatus />
            <ServiceWorkerRegister />
            <ConditionalHeader />
            <LocationLoader />
            {children}
            <ConditionalBottomNav />
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}