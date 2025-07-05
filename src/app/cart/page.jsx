import React from "react";
import Link from "next/link";
import { ArrowUp, ArrowDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Page({
  cartItems = [],
  updateQuantity,
  removeFromCart,
}) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  // If the cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-ivory py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="font-heading text-3xl font-bold text-slate-800 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-slate-600 mb-8">
              Looks like you haven't added any sustainable products to your cart
              yet.
            </p>
            <Link href="/shop">
              <Button className="eco-button text-lg px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-slate-800 mb-2">
            Shopping Cart
          </h1>
          <p className="text-slate-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Product Image */}
                  <div className="md:w-32 md:h-32 w-full h-48 rounded-lg overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-slate-800 mb-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.material}
                          </Badge>
                          <Badge className="bg-forest text-white text-xs">
                            Eco Score: {item.eco_score}/10
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Price */}
                      <div className="font-heading font-bold text-xl text-slate-800">
                        ₹{item.price}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-600">
                          Quantity:
                        </span>
                        <div className="flex items-center border border-slate-200 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              item.quantity > 1 &&
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-slate-50"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-slate-50"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="font-heading font-bold text-lg text-forest">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
              <h2 className="font-heading text-xl font-semibold text-slate-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-800">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-medium text-forest">Free</span>
                  ) : (
                    <span className="font-medium text-slate-800">
                      ₹{shipping}
                    </span>
                  )}
                </div>

                {shipping > 0 && (
                  <div className="text-sm text-slate-500">
                    Add ₹{999 - subtotal} more for free shipping
                  </div>
                )}

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-heading font-semibold text-lg text-slate-800">
                    Total
                  </span>
                  <span className="font-heading font-bold text-xl text-forest">
                    ₹{total}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/checkout">
                  <Button className="w-full eco-button text-lg py-3">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Eco Impact */}
              <div className="mt-6 p-4 bg-forest-50 rounded-lg">
                <h3 className="font-semibold text-forest mb-2">
                  🌱 Your Eco Impact
                </h3>
                <div className="text-sm text-slate-700 space-y-1">
                  <div>
                    Trees saved:{" "}
                    {(
                      cartItems.reduce((sum, item) => sum + item.quantity, 0) *
                      0.5
                    ).toFixed(2)}
                  </div>
                  <div>
                    Waste upcycled:{" "}
                    {(
                      cartItems.reduce(
                        (sum, item) => sum + item.quantity * 150,
                        0
                      ) / 1000
                    ).toFixed(2)}
                    kg
                  </div>
                  <div>
                    CO2 reduced:{" "}
                    {cartItems
                      .reduce((sum, item) => sum + item.quantity * 2.3, 0)
                      .toFixed(2)}
                    kg
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="mt-4 text-xs text-slate-500 text-center">
                🔒 Secure checkout with 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
