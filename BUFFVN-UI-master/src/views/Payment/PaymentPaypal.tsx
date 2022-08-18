import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Ultils from "../../ultils/common";

export default function PaymentPaypal() {

    let [option, setOption] = useState({
        "client-id": "AVwqViD23n28KsJVlN-FhVqXSbrRbnd7SGbpZhqGn6WsVzigDYy6uG65l5N4iZEq1OW7s6cgPTk0BlXU",
        "currency": "USD",
        "intent": "capture",
    })

    let [price, setPrice] = useState("0")

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let state = location.state as any;
        if (!state) navigate("/payment")
        setPrice(state.price.toString())

    })

    const onBack = () => {
        navigate("/payment")
    }

    return (
        <div className="container mt-5 " style={{ textAlign: "center" }}>
            <PayPalScriptProvider key={Ultils.staticgenerateUUID()} options={option}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: price,
                                        currency_code: "USD",
                                        breakdown: {
                                            item_total: {
                                                currency_code: "USD",
                                                value: price
                                            }

                                        }
                                    },

                                },
                            ],

                        });
                    }}
                    onApprove={(data, actions: any) => {
                        return actions.order.capture().then((details: any) => {
                            let result = {
                                price,
                                status: "success"
                            }
                            navigate("/payment/paypal/return", { state: result })
                        });
                    }}
                    onCancel={(data: Record<string, unknown>,
                        actions: any) => {
                        let result = {
                            price,
                            status: "fail"
                        }
                        navigate("/payment/paypal/return", { state: result })
                    }}
                />
            </PayPalScriptProvider>
            <div className='text-center mb-2'>
                <button className='btn btn-primary' onClick={onBack}>Quay lại</button>
            </div>
        </div>
    );
} 