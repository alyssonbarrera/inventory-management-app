import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class FindProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsRepository,
  ) {}

  async execute(id: string) {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new AppError('Product not found', 404)
    }

    return product
  }
}

export { FindProductUseCase }
