"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, CreditCard, MapPin } from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { useToast } from '@/hooks/use-toast';

const page = () => {
  const router = useRouter();
  const { placeOrder } = useCart();
  const { toast } = useToast();

  // In Next.js, you cannot pass location.state directly.
  // You need to pass data via query params, context, or global state.
  // Here, for demo, I assume you stored order data in localStorage or context.
  // If you want to pass via query string, parse router.query accordingly.

  // For demo, let's assume order details are saved in sessionStorage under 'checkoutData':
  const [checkoutData, setCheckoutData] = React.useState(null);

  useEffect(() => {
    const dataStr = sessionStorage.getItem('checkoutData');
    if (dataStr) {
      setCheckoutData(JSON.parse(dataStr));
    } else {
      // No data found, redirect to cart page
      router.replace('/cart');
    }
  }, [router]);

  if (!checkoutData) {
    // Or show a loading spinner here if you want
    return null;
  }

  const { deliveryAddress, paymentMethod, cartItems, totalAmount } = checkoutData;

  const handlePlaceOrder = () => {
    const orderId = placeOrder(deliveryAddress, paymentMethod);

    toast({
      title: "Order Placed Successfully!",
      description: `Your order ${orderId} has been confirmed.`,
    });

    router.push('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
          <p className="text-sm text-gray-500">Review your order details</p>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-4xl mx-auto grid gap-6 lg:grid-cols-3">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{deliveryAddress.fullName}</p>
                  <p className="text-gray-600">{deliveryAddress.street}</p>
                  <p className="text-gray-600">
                    {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}
                  </p>
                  {deliveryAddress.phone && (
                    <p className="text-gray-600">Phone: {deliveryAddress.phone}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">
                    {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={item.product.id}>
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">
                            ${item.product.price} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      {index < cartItems.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Estimated delivery: 5-7 business days</p>
                    <p>• Free returns within 30 days</p>
                    <p>• Customer support available 24/7</p>
                  </div>

                  <Button onClick={handlePlaceOrder} className="w-full" size="lg">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Place Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
