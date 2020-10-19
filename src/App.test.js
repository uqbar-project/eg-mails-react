import { render } from '@testing-library/react'
import React from 'react'

import { MailsSummary } from './components/MailsSummary'
import { mailService } from './service/mail'

describe('tests del mail summary', () => {

  test('recupera la cantidad de recientes', () => {
    const { getByTestId } = render(<MailsSummary mails={mailService.mails} />)
    expect(getByTestId('cantidad-recientes')).toHaveTextContent('3')
  })

  test('recupera la cantidad de mails sin leer', () => {
    const { getByTestId } = render(<MailsSummary mails={mailService.mails} />)
    expect(getByTestId('cantidad-sin-leer')).toHaveTextContent('4')
  })

})
