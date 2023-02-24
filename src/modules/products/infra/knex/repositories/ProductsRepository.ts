import { randomUUID } from 'crypto'
import { knex } from '@shared/infra/knex/database'
import { ICreateProductDTO } from '../../../dtos/ICreateProductDTO'
import { IProductResponse } from '../../../dtos/IProductResponse'
import { IProductsRepository } from '../../../repositories/IProductsRepository'

class ProductsRepository implements IProductsRepository {
  async create(data: ICreateProductDTO): Promise<void> {
    const { title, description, amount, price } = data

    const id = randomUUID()

    return await knex('products').insert({
      id,
      title,
      description,
      price,
      amount,
    })
  }

  async list(): Promise<IProductResponse[]> {
    return await knex('products').select('*')
  }

  async findById(id: string): Promise<IProductResponse> {
    return await knex('products').where('id', id).first()
  }

  async update(data: ICreateProductDTO): Promise<void> {
    return await knex('products').where('id', data.id).update(data)
  }

  async delete(id: string): Promise<void> {
    return await knex('products').where('id', id).delete()
  }
}

export { ProductsRepository }
