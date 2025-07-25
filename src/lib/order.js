// src/types/order.js

// Product shape example (for reference)
export const exampleProduct = {
  id: 'product-1',
  name: 'Product Name',
  price: 29.99,
  image: '/product.jpg',
  description: 'This is a product.',
  category: 'Electronics',
  stock: 10,
};

// CartItem example
export const exampleCartItem = {
  product: exampleProduct,
  quantity: 2,
};

// DeliveryAddress example
export const exampleDeliveryAddress = {
  fullName: 'John Doe',
  street: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  phone: '555-1234',
};

// Order example
export const exampleOrder = {
  id: 'ORD-123456',
  items: [exampleCartItem],
  totalAmount: 59.98,
  deliveryAddress: exampleDeliveryAddress,
  paymentMethod: 'cod', // or 'online'
  status: 'pending', // other values: confirmed, shipped, delivered, cancelled
  orderDate: new Date().toISOString(),
  estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
};
