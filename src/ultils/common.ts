import * as crypto from "crypto";
export default class Common {
    private static SecretKey = "Jc5hdQ5rBa~j1A=ak/d1J5NVwN;y0iDT";
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

    public static GeneratePassword(username: string, password: string) {
        const hash = crypto.createHmac('sha256', Common.SecretKey)
            .update(username + password)
            .digest('hex');
        return hash;
    }
}