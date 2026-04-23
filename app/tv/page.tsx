import type { Metadata } from "next";
import MenuBoard from "@/components/MenuBoard/MenuBoard";

// Always render fresh — so admin edits to menu.json reflect immediately
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Al-Hamidi — قائمة العرض",
  description: "قائمة معجنات الحميدي — عرض مخصص للشاشات",
};

export default function TvMenuPage() {
  return <MenuBoard />;
}
