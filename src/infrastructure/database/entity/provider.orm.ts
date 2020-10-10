import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('PROVIDER')
export class ProviderOrm{

    @PrimaryColumn()
    identification: string;
    @Column()
    company: string;
    @Column()
    email: string;
    @Column()
    name: string;
    @Column()
    street: string;
    @Column()
    telephone: string;

}