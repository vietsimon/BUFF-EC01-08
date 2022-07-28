import express = require("express");
import * as jwt from "jsonwebtoken";
import CustomerService from "../../services/CustomerService";
import ManagerService from "../../services/ManagerService";
import SecretConfig from "../../shared/SecretConfig";
import BaseController from "../BaseController";

export default class AuthorizeAdminController extends BaseController {
    constructor() {
        super();
        this.initializeRouter();
    }

    protected initializeRouter(): void {
        this._router.post("/v1/manager/login", this.loginManager)
    }

    private loginManager = async (request: express.Request, response: express.Response) => {
        try {
            let { username, password } = request.body as any
            let service = new ManagerService();
            let dataService = await service.LoginManager(username, password);
            if (dataService.status) {
                let token = jwt.sign({
                    username
                }, SecretConfig.JwtManager, { expiresIn: "2h" })
                return response.status(200).json({
                    token: token
                });
            }
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }
}