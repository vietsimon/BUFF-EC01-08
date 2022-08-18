import { DefaultConst } from "../ultils/DefaultConst";

export default class BlogService {
    public static async GetBlogPagingAsync(parameter: any) {
        if (!parameter.pageSize) parameter.pageSize = 10;
        let params = new URLSearchParams(parameter);
        const url = `${DefaultConst.Api}/v1/web/blog`;
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
    public static async GetBlogDetailAsync(id: any) {

        const url = `${DefaultConst.Api}/v1/web/blog/${id}`;
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
        const url = `${DefaultConst.Api}/v1/web/blog/lastest`;
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