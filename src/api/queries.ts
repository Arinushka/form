import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from './dummyjson'

export const queryKeys = {
  categories: ['categories'] as const,
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: fetchCategories,
  })
}


