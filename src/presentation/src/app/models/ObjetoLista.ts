import { Provider } from './provider.model';
import { Brand } from './brand.model';
import { Category } from './category.model';
import { Product } from './product.model';
import {User} from './user.model';
import {Client} from './client.model';
import {Movement} from './movemet.model';

export class ClientList{
  clients:Client[];
}

export class BrandList{
  brands:Brand[];
}
export class CategoryList{
  categories:Category[];
}
export class ProductList{
  products:Product[];
}
export class ProviderList{
  providers:Provider[];
}

export class UserList{
  users:User[];
}

export class MovementList{
  movements:Movement[];
}

