import { CartProvider } from "@/hooks/cardContext";

export default function DashboardLayout({ children }) {
  return (
    <CartProvider>
      <main>{children}</main>
    </CartProvider>
  );
}
