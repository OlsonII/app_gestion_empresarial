import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity('ADMIN')
export class UserOrm{

    @ObjectIdColumn()
    public _id: ObjectID;
    @Column()
    public email: string;
    @Column()
    public identification: string;
    @Column()
    public name: string;
    @Column()
    public street: string;
    @Column()
    public telephone: string;
    @Column()
    public password: string;
    @Column()
    public rol: string;
    @Column()
    public session: boolean;
}