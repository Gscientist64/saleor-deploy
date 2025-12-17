// @ts-nocheck
import { paymentMethodToComponent } from "./supportedPaymentApps";
import { ManualPayment } from "./ManualPayment";

export const PaymentMethods = ({ gateways, selectedGateway, setSelectedGateway }) => {
  const safeGateways = Array.isArray(gateways) ? gateways : [];

  const allGateways = [
    { id: "manual-payment", name: "Pay on Delivery" },
    ...safeGateways,
  ];

  return (
    <div className="space-y-4">
      {allGateways.map((gateway) => {
        const isSelected = selectedGateway === gateway.id;
        const GatewayComponent = paymentMethodToComponent[gateway.id] || null;

        return (
          <div
            key={gateway.id}
            onClick={() => setSelectedGateway(gateway.id)}
            className={`rounded-xl p-5 cursor-pointer transition-all shadow-sm ${
              isSelected
                ? "border-2 border-pink-500 bg-pink-50 shadow-md scale-[1.02]"
                : "border border-gray-300 bg-white hover:border-pink-300 hover:shadow"
            }`}
          >
            <h3 className="font-semibold mb-2">
              {gateway.name || 
               gateway.id === "app.saleor.adyen" ? "Adyen" :
               gateway.id === "app.saleor.stripe" ? "Stripe" :
               gateway.id === "app.saleor.dummy" ? "Dummy" :
               gateway.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h3>

            {isSelected && gateway.id === "manual-payment" && <ManualPayment />}

            {isSelected && gateway.id !== "manual-payment" && GatewayComponent && (
              <GatewayComponent config={gateway} />
            )}
          </div>
        );
      })}
    </div>
  );
};