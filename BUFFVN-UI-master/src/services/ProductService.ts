import { DefaultConst } from "../ultils/DefaultConst";

export default class ProductService {
    public static async GetProductPagingAsync(parameter: any) {
        if (!parameter.pageSize) parameter.pageSize = 10;
        let params = new URLSearchParams(parameter);
        const url = `${DefaultConst.Api}/v1/web/product`;
        try {
            let response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
            });
            let data = await response.json();
            return data;
        } catch (error) {
            return false
        }
    }
    public static async GetProductDetailAsync(id: any) {

        const url = `${DefaultConst.Api}/v1/web/product/${id}`;
        try {
            let response = await fetch(`${url}`, {
                method: "GET",
            });
            let data = await response.json();
            return data?.data;
        } catch (error) {
            return false
        }
    }
    public static async GetLastestAsync(parameter: any) {
        let params = new URLSearchParams(parameter);
        const url = `${DefaultConst.Api}/v1/web/product/lastest`;
        try {
            let response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
            });
            let data = await response.json();
            return data?.data;
        } catch (error) {
            return false
        }
    }

    public static async PostProductPagingAsync(parameter: any, body: any) {
        if (!parameter.pageSize) parameter.pageSize = 10;
        let params = new URLSearchParams(parameter);
        const url = `${DefaultConst.Api}/v1/web/product`;
        try {
            let response = await fetch(`${url}?${params.toString()}`, {
                method: "POST",
                body: JSON.stringify(body)
            });
            let data = await response.json();
            return data;
        } catch (error) {
            return false
        }
    }
}