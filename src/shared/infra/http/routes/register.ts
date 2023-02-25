import { FastifyInstance } from 'fastify'
import { CreateRegisterController } from '@modules/register/useCases/createRegister/CreateRegisterController'
import { ListRegistersController } from '@modules/register/useCases/listRegisters/ListRegistersController'
import { FindRegisterController } from '@modules/register/useCases/findRegister/FindRegisterController'
import { UpdateRegisterController } from '@modules/register/useCases/updateRegister/UpdateRegisterController'
import { DeleteRegisterController } from '@modules/register/useCases/deleteRegister/DeleteRegisterController'

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
