import { ICreateProductDTO } from '../dtos/ICreateProductDTO'
import { IProductResponse } from '../dtos/IProductResponse'
import { IUpdateProductDTO } from '../dtos/IUpdateProductDTO'

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<void>
  list(): Promise<IProductResponse[]>
  findById(id: string): Promise<IProductResponse>
  update(data: IUpdateProductDTO): Promise<void>
  delete(id: string): Promise<void>
}

export { IProductsRepository }
