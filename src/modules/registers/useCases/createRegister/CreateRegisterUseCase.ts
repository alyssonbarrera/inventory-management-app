import { inject, injectable } from 'tsyringe'
import { IRegistersRepository } from '@modules/registers/repositories/IRegistersRepository'
import { ICreateRegisterDTO } from '@modules/registers/dtos/ICreateRegisterDTO'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateRegisterUseCase {
  constructor(
    @inject('RegistersRepository')
    private registersRepository: IRegistersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(data: ICreateRegisterDTO) {
    const product = await this.productsRepository.findById(data.product_id)

    if (!product) {
      throw new AppError('Product not found', 404)
    } else if (data.type === 'output' && product.amount < data.amount) {
      throw new AppError('Insufficient product amount', 400)
    }

    return await this.registersRepository.create(data)
  }
}

export { CreateRegisterUseCase }
