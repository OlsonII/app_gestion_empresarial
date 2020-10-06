import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({
    name: 'CATEGORY'
})
export class CategoryOrm{
    @PrimaryColumn()
    reference: string;
    @Column()
    name: string;
}