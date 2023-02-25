import { IRegistersRepository } from '@modules/register/repositories/IRegistersRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
class FindRegisterUseCase {
  constructor(
    @inject('RegistersRepository')
    private registersRepository: IRegistersRepository,
  ) {}

  async execute(id: string) {
    const register = await this.registersRepository.findById(id)

    if (!register) {
      throw new AppError('Register not found', 404)
    }

    return register
  }
}

export { FindRegisterUseCase }
