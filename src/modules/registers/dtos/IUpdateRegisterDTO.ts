interface IUpdateRegisterDTO {
  id?: string
  product_id?: string
  amount?: number
  type?: 'input' | 'output'
  updated_at: string
}

export { IUpdateRegisterDTO }
