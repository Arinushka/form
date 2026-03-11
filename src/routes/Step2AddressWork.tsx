import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { useCategories } from '../api/queries'
import { useFormData } from '../state/formDataContext'
import { step2Schema } from './validators'

type Step2Values = z.infer<typeof step2Schema>

export function Step2AddressWork() {
  const navigate = useNavigate()
  const { data, update } = useFormData()
  const categoriesQuery = useCategories()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: { workCategory: data.workCategory, address: data.address },
    mode: 'onTouched',
  })

  const onSubmit = (values: Step2Values) => {
    update(values)
    navigate('/step-3')
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Адрес и место работы</Card.Title>

        {categoriesQuery.isError && (
          <Alert variant="danger">
            Не удалось загрузить список мест работы: {String(categoriesQuery.error)}
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Label>Место работы *</Form.Label>
              <div className="position-relative">
                <Form.Select
                  isInvalid={
                    !!errors.workCategory || (submitCount > 0 && (categoriesQuery.isLoading || categoriesQuery.isError))
                  }
                  {...register('workCategory')}
                >
                  <option value="">Выберите...</option>
                  {(categoriesQuery.data ?? []).map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
                {categoriesQuery.isLoading && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                    <Spinner size="sm" />
                  </div>
                )}
              </div>
              {((errors.workCategory && errors.workCategory.message) ||
                (submitCount > 0 && (categoriesQuery.isLoading || categoriesQuery.isError))) && (
                <div className="invalid-feedback d-block">
                  {errors.workCategory?.message ??
                    'Список мест работы пока недоступен — попробуйте чуть позже'}
                </div>
              )}
            </Col>

            <Col xs={12}>
              <Form.Label>Адрес проживания *</Form.Label>
              <Form.Control type="text" isInvalid={!!errors.address} {...register('address')} />
              <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
            </Col>
          </Row>

          <div className="d-flex justify-content-between mt-4">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => navigate('/step-1')}
              disabled={isSubmitting}
            >
              Назад
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Далее
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}


