import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { DeleteRegisterUseCase } from './DeleteRegisterUseCase'

class DeleteRegisterController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { id } = request.params as { id: string }

    const deleteRegisterUseCase = container.resolve(DeleteRegisterUseCase)

    await deleteRegisterUseCase.execute(id)

    return reply.status(200).send()
  }
}

export { DeleteRegisterController }
