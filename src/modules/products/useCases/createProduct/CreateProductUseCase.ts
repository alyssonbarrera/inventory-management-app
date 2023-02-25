import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO'
import { inject, injectable } from 'tsyringe'
import { IProductsRepository } from '../../repositories/IProductsRepository'

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(data: ICreateProductDTO) {
    return await this.productsRepository.create(data)
  }
}

export { CreateProductUseCase }
