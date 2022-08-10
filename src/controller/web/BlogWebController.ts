import express = require("express");
import BlogService from "../../services/BlogService";
import BaseController from "../BaseController"

export default class BlogWebController extends BaseController {
    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
    }
    private initGetRouter() {
        this._router.get("/v1/web/blog", this.getBlogPaging);
        this._router.get("/v1/web/blog/:id", this.getBlogDetail);
    }

    private getBlogPaging = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BlogService();
            let dataService = await service.GetPaging(request.query);
            if (dataService.status)
                return response.status(200).json(dataService.data);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private getBlogDetail = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new BlogService();
            let dataService = await service.GetDetail(id);
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