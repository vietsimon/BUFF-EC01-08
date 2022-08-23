import express = require("express");
import LocationService from "../../services/LocationService";
import BaseController from "../BaseController"

export default class LocationAdminController extends BaseController {

    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
    }

    private initGetRouter() {
        this._router.get("/v1/admin/location/province/all", this.getProvinceAll);
        this._router.get("/v1/admin/location/district/all", this.getDistrictByprovinceId);
        this._router.get("/v1/admin/location/ward/all", this.getWardByDistrictId);
    }

    private getProvinceAll = async (request: express.Request, response: express.Response) => {
        try {
            let service = new LocationService();
            let dataService = await service.GetAllProvinces(request.query);
            if (dataService.status)
                return response.status(200).json(dataService);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private getDistrictByprovinceId = async (request: express.Request, response: express.Response) => {
        try {
            let service = new LocationService();
           let province_id=  request.query?.province_id;
            let dataService = await service.GetDistrictByProviceId(province_id);
            if (dataService.status)
                return response.status(200).json(dataService);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    } 
    private getWardByDistrictId = async (request: express.Request, response: express.Response) => {
        try {
            let service = new LocationService();
           let district_id=  request.query?.district_id;
            let dataService = await service.GetWardByDistrictId(district_id);
            if (dataService.status)
                return response.status(200).json(dataService);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }
}