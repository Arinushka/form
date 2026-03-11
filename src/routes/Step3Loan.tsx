import { useMemo, useState } from 'react'
import { Alert, Button, Card, Form, Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { step3Schema } from './validators'
import { useFormData } from '../state/formDataContext'
import { addProduct } from '../api/dummyjson'

type Step3Values = z.infer<typeof step3Schema>

export function Step3Loan() {
  const navigate = useNavigate()
  const { data, update } = useFormData()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [show, setShow] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues: { loanAmount: data.loanAmount, loanTermDays: data.loanTermDays },
    mode: 'onTouched',
  })

  const amount = watch('loanAmount')
  const term = watch('loanTermDays')

  const modalText = useMemo(() => {
    return `Поздравляем, ${data.lastName} ${data.firstName}. Вам одобрена $${amount} на ${term} дней.`
  }, [amount, term, data.firstName, data.lastName])

  const onSubmit = async (values: Step3Values) => {
    setSubmitError(null)
    update(values)
    setSubmitting(true)
    try {
      await addProduct({ title: `${data.firstName} ${data.lastName}`.trim() })
      setShow(true)
    } catch (e) {
      setSubmitError(String(e))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="mb-3">Параметры займа</Card.Title>

          {submitError && <Alert variant="danger">Не удалось отправить заявку: {submitError}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <Form.Label>Сумма займа *: ${amount}</Form.Label>
              <Form.Range
                min={200}
                max={1000}
                step={100}
                {...register('loanAmount', { valueAsNumber: true })}
              />
              {errors.loanAmount?.message && (
                <div className="invalid-feedback d-block">{errors.loanAmount.message}</div>
              )}
              <div className="d-flex justify-content-between text-secondary small">
                <span>$200</span>
                <span>$1000</span>
              </div>
            </div>

            <div className="mb-4">
              <Form.Label>Срок займа *: {term} дней</Form.Label>
              <Form.Range min={10} max={30} step={1} {...register('loanTermDays', { valueAsNumber: true })} />
              {errors.loanTermDays?.message && (
                <div className="invalid-feedback d-block">{errors.loanTermDays.message}</div>
              )}
              <div className="d-flex justify-content-between text-secondary small">
                <span>10</span>
                <span>30</span>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => navigate('/step-2')}
                disabled={submitting}
              >
                Назад
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Spinner size="sm" className="me-2" /> Отправка...
                  </>
                ) : (
                  'Подать заявку'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Заявка принята</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {modalText}
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Ок
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


