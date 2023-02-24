import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { IProductsRepository } from '../../repositories/IProductsRepository'

interface IRequest {
  id: string
  title?: string
  description?: string
  price?: number
  amount?: number
}

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(data: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(data.id)

    if (!product) {
      throw new AppError('Product not found', 404)
    }

    data = {
      ...data,
      updated_at: new Date().toISOString(),
    } as IRequest

    return await this.productsRepository.update(data)
  }
}

export { UpdateProductUseCase }
