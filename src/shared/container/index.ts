import { container } from 'tsyringe'
import { ProductsRepository } from '@modules/products/infra/knex/repositories/ProductsRepository'

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { IRegistersRepository } from '@modules/register/repositories/IRegistersRepository'
import { RegistersRepository } from '@modules/register/infra/knex/repositories/RegistersRepository'

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
)

container.registerSingleton<IRegistersRepository>(
  'RegistersRepository',
  RegistersRepository,
)
