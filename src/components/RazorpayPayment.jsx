import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

const RazorpayPayment = ({
  amount,
  onSuccess,
  onError,
  deliveryAddress,
  disabled = false,
}) => {
  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve(true);
      } else {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
        document.body.appendChild(script);
      }
    });

  const initializePayment = () => {
    const options = {
      key: 'rzp_test_9999999999', 
      amount: Math.round(amount * 100), 
      currency: 'USD',
      name: 'Your Store Name',
      description: 'Order Payment',
      image: '/placeholder.svg',
      prefill: {
        name: deliveryAddress.fullName,
        email: '', // Optional
        contact: deliveryAddress.phone,
      },
      notes: {
        address: `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zipCode}`,
      },
      theme: {
        color: '#3399cc',
      },
      handler: (response) => {
        onSuccess(response.razorpay_payment_id);
      },
      modal: {
        ondismiss: () => {
          console.log('Payment modal closed');
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        onError(response.error);
      });
      rzp.open();
    } catch (error) {
      onError(error);
    }
  };

  const handlePayment = async () => {
    try {
      await loadRazorpayScript();
      initializePayment();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Button onClick={handlePayment} className="w-full" size="lg" disabled={disabled}>
      <CreditCard className="w-4 h-4 mr-2" />
      Pay with Razorpay - ${amount.toFixed(2)}
    </Button>
  );
};

export default RazorpayPayment;
