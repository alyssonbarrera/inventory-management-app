import { inject, injectable } from 'tsyringe'
import { IProductsRepository } from '../../repositories/IProductsRepository'

interface IRequest {
  title: string
  description: string
  price: number
  amount: number
}

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(data: IRequest) {
    return await this.productsRepository.create(data)
  }
}

export { CreateProductUseCase }
