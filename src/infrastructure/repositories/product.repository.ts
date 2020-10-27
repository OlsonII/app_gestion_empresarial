import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {GenericRepository} from "../base/generic.repository";
import {ProductOrm} from "../database/entity/product.orm";
import {Product} from "../../domain/entity/product.entity";
import {Brand} from "../../domain/entity/brand.entity";
import {Category} from "../../domain/entity/category.entity";

@Injectable()
@EntityRepository(ProductOrm)
export class ProductRepository extends GenericRepository<ProductOrm>{

    mappedOrmToProduct(orm: ProductOrm): Product{
        const product = new Product();
        product._id = orm._id;
        product.reference = orm.reference;
        product.name = orm.name;
        product.description = orm.description;
        product.brand = new Brand();
        product.brand._id = orm.brand._id;
        product.brand.reference = orm.brand.reference;
        product.brand.name = orm.brand.name;
        product.category = new Category();
        product.category._id = orm.category._id;
        product.category.reference = orm.category.reference;
        product.category.name = orm.category.name;
        product.cost = orm.cost;
        product.price = orm.price;
        product.quantity = orm.quantity;
        return product;
    }

    async findProduct(reference: string): Promise<Product>{
        const orm = await this.findOne({where: {reference: reference}});
        return orm == undefined ? undefined : this.mappedOrmToProduct(orm);
    }

    async findAllProducts(): Promise<Product[]> {
        const products: Product[] = []
        const searchedProducts = await this.find();
        searchedProducts.forEach(orm => products.push(this.mappedOrmToProduct(orm)));
        return products;
    }





}