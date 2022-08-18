import { DefaultConst } from "../ultils/DefaultConst";

export default class ProductCategoryService {
    public static async GetAllAsync(parameter: any) {
        if (!parameter.status) parameter.status = 'active';
        let params = new URLSearchParams(parameter);
        const url =`${DefaultConst.Api}/v1/web/categories/all`;
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
}