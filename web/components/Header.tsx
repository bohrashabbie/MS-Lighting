import { getCategories } from "@/lib/api";
import SiteHeader, { GROUP_URL } from "./SiteHeader";

export { GROUP_URL };

export default async function Header() {
  const categories = await getCategories().catch(() => []);
  return <SiteHeader categories={categories} />;
}
