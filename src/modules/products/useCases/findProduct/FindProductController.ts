import { container } from 'tsyringe'
import { FastifyReply, FastifyRequest } from 'fastify'
import { FindProductUseCase } from './FindProductUseCase'

class FindProductController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { id } = request.params as { id: string }

    if (!id) {
      return reply.status(400).send({ error: 'Missing id' })
    }

    const findProductUseCase = container.resolve(FindProductUseCase)

    const product = await findProductUseCase.execute(id)

    return reply.status(200).send(product)
  }
}

export { FindProductController }
