import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import Operation from "./Operation";

function CheckOut({ cart , totalPrice , user , setCart}) {
  const [displayOperation , setDisplayOperation] = useState(false)
  const [operationMessage , setOperationMessage] = useState('')
  const products = []
  cart.map((item) => products.push(item.nameInUrl))
  return (
    <>
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
            let post = {}
            cart.map((item) => {
              let today = new Date()
              today.setDate(today.getDate() + 7)
              
              if(item.nameInUrl === 'badge'){
                post = {...post , blue_badge_trader:true}
              }
              
              if(item.nameInUrl === 'RhyconCyclone'){
                post = {...post , premium_trader:true}
              }
              
              if(item.nameInUrl === 'signals'){
                post = {...post , premium_signals:true , signals_duration:today}
              }
              updateDoc(doc(db,'users',user.docId),post)
              setDisplayOperation(true)
              setOperationMessage('your order have been fullfiled')
              setCart([])
            })
          }}
          />
    </PayPalScriptProvider>
      {displayOperation && <Operation message={operationMessage} success={true} setOperation={setDisplayOperation} />}
        </>
  );
}

export default CheckOut;
