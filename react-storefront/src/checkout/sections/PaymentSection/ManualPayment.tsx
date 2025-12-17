export const ManualPayment = () => {
  return (
    <div className="mt-3 p-4 rounded-lg bg-pink-50 border border-pink-300 shadow-sm">
      <h4 className="text-lg font-semibold text-pink-700 mb-1">
        Pay on Delivery
      </h4>

      <p className="text-sm text-gray-700 leading-relaxed">
        You have selected <strong>Pay on Delivery</strong>. Your order will be
        delivered to your address, and payment will be collected upon delivery.
      </p>

      <div className="mt-3 text-xs text-pink-600 bg-pink-100 p-2 rounded">
        ✔ No online payment required  
        ✔ Your order will be manually verified by our team
      </div>
    </div>
  );
};
