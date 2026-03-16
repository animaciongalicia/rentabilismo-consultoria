import { redirect } from "next/navigation";
import { MODULOS } from "@/components/SidebarModulos";

export default function AppPage() {
  redirect(`/app/modulos/${MODULOS[0].slug}`);
}
