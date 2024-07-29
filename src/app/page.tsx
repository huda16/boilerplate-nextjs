import { Metadata } from "next";

import { Home } from "@/components/home";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <div>HomePage</div>
      <Home />
    </>
  );
}
