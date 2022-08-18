import { DefaultConst } from "../ultils/DefaultConst";
export default class ShippingService {

    public static async GetProvinceAsync(parameter: any) {
        const url = DefaultConst.Shipping.Provider.GiaoHangNhanh.Api.getProvince;
        try {
            let response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Token': DefaultConst.Shipping.Provider.GiaoHangNhanh.TokenApi
                },
            });
            let data = await response.json();
            return data?.data;
        } catch (error) {
            return false
        }
    }

    public static async GetDistrictAsync(parameter: any) {
        //province_id
        let params = new URLSearchParams(parameter);
        const url = DefaultConst.Shipping.Provider.GiaoHangNhanh.Api.getDistrict;
        try {
            let response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Token': DefaultConst.Shipping.Provider.GiaoHangNhanh.TokenApi
                },
            });
            let data = await response.json();

            return data?.data;
        } catch (error) {
            console.log(error);
            return false
        }
    }
    
    public static async GetWardAsync(parameter: any) {
        //district_id
        let params = new URLSearchParams(parameter);
        const url = DefaultConst.Shipping.Provider.GiaoHangNhanh.Api.getWard;
        try {
            let response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Token': DefaultConst.Shipping.Provider.GiaoHangNhanh.TokenApi
                },
            });
            let data = await response.json();

            return data?.data;
        } catch (error) {
            console.log(error);

            return false
        }
    }

    public static async GetShippingFeeAsync(parameter: any) {
        
        // {
        //     "from_district_id":1454,
        //     "service_type_id":2,//di bo 1// may bay
        //     "to_district_id":1452,
        //     "to_ward_code":"21012",
        //     "height":50,
        //     "length":2a0,
        //     "weight":200,
        //     "width":20
        //     }
        let params = new URLSearchParams(parameter);
        const url = DefaultConst.Shipping.Provider.GiaoHangNhanh.Api.getShippingFee;
        try {
            let response = await fetch(`${url}?${params.toString()}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Token': DefaultConst.Shipping.Provider.GiaoHangNhanh.TokenApi
                },
            });
            let data = await response.json();

            return data?.data;
        } catch (error) {
            console.log(error);

            return false
        }
    }


    // public static async GetProvinceAsync(parameter: any) {
    //     if (!parameter.pageSize) parameter.pageSize = 10;
    //     let params = new URLSearchParams(parameter);
    //     const url = DefaultConst.Shipping.Provider.GiaoHangNhanh.Api.getProvince;
    //     try {
    //         let response = await fetch(`${url}?${params.toString()}`, {
    //             method: "GET",
    //         });
    //         let data = await response.json();
    //         return data?.data;
    //     } catch (error) {
    //         return false
    //     }
    // }

}