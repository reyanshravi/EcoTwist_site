"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, MapPin, CreditCard, Calendar, Eye } from 'lucide-react';
import { useCart } from '@/hooks/cartContext';
import Link from 'next/link';

const OrdersPage = () => {
    const { orders } = useCart();

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500';
            case 'confirmed': return 'bg-blue-500';
            case 'shipped': return 'bg-purple-500';
            case 'delivered': return 'bg-green-500';
            case 'cancelled': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!orders || orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="text-center py-12">
                        <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                        <Link href="/products">
                            <Button>Browse Products</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
                    <p className="text-sm text-gray-500">{orders.length} order(s) found</p>
                </div>
            </header>

            <div className="p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {orders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Package className="w-5 h-5" />
                                            Order {order.id}
                                        </CardTitle>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Placed on {formatDate(order.orderDate)}
                                        </p>
                                    </div>
                                    <Badge className={getStatusColor(order.status)}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Order Items */}
                                <div>
                                    <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                                    <div className="space-y-2">
                                        {order.items.map((item) => (
                                            <div key={item.product.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                                <img
                                                    src={item.product.image || "/placeholder.svg"}
                                                    alt={item.product.name}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">{item.product.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        ${item.product.price} × {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-medium text-sm">
                                                    ${(item.product.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-sm">Delivery Address</p>
                                            <p className="text-xs text-gray-600">
                                                {order.deliveryAddress.fullName}<br />
                                                {order.deliveryAddress.street}<br />
                                                {order.deliveryAddress.city}, {order.deliveryAddress.state}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <CreditCard className="w-4 h-4 mt-1 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-sm">Payment</p>
                                            <p className="text-xs text-gray-600">
                                                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <Calendar className="w-4 h-4 mt-1 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-sm">Estimated Delivery</p>
                                            <p className="text-xs text-gray-600">
                                                {formatDate(order.estimatedDelivery)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Total & Actions */}
                                <div className="flex justify-between items-center pt-4 border-t">
                                    <div>
                                        <p className="text-lg font-semibold">
                                            Total: ${order.totalAmount.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Eye className="w-4 h-4 mr-1" />
                                            Track Order
                                        </Button>
                                        {order.status === 'delivered' && (
                                            <Button variant="outline" size="sm">
                                                Reorder
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
