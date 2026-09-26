import type {Metadata,} from "next";
import type {ReactNode,} from "react";
import {Oswald,} from "next/font/google";
import {Toaster,} from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {PlanProvider,} from "@/context/PlanContext";
import "./globals.css";

const oswald = Oswald({
  subsets: [
    "latin",
  ],
  weight: [
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
  ],
  variable:
    "--font-oswald",
});
export const metadata: Metadata = {
  title: "FitLog",
  description:
    "Workout Library and Daily Training Planner",
};
interface RootLayoutProps {
  children: ReactNode;
}
const RootLayout = ({
  children,
}: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={
          oswald.variable
        }
      >
        <PlanProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background:
                  "#171717",
                color:
                  "#ffffff",
                border:
                  "1px solid rgba(255,255,255,0.10)",
              },
              success: {
                iconTheme: {
                  primary:
                    "#d7ff00",
                  secondary:
                    "#0a0a0a",
                },
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
};

export default RootLayout;