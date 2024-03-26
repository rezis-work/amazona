import FooterItem from "./FooterItem";
import { PRODUCTS, SUPPORT, COMPANY, RESQURCES } from "../menus";

export default function FooterContainer() {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <FooterItem Links={PRODUCTS} title="PRODUCTS" />
      <FooterItem Links={RESQURCES} title="RESOQURES" />
      <FooterItem Links={COMPANY} title="COMPANY" />
      <FooterItem Links={SUPPORT} title="SUPPORT" />
    </div>
  );
}
