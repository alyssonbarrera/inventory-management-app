import { ICreateRegisterDTO } from '../dtos/ICreateRegisterDTO'
import { IRegistersResponseDTO } from '../dtos/IRegistersResponseDTO'
import { IUpdateRegisterDTO } from '../dtos/IUpdateRegisterDTO'

interface IRegistersRepository {
  create(data: ICreateRegisterDTO): Promise<void>
  list(): Promise<IRegistersResponseDTO[]>
  findById(id: string): Promise<IRegistersResponseDTO>
  update(data: IUpdateRegisterDTO): Promise<void>
  delete(id: string): Promise<void>
}

export { IRegistersRepository }
