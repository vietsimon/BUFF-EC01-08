import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import CustomerService from "../services/CustomerService";
import SecretConfig from "../shared/SecretConfig";

export default class AuthMiddleware {
  public static async AuthCustomerJWT(request: Request, response: Response, next: NextFunction) {
    try {
      let token = request.headers.authorization;
      let decoded = jwt.verify(token, SecretConfig.JwtCustomer);
      let customer = new CustomerService();
      let customerInformation = await customer.GetCustomerInformationByUsername(decoded["username"]);
      request["auth"] = customerInformation
      next();

    } catch (err) {
      return response.status(403).json({
        message: "Bạn không có quyền truy cập dịch vụ này !"
      });
    }

  }
}
