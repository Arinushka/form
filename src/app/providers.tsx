import type { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FormDataProvider } from '../state/formDataContext'

/**
 * Libraries used (and why):
 * - @tanstack/react-query: battle-tested caching for API calls; perfect fit for "fetch once, reuse categories" requirement.
 * - react-hook-form + zod: concise, scalable form state + schema validation with great TS inference (best practice for real projects).
 * - react-imask: reliable input masking for the required phone format.
 * - bootstrap + react-bootstrap: fast, accessible UI primitives (Modal, form controls) without hand-rolling a11y.
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
})

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <FormDataProvider>{children}</FormDataProvider>
    </QueryClientProvider>
  )
}


