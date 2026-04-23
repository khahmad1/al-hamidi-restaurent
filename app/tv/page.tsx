import type { Metadata } from "next";
import MenuBoard from "@/components/MenuBoard/MenuBoard";

export const metadata: Metadata = {
  title: "Al-Hamidi — قائمة العرض",
  description: "قائمة معجنات الحميدي — عرض مخصص للشاشات",
};

export default function TvMenuPage() {
  return <MenuBoard />;
}
