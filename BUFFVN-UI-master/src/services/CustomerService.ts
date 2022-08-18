import Ultils from "../ultils/common";
import { DefaultConst } from "../ultils/DefaultConst";
export default class CustomerService {
    public static async LoginAsync(username: string, password: string) {
        const url = `${DefaultConst.Api}/v1/customer/login`;
        let token = Ultils.getToken();
        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    ...token
                },
                body: JSON.stringify({ username, password })
            });
            let data = await response.json();
            return data;
        } catch (error) {
            return false
        }
    }
}