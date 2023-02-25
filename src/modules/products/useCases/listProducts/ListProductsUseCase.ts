import { inject, injectable } from 'tsyringe'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository'

@injectable()
class ListProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute() {
    return await this.productsRepository.list()
  }
}

export { ListProductsUseCase }
