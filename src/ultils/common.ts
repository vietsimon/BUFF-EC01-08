import * as crypto from "crypto";
export default class Common {
    private static SecretKey = {
        manager: "Jc5hdQ5rBa~j1A=ak/d1J5NVwN;y0iDT",
        customer: "^%7T&8eBISY&JFw5#97VAj2*mEX7c&"
    };
    public static SortObject(obj: any) {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }

    public static GeneratePassword(username: string, password: string, type: "manager" | "customer") {
        const hash = crypto.createHmac('sha256', this.SecretKey[type])
            .update(username + password)
            .digest('hex');
        return hash;
    }
}