import { useEffect } from "react";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { useCheckoutComplete } from "@/checkout/hooks/useCheckoutComplete";
import { type PaymentStatus } from "@/checkout/sections/PaymentSection/types";
import { usePaymentGatewaysInitialize } from "@/checkout/sections/PaymentSection/usePaymentGatewaysInitialize";
import { usePaymentStatus } from "@/checkout/sections/PaymentSection/utils";
import { getQueryParams } from "@/checkout/lib/utils/url";

const paidStatuses: PaymentStatus[] = ["overpaid", "paidInFull", "authorized"];

export const usePayments = () => {
  const { checkout } = useCheckout();
  const paymentStatus = usePaymentStatus(checkout);

  const { fetching, availablePaymentGateways } = usePaymentGatewaysInitialize();
  const { onCheckoutComplete, completingCheckout } = useCheckoutComplete();

  useEffect(() => {
    const { processingPayment } = getQueryParams();

    if (processingPayment) return;

    if (!completingCheckout && paidStatuses.includes(paymentStatus)) {
      void onCheckoutComplete();
    }
  }, [completingCheckout, onCheckoutComplete, paymentStatus]);

  // Safety: Saleor returns null if no payment apps installed
  const safeGateways = Array.isArray(availablePaymentGateways)
    ? availablePaymentGateways
    : [];

  return { fetching, availablePaymentGateways: safeGateways };
};
