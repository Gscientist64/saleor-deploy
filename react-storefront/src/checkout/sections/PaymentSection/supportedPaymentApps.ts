import { AdyenDropIn } from "./AdyenDropIn/AdyenDropIn";
import { adyenGatewayId } from "./AdyenDropIn/types";
import { DummyComponent } from "./DummyDropIn/dummyComponent";
import { dummyGatewayId } from "./DummyDropIn/types";
import { StripeComponent } from "./StripeV2DropIn/stripeComponent";
import { stripeV2GatewayId } from "./StripeV2DropIn/types";

// Add a manual gateway ID
export const manualGatewayId = "manual-payment";

export const paymentMethodToComponent = {
  [manualGatewayId]: null, // Manual payment has no drop-in form
  [adyenGatewayId]: AdyenDropIn,
  [stripeV2GatewayId]: StripeComponent,
  [dummyGatewayId]: DummyComponent,
};

// Helper function returns supported gateways for UI
export const getSupportedGateways = () => [
  {
    id: manualGatewayId,
    name: "Pay on Delivery",
  },
  {
    id: dummyGatewayId,
    name: "Dummy Payment",
  },
];
