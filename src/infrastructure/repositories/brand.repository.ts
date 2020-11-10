import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {CategoryOrm} from "../database/entity/category.orm";
import {GenericRepository} from "../base/generic.repository";
import {Brand} from "../../domain/entity/brand.entity";
import { ProductRepository } from './product.repository';


@Injectable()
@EntityRepository(CategoryOrm)
export class BrandRepository extends GenericRepository<CategoryOrm>{

    mappedOrmToBrand(orm: CategoryOrm): Brand {
        const brand = new Brand();
        brand._id = orm._id;
        brand.reference = orm.reference;
        brand.name = orm.name;
        return brand;
    }

    async findBrand(reference: string): Promise<Brand> {
        const orm = await this.findOne({where: {reference: reference}});
        return orm == undefined ? undefined : this.mappedOrmToBrand(orm);
    }

    async findAllBrands(): Promise<Brand[]>{
        const brands: Brand[] = [];
        const searchedBrands = await this.find();
        searchedBrands.forEach(orm => brands.push(this.mappedOrmToBrand(orm)));
        return brands;
    }

    async updateBrand(orm: CategoryOrm){
        await this.save(orm);
        const productRepository = new ProductRepository();
        const products = await productRepository.findAllProducts();
        for (const p of products) {
           if(p.brand._id == orm._id){
               p.brand = orm;
               await productRepository.save(p);
           }
        }
    }

}