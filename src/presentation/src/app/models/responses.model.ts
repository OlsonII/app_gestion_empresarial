import { Brand } from './brand.model';
import { Category } from './category.model';
import { Client } from './client.model';
import { Movement } from './movemet.model';
import { Product } from './product.model';
import { Provider } from './provider.model';
import { User } from './user.model';

// POST y PUT responses
export class DefaultResponse{
  constructor(public readonly message: string) {}
}
export class RegisterInputOutputResponse{
  constructor(public readonly message: string, public readonly newQuantity?: number) {}
}

//GET responses
export class SearchClientResponse{
  constructor(public readonly clients?: Client[], public readonly client?: Client, public readonly message?: string) {}
}

export class SearchUserResponse{
  constructor(public readonly users?: User[], public readonly user?: User, public readonly message?: string) {}
}

export class SearchBrandResponse{
  constructor(public readonly brands?: Brand[], public readonly brand?: Brand, public readonly message?: string) {}
}

export class SearchCategoryResponse{
  constructor(public readonly categories?: Category[], public readonly category?: Category, public readonly message?: string) {}
}

export class SearchProductResponse{
  constructor(public readonly products?: Product[], public readonly product?: Product, public readonly message?: string) {}
}

export class SearchProviderResponse{
  constructor(public readonly providers?: Provider[], public readonly provider?: Provider, public readonly message?: string) {}
}

export class SearchMovementsResponse{
  constructor(public readonly movements?: Movement[], public readonly movement?: Movement, public readonly message?: string) {}
}


