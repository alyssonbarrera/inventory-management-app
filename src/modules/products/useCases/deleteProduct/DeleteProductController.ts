import { container } from 'tsyringe'
import { FastifyRequest, FastifyReply } from 'fastify'
import { DeleteProductUseCase } from './DeleteProductUseCase'

class DeleteProductController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    if (!id) {
      return reply.status(400).send({ error: 'Missing id' })
    }

    const deleteProductUseCase = container.resolve(DeleteProductUseCase)

    await deleteProductUseCase.execute(id)

    return reply.status(200).send({ message: 'Product deleted' })
  }
}

export { DeleteProductController }
