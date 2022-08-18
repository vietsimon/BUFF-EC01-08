import Ultils from "../ultils/common";
import { DefaultConst } from "../ultils/DefaultConst";
export default class OrderService {
    public static async CreateOrderAsync(body: any) {
        const url = `${DefaultConst.Api}/v1/web/order`;
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
            return data?.data;
        } catch (error) {
            return false
        }
    }
    public static async GetOrderDetailAsync(id: any) {
        let token = Ultils.getToken();
        const url = `${DefaultConst.Api}/v1/web/order/${id}`;
        try {
            let response = await fetch(`${url}`, {
                method: "GET",
                ...token
            });
            let data = await response.json();
            return data?.data;
        } catch (error) {
            return false
        }
    }
}