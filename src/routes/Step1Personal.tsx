import { Card, Col, Form, Row, Button } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { MaskedPhoneInput } from '../components/MaskedPhoneInput'
import { useFormData } from '../state/formDataContext'
import { step1Schema } from './validators'
import type { z } from 'zod'

type Step1Values = z.infer<typeof step1Schema>

export function Step1Personal() {
  const navigate = useNavigate()
  const { data, update } = useFormData()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      // zod enum: set undefined if empty to force validation
      gender: data.gender === '' ? undefined : data.gender,
    } as unknown as Step1Values,
    mode: 'onTouched',
  })

  const onSubmit = (values: Step1Values) => {
    update(values)
    navigate('/step-2')
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Личные данные</Card.Title>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Label>Телефон *</Form.Label>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <MaskedPhoneInput
                    type="tel"
                    inputMode="tel"
                    placeholder="0XXX XXX XXX"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    // make RHF aware of "touched"
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label>Имя *</Form.Label>
              <Form.Control
                type="text"
                autoComplete="given-name"
                isInvalid={!!errors.firstName}
                {...register('firstName')}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label>Фамилия *</Form.Label>
              <Form.Control
                type="text"
                autoComplete="family-name"
                isInvalid={!!errors.lastName}
                {...register('lastName')}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName?.message}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12}>
              <Form.Label>Пол *</Form.Label>
              <Form.Select isInvalid={!!errors.gender} {...register('gender')}>
                <option value="">Выберите...</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.gender?.message}</Form.Control.Feedback>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button type="submit" disabled={isSubmitting}>
              Далее
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}


