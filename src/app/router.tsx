import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { Step1Personal } from '../routes/Step1Personal'
import { Step2AddressWork } from '../routes/Step2AddressWork'
import { Step3Loan } from '../routes/Step3Loan'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <Navigate to="/step-1" replace /> },
      { path: '/step-1', element: <Step1Personal /> },
      { path: '/step-2', element: <Step2AddressWork /> },
      { path: '/step-3', element: <Step3Loan /> },
      { path: '*', element: <Navigate to="/step-1" replace /> },
    ],
  },
])


