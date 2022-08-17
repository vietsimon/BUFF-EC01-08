import { BuffVnDataSource } from "../dataSource";
import CustomerEntity from "../entity/CustomerEntity";
import { BaseResponseServiceType, DataResponseServiceType } from "../type/CommonType";
import { RegisterCustomerType } from "../type/CustomerType";
import Common from "../ultils/common";

export default class CustomerService {

    public async RegisterCustomer(requestBody: RegisterCustomerType): Promise<BaseResponseServiceType> {
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }
        if (!requestBody?.phone) {
            result.status = false
            result.errors.push("Thiếu tên số điện thoại")
        }
        if (!requestBody?.address) {
            result.status = false
            result.errors.push("Thiếu địa chỉ")
        }

        if (!requestBody?.username) {
            result.status = false
            result.errors.push("Thiếu tên đăng nhập");
        }
        if (!requestBody?.dateOfBirth) {
            result.status = false
            result.errors.push("Thiếu ngày tháng năm sinh");
        }
        if (!requestBody?.email) {
            result.status = false
            result.errors.push("Thiếu email");
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
        let customerExist = await BuffVnDataSource.getRepository(CustomerEntity).findOne({
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
        let password = Common.GeneratePassword(requestBody.username, requestBody.password, "customer");
        let customter = new CustomerEntity({
            address: requestBody.address,
            createdAt: new Date(),
            dateOfBirth: new Date(requestBody.dateOfBirth),
            email: requestBody.email,
            fullName: requestBody.fullName,
            password: password,
            phone: requestBody.phone,
            status: "active",
            username: requestBody.username,
            updatedAt: new Date()
        });

        await BuffVnDataSource.getRepository(CustomerEntity).save(customter);
        return result;
    }

    public async LoginCustomer(username: string, password: string): Promise<DataResponseServiceType<any>> {
        const result: DataResponseServiceType<any> = {
            status: true,
            errors: [],
            data: undefined
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

        password = Common.GeneratePassword(username, password, "customer");
        let customer = await BuffVnDataSource.getRepository(CustomerEntity).findOne({
            where: {
                username: username,
                password: password,
                status: "active"
            }
        });

        if (!customer) {
            result.status = false;
            result.errors.push("Ten dang nhap hoac mat khau khong dung");
        }
        result.data = {
            fullname : customer.fullName
        }
        return result
    }
    public async GetCustomerInformationByUsername(username: string) {
        let customer = await BuffVnDataSource.getRepository(CustomerEntity).findOne({
            where: {
                username: username,
                status: "active"
            }
        });

        if (!customer) {
          return null;
        }
        return customer;
    }
}
