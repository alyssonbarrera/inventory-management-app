import { FastifyInstance } from 'fastify'
import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController'
import { DeleteProductController } from '@modules/products/useCases/deleteProduct/DeleteProductController'
import { ListProductsController } from '@modules/products/useCases/listProducts/ListProductsController'
import { UpdateProductController } from '@modules/products/useCases/updateProduct/UpdateProductController'

const listProductsController = new ListProductsController()
const createProductController = new CreateProductController()
const updateProductController = new UpdateProductController()
const deleteProductController = new DeleteProductController()

export async function productsRoutes(app: FastifyInstance) {
  app.get('/', listProductsController.handle)
  app.post('/', createProductController.handle)
  app.put('/:id', updateProductController.handle)
  app.delete('/:id', deleteProductController.handle)
}
