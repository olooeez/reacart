import { createContext, useContext, useState } from "react";

export const PaymentContext = createContext();
PaymentContext.displayName = "Payment";

export const PaymentProvider = ({ children }) => {
  const paymentTypes = [
    {
      name: "Boleto",
      fees: 1,
      id: 1,
    },
    {
      name: "Cartão de crédito",
      fees: 1.3,
      id: 2,
    },
    {
      name: "PIX",
      fees: 1,
      id: 3,
    },
    {
      name: "Crediário",
      fees: 1.5,
      id: 4,
    },
  ];

  const [paymentMethod, setPaymentMethod] = useState(paymentTypes[0]);

  return (
    <PaymentContext.Provider
      value={{
        paymentTypes,
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const { paymentTypes, paymentMethod, setPaymentMethod } =
    useContext(PaymentContext);

  const changePaymentMethod = (id) => {
    const currentPayment = paymentTypes.find((payment) => payment.id === id);

    setPaymentMethod(currentPayment);
  };

  return { paymentTypes, paymentMethod, changePaymentMethod };
};
