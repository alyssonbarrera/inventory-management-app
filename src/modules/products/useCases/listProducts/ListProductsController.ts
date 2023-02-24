import { container } from 'tsyringe'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ListProductsUseCase } from './ListProductsUseCase'

class ListProductsController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const listProductsUseCase = container.resolve(ListProductsUseCase)

    const products = await listProductsUseCase.execute()

    return reply.status(200).send({ products })
  }
}

export { ListProductsController }
