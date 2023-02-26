import { FastifyRequest, FastifyReply } from 'fastify'
import { container } from 'tsyringe'
import { FindRegisterUseCase } from './FindRegisterUseCase'

class FindRegisterController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { id } = request.params as { id: string }

    if (!id) {
      return reply.status(400).send({ error: 'Missing id' })
    }

    const findRegisterUseCase = container.resolve(FindRegisterUseCase)

    const register = await findRegisterUseCase.execute(id)

    return reply.status(200).send({ register })
  }
}

export { FindRegisterController }
