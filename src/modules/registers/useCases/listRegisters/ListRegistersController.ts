import { container } from 'tsyringe'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ListRegistersUseCase } from './ListRegistersUseCase'

class ListRegistersController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const listRegistersUseCase = container.resolve(ListRegistersUseCase)

    const registers = await listRegistersUseCase.execute()

    return reply.status(200).send({ registers })
  }
}

export { ListRegistersController }
