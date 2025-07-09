/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} image
 * @property {string} description
 * @property {string} category
 * @property {number} stock
 */

/**
 * @typedef {Object} CartItem
 * @property {Product} product
 * @property {number} quantity
 */

/**
 * @typedef {Object} DeliveryAddress
 * @property {string} fullName
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 * @property {string} phone
 */

/**
 * @typedef {'cod' | 'online'} PaymentMethod
 * @typedef {'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'} OrderStatus
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {CartItem[]} items
 * @property {number} totalAmount
 * @property {DeliveryAddress} deliveryAddress
 * @property {PaymentMethod} paymentMethod
 * @property {OrderStatus} status
 * @property {string} orderDate
 * @property {string} estimatedDelivery
 */
