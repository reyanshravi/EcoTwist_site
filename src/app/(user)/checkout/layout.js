import { CartProvider } from "@/hooks/cartContext";

export default function checkoutLayout({ children }) {
    return <CartProvider>
        <main>{children}</main>
    </CartProvider>
}