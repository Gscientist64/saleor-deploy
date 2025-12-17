import { PaymentMethods } from "./PaymentMethods";
import { Divider } from "@/checkout/components/Divider";
import { Title } from "@/checkout/components/Title";
import { usePayments } from "./usePayments";
import { useState } from "react";

export const PaymentSection = () => {
  const { availablePaymentGateways } = usePayments();

  // Selected payment method (default = manual payment)
  const [selectedGateway, setSelectedGateway] = useState("manual-payment");

  return (
    <>
      <Divider />

      <div className="py-4" data-testid="paymentMethods">
        <Title>Payment Methods</Title>

        <PaymentMethods
          gateways={availablePaymentGateways}
          selectedGateway={selectedGateway}
          setSelectedGateway={setSelectedGateway}
        />
      </div>
    </>
  );
};
