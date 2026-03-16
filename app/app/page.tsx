import { redirect } from "next/navigation";
import { MODULOS } from "@/config/modulos";

export default function AppPage() {
  redirect(`/app/modulos/${MODULOS[0].slug}`);
}
