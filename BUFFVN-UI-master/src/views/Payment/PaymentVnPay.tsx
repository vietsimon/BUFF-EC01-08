import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DefaultConst } from "../../ultils/DefaultConst";

export default function PaymentVnPay() {

    const location = useLocation();
    const navigate = useNavigate();

    const getRedirectUrl = async (body: any) => {
        if (!body?.currencyCode) body.currencyCode = "VND";
        if (!body?.returnUrl) body.returnUrl = `${DefaultConst.Domain}/payment/vnpay/return`;
        try {
            const url = `${DefaultConst.Api}/payment/vn-pay/create-payment`;
            let response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            console.log("response payment", response);

            if (response.ok) {
                let dataResponse = await response.json();
                let redirectUrl = dataResponse.redirectUrl;
                window.location.href = redirectUrl;
                return;
            }
            else {
                alert("payment fail");
                navigate("/payment");
                return;
            }
        } catch (error) {
            console.error(error);
            alert("payment fail.");
            navigate("/payment");
            return;
        }
    }

    useEffect(() => {
        let state = location.state;
        if (!state) navigate("/payment")
        getRedirectUrl(state)

    })

    return (
        <>Please wating for a minute</>
    )
}