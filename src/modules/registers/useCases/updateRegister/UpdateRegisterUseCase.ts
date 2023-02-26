import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { IRegistersRepository } from '@modules/registers/repositories/IRegistersRepository'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'

interface IRequest {
  id: string
  product_id?: string
  amount?: number
  type?: 'input' | 'output'
}

interface IProductUpdate {
  id: string
  amount: number
  updated_at: string
}

@injectable()
class UpdateRegisterUseCase {
  constructor(
    @inject('RegistersRepository')
    private registersRepository: IRegistersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(data: IRequest) {
    const register = await this.registersRepository.findById(data.id)
    const product = data.product_id
      ? await this.productsRepository.findById(data.product_id)
      : null
    const registerProduct = await this.productsRepository.findById(
      register.product_id,
    )

    if (!register) {
      throw new AppError('Register not found', 404)
    } else if (data.product_id && !product) {
      throw new AppError('Product not found', 404)
    } else if (register.updated_at !== null) {
      throw new AppError(
        'This register has already been edited and cannot be edited again',
        400,
      )
    } else if (data.product_id && data.product_id !== register.product_id) {
      await this.productsRepository.update({
        id: registerProduct.id,
        amount: registerProduct.amount - register.amount,
        updated_at: new Date().toISOString(),
      } as IProductUpdate)

      await this.registersRepository.update({
        ...data,
        updated_at: new Date().toISOString(),
      })

      return await this.productsRepository.update({
        id: product.id,
        amount: product.amount + register.amount,
        updated_at: new Date().toISOString(),
      } as IProductUpdate)
    }

    await this.registersRepository.update({
      ...data,
      updated_at: new Date().toISOString(),
    })

    return await this.productsRepository.update({
      id: registerProduct.id,
      amount:
        registerProduct.amount +
        (data.type === 'input' ? data.amount : data.amount * -1),
      updated_at: new Date().toISOString(),
    } as IProductUpdate)
  }
}

export { UpdateRegisterUseCase }
