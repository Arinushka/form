import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'
import type { ComponentPropsWithoutRef } from 'react'

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'> & {
  value: string
  onChange: (value: string) => void
}

export const MaskedPhoneInput = forwardRef<HTMLInputElement, Props>(function MaskedPhoneInput(
  { value, onChange, ...rest },
  ref,
) {
  return (
    <IMaskInput
      {...rest}
      // needed for integration with form libs & focusing
      inputRef={ref}
      // IMask pattern placeholder for digits is `0` (not `#`).
      // Requirement is "0XXX XXX XXX" -> validate leading 0 in schema, mask keeps formatting.
      mask="0000 000 000"
      value={value}
      // IMask passes the *masked* value to onAccept
      onAccept={(val) => onChange(String(val))}
      overwrite
    />
  )
})


