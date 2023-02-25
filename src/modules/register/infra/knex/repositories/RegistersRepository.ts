/* eslint-disable camelcase */
import { randomUUID } from 'crypto'
import { knex } from '@shared/infra/knex/database'
import { ICreateRegisterDTO } from '@modules/register/dtos/ICreateRegisterDTO'
import { IRegistersResponseDTO } from '@modules/register/dtos/IRegistersResponseDTO'
import { IUpdateRegisterDTO } from '@modules/register/dtos/IUpdateRegisterDTO'
import { IRegistersRepository } from '@modules/register/repositories/IRegistersRepository'

class RegistersRepository implements IRegistersRepository {
  async create(data: ICreateRegisterDTO): Promise<void> {
    const { product_id, amount, type } = data

    await knex('registers').insert({
      id: randomUUID(),
      product_id,
      amount: type === 'input' ? amount : amount * -1,
    })

    await knex('products')
      .where('id', product_id)
      .increment('amount', type === 'input' ? amount : amount * -1)
  }

  async list(): Promise<IRegistersResponseDTO[]> {
    return await knex('registers')
      .join('products', 'registers.product_id', '=', 'products.id')
      .select(
        'registers.*',
        'products.title as product_title',
        'products.description as product_description',
        'products.price as product_price',
      )
  }

  async findById(id: string): Promise<IRegistersResponseDTO> {
    return await knex('registers')
      .join('products', 'registers.product_id', '=', 'products.id')
      .where('registers.id', id)
      .select(
        'registers.*',
        'products.title as product_title',
        'products.description as product_description',
        'products.price as product_price',
      )
      .first()
  }

  async update(data: IUpdateRegisterDTO): Promise<void> {
    const { id, product_id, amount, updated_at, type } = data

    return await knex('registers')
      .where('id', id)
      .update({
        product_id: product_id || undefined,
        amount: type ? (type === 'input' ? amount : amount * -1) : undefined,
        updated_at,
      })
  }

  async delete(id: string): Promise<void> {
    return await knex('registers').where('id', id).delete()
  }
}

export { RegistersRepository }
