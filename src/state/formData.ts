export type Gender = 'male' | 'female'

export type FormData = {
  // step 1
  phone: string
  firstName: string
  lastName: string
  gender: Gender | ''
  // step 2
  workCategory: string
  address: string
  // step 3
  loanAmount: number
  loanTermDays: number
}

export const defaultFormData: FormData = {
  phone: '',
  firstName: '',
  lastName: '',
  gender: '',
  workCategory: '',
  address: '',
  loanAmount: 200,
  loanTermDays: 10,
}


