import { BuffVnDataSource } from "../dataSource";
import ManagerEntity from "../entity/ManagerEntity";
import { BaseResponseServiceType } from "../type/CommonType";
import { RegisterManagerType } from "../type/ManagerType";
import Common from "../ultils/common";

export default class ManagerService {

    public async RegisterManager(requestBody: RegisterManagerType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }

        if (!requestBody?.username) {
            result.status = false
            result.errors.push("Thiếu tên đăng nhập");
        }

        if (!requestBody?.fullName) {
            result.status = false
            result.errors.push("Thiếu họ và tên");
        }
        if (!requestBody?.password) {
            result.status = false
            result.errors.push("Thiếu mật khẩu");
        }


        if (!result.status) return result;
        let customerExist = await BuffVnDataSource.getRepository(ManagerEntity).findOne({
            where: {
                username: requestBody.username,
                status: "active"
            }
        });
        if (customerExist) {
            result.status = false
            result.errors.push("Người dùng đã tồn tại");
            return result;
        }
        let password = Common.GeneratePassword(requestBody.username, requestBody.password, "manager");
        let customter = new ManagerEntity({
            username: requestBody.username,
            password,
            fullName: requestBody.fullName,
            status: "active"
        });

        await BuffVnDataSource.getRepository(ManagerEntity).save(customter);
        return result;
    }

    public async LoginManager(username: string, password: string): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!username) {
            result.status = false;
            result.errors.push("Tên đăng nhập không phù hợp");
        }
        if (!password) {
            result.status = false;
            result.errors.push("Mật khẩu không phù hợp");
        }
        if (!result.status) return result;

        password = Common.GeneratePassword(username, password, "manager");
        let customer = await BuffVnDataSource.getRepository(ManagerEntity).findOne({
            where: {
                username: username,
                password: password,
                status: "active"
            }
        });

        if (!customer) {
            result.status = false;
            result.errors.push("Tên đăng nhập hoặc mật khẩu không đúng");
        }
        return result
    }

}