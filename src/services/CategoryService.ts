import { BuffVnDataSource } from "../dataSource";
import CategoryEntity from "../entity/CategoryEntity";
import { CreateCategoryType } from "../type/CategoryType";
import { BaseResponseServiceType } from "../type/CommonType";

export default class CategoryService {
    public async GetCategoryById(id: number) {
        let result = await BuffVnDataSource.getRepository(CategoryEntity).findOneBy({
            id
        });
        return result;
    }

    public async GetCategoryByKey(key: string) {
        let result = await BuffVnDataSource.getRepository(CategoryEntity).findOneBy({
            key
        });
        return result;
    }

    public GetAllCategory() {
        let result = BuffVnDataSource.createQueryBuilder(CategoryEntity, "lv1")
            .leftJoin(CategoryEntity, 'lv2', `lv2."parentId" = lv1.id`)
            .leftJoin(CategoryEntity, 'lv3', `lv3."parentId" = lv2.id`)
            .leftJoin(CategoryEntity, 'lv4', `lv4."parentId" = lv3.id`)
            .select(`lv1.id`)
            .addSelect(`lv1.key`)
            .addSelect(`lv1.name`)
            .addSelect(`lv2.id`)
            .addSelect(`lv2.key`)
            .addSelect(`lv2.name`)
            .addSelect(`lv3.id`)
            .addSelect(`lv3.key`)
            .addSelect(`lv3.name`)
            .addSelect(`lv4.id`)
            .addSelect(`lv4.key`)
            .addSelect(`lv4.name`)
            .execute();
        return result;
    }

    public CreateCategiry(data : CreateCategoryType){
        const result: BaseResponseServiceType = {
            status: true,
            errors: []
        }


    }


}