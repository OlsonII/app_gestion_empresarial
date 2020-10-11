import {Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn} from "typeorm";

@Entity('PROVIDER')
export class ProviderOrm{

    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
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