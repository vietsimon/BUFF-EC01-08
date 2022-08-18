import Ultils from "../ultils/common";
import { DefaultConst } from "../ultils/DefaultConst";
export default class PaymentService {
    public static async CreatePaymentAsync(body: any) {
        const url = `${DefaultConst.Api}/payment/vn-pay/create-order-payment`;
        let token = Ultils.getToken();
        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...token
                },
                body: JSON.stringify(body)
            });
            let data = await response.json();
            return data;
        } catch (error) {
            return false
        }
    }
    public static async PaymentSuccessAsync(body: any) {
        const url = `${DefaultConst.Api}/payment/payment/success`;
        let token = Ultils.getToken();
        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...token
                },
                body: JSON.stringify(body)
            });
            let data = await response.json();
            return data;
        } catch (error) {
            return false
        }
    }
    public static async PaymentCancelAsync(body: any) {
        const url = `${DefaultConst.Api}/payment/payment/cancel`;
        let token = Ultils.getToken();
        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...token
                },
                body: JSON.stringify(body)
            });
            let data = await response.json();
            return data;
        } catch (error) {
            return false
        }
    }
}