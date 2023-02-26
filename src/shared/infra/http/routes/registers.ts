import { FastifyInstance } from 'fastify'
import { CreateRegisterController } from '@modules/registers/useCases/createRegister/CreateRegisterController'
import { ListRegistersController } from '@modules/registers/useCases/listRegisters/ListRegistersController'
import { FindRegisterController } from '@modules/registers/useCases/findRegister/FindRegisterController'
import { UpdateRegisterController } from '@modules/registers/useCases/updateRegister/UpdateRegisterController'
import { DeleteRegisterController } from '@modules/registers/useCases/deleteRegister/DeleteRegisterController'

const listRegisterController = new ListRegistersController()
const createRegisterController = new CreateRegisterController()
const findRegisterController = new FindRegisterController()
const updateRegisterController = new UpdateRegisterController()
const deleteRegisterController = new DeleteRegisterController()

export async function registerRoutes(app: FastifyInstance) {
  app.get('/', listRegisterController.handle)
  app.get('/:id', findRegisterController.handle)
  app.post('/', createRegisterController.handle)
  app.put('/:id', updateRegisterController.handle)
  app.delete('/:id', deleteRegisterController.handle)
}
