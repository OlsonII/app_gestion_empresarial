import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({
    name: 'BRAND'
})
export class BrandOrm{
    @PrimaryColumn()
    reference: string;
    @Column()
    name: string;
}