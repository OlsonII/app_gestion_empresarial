import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { GenericRepository } from '../base/generic.repository';
import { SaleOrm } from '../database/entity/sale.orm';

@Injectable()
@EntityRepository(SaleOrm)
export class SaleRepository extends GenericRepository<SaleOrm>{}