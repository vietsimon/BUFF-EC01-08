import { parseJsonText } from "typescript";

export default class Ultils {
    static staticgenerateUUID() {
        let d = new Date().getTime();
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    static randomId(length: number) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    static PriceDisplay(price: number) {
        return price + " vnd";
    }
    static GetTotalPages(totalItem: number, pageSize: number) {
        return Math.ceil(totalItem / pageSize);
    }

    static getToken() {
        let token = window.localStorage.getItem("token");
        return {
            "Authorization": token ?? ""
        }
    }
    static getLoginName() {
        let accountString = window.localStorage.getItem("account");
        let account = {} as any;
        if (accountString) account = JSON.parse(accountString?.toString() ?? "");
        return account?.fullname;
    }

    static setToken(data: any) {
        // {token: string,username:string}
        if (!data?.token)
            Ultils.clearToken();
        window.localStorage.setItem("token", data?.token);
        window.localStorage.setItem("account", JSON.stringify({ fullname: data?.fullname }));
    }

    static clearToken() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("account");
    }

    static isAuth() {
        let token = window.localStorage.getItem("token");
        if (token) return true;
        return false;
    }
    static isAuthOut() {
        Ultils.clearToken();
    }
}