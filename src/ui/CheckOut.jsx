import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function CheckOut({ cart , totalPrice }) {
  const products = []
  cart.map((item) => products.push(item.nameInUrl))
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AXA0RnGh9y8cjy8a5daWd96J2DVHFo4b6GcGaxAK2kWt2hfZPmQV31djVjDzSB1iC7Il756w2OONEqdk",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPrice.toFixed(2).toString() ,
                },
              },
            ],
            // application_context: {
            //   shipping_preference: 'NO_SHIPPING',
            // },
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture()
          console.log("success")
        }}
        />
    </PayPalScriptProvider>
  );
}

export default CheckOut;
