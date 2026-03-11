import type { PropsWithChildren } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import type { FormData } from './formData'
import { defaultFormData } from './formData'

type FormDataContextValue = {
  data: FormData
  update: (patch: Partial<FormData>) => void
  reset: () => void
}

const FormDataContext = createContext<FormDataContextValue | null>(null)

export function FormDataProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<FormData>(defaultFormData)

  const value = useMemo<FormDataContextValue>(
    () => ({
      data,
      update: (patch) => setData((prev) => ({ ...prev, ...patch })),
      reset: () => setData(defaultFormData),
    }),
    [data],
  )

  return <FormDataContext.Provider value={value}>{children}</FormDataContext.Provider>
}

export function useFormData() {
  const ctx = useContext(FormDataContext)
  if (!ctx) throw new Error('useFormData must be used within FormDataProvider')
  return ctx
}


