import { Container, Navbar, ProgressBar } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router-dom'

function stepFromPath(pathname: string) {
  if (pathname.startsWith('/step-2')) return 2
  if (pathname.startsWith('/step-3')) return 3
  return 1
}

export function AppShell() {
  const { pathname } = useLocation()
  const step = stepFromPath(pathname)
  const progress = (step / 3) * 100

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Заявка на займ</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="py-4" style={{ maxWidth: 720 }}>
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="fw-semibold">Шаг {step} из 3</div>
            <div className="text-secondary small">Заполните все обязательные поля</div>
          </div>
          <ProgressBar now={progress} />
        </div>
        <Outlet />
      </Container>
    </>
  )
}


