import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { IRegistersRepository } from '@modules/registers/repositories/IRegistersRepository'

@injectable()
class DeleteRegisterUseCase {
  constructor(
    @inject('RegistersRepository')
    private registersRepository: IRegistersRepository,
  ) {}

  async execute(id: string) {
    const register = await this.registersRepository.findById(id)

    if (!register) {
      throw new AppError('Register not found', 404)
    }

    await this.registersRepository.delete(id)
  }
}

export { DeleteRegisterUseCase }
