import axios, { AxiosResponse } from "axios";
import { DefaultConst } from "../shared/DefaultConst";
import { DataResponseServiceType } from "../type/CommonType";
export default class LocationService {
   
    public async GetAllProvinces(query?: any) {
        const url = DefaultConst.Shipping.Provider.GiaoHangNhanh.Api.getProvince;

        let response = await  axios.get(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Token': DefaultConst.Shipping.Provider.GiaoHangNhanh.TokenApi
            }
        });

        let data = await response.data?.data;

        const result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data
        }
        return result;
    }

    public async GetDistrictByProviceId(proviceId: any) {
        const url= `${DefaultConst.Shipping.Provider.GiaoHangNhanh.Api.getDistrict}?province_id=${proviceId}`
        let response = await  axios.get(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Token': DefaultConst.Shipping.Provider.GiaoHangNhanh.TokenApi
            }
        });

        let data = await response.data?.data;

        const result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data
        }
        return result;
    }
    public async GetWardByDistrictId(district_id: any) {
        const url = `${DefaultConst.Shipping.Provider.GiaoHangNhanh.Api.getWard}?district_id=${district_id}`
        let response = await  axios.get(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Token': DefaultConst.Shipping.Provider.GiaoHangNhanh.TokenApi
            }
        });

        let data = await response.data?.data;

        const result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data
        }
        return result;
    }


}