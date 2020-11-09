import {Injectable} from "@nestjs/common";
import {EntityRepository} from "typeorm";
import {GenericRepository} from "../base/generic.repository";
import {ProductTransactionOrm} from "../database/entity/product.transaction.orm";
import {ProductTransaction} from "../../domain/entity/product.transaction.entity";
import {Product} from "../../domain/entity/product.entity";

@Injectable()
@EntityRepository(ProductTransactionOrm)
export class ProductTransactionRepository extends GenericRepository<ProductTransactionOrm>{

    mappedOrmToProductTransaction(orm: ProductTransactionOrm): ProductTransaction{
        const transaction = new ProductTransaction();
        transaction._id = orm._id;
        transaction.date = orm.date;
        transaction.description = orm.description;
        transaction.inputQuantity = orm.inputQuantity;
        transaction.outputQuantity = orm.outputQuantity;
        transaction.product = new Product();
        transaction.product._id = orm.product._id;
        transaction.product.reference = orm.product.reference;
        transaction.product.name = orm.product.name;
        transaction.product.description = orm.product.description;
        transaction.product.brand = orm.product.brand;
        transaction.product.category = orm.product.category;
        transaction.product.cost = orm.product.cost;
        transaction.product.price = orm.product.price;
        transaction.product.quantity = orm.product.quantity;
        transaction.user = orm.user;
        return transaction;
    }

    async findAllProductTransactions(): Promise<ProductTransaction[]> {
        const transactions: ProductTransaction[] = []
        const searchedTransactions = await this.find();
        searchedTransactions.forEach(orm => transactions.push(this.mappedOrmToProductTransaction(orm)));
        return transactions;
    }

}