import { CartProvider } from "@/hooks/cartContext";

export default function DashboardLayout({ children }) {
  return (
    <CartProvider>
      <main>{children}</main>
    </CartProvider>
  );
}
