import * as jwt from "jsonwebtoken";
import CustomerService from "../../services/CustomerService";
import SecretConfig from "../../shared/SecretConfig";
import { RegisterCustomerType } from "../../type/CustomerType";
import BaseController from "../BaseController";
import express = require("express");

export default class AuthorizeWebController extends BaseController {
    constructor() {
        super();
        this.initializeRouter();
    }

    protected initializeRouter(): void {
        this._router.post("/v1/customer", this.registerCustomer)
        this._router.post("/v1/customer/login", this.loginCustomer)
    }

    private registerCustomer = async (request: express.Request, response: express.Response) => {
        try {
            let body = request.body as RegisterCustomerType
            let service = new CustomerService();
            let dataService = await service.RegisterCustomer(body);
            if (dataService.status) return response.status(201).send();
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private loginCustomer = async (request: express.Request, response: express.Response) => {
        try {
            let { username, password } = request.body as any


            let service = new CustomerService();
            let dataService = await service.LoginCustomer(username, password);

            if (dataService.status) {
                let token = jwt.sign({
                    username
                }, SecretConfig.JwtCustomer, { expiresIn: "2h" })
                return response.status(200).json({
                    token: token
                });
            }
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(400).json({
                error: error.message
            })
        }
    }


}