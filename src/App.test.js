import { render } from '@testing-library/react'
import React from 'react'

import { MailsGrid } from './components/MailsGrid'
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


describe('tests del mail grid', () => {

  test('muestra un mail reciente con el ícono adecuado', () => {
    const mails = mailService.mails
    const { getByTestId } = render(<MailsGrid mails={mails} />)
    const mailReciente = mails.find((mail) => mail.esReciente())
    expect(getByTestId('reciente' + mailReciente.id)).toBeInTheDocument()
  })

  test('muestra un mail no leído con el ícono adecuado', () => {
    const mails = mailService.mails
    const { getByTestId } = render(<MailsGrid mails={mails} />)
    const mailNoLeido = mails.find((mail) => !mail.leido)
    expect(getByTestId('noLeido' + mailNoLeido.id)).toBeInTheDocument()
  })

  test('muestra un botón para marcar como leído un mail no leído', () => {
    const mails = mailService.mails
    const { getByTestId } = render(<MailsGrid mails={mails} />)
    const mailNoLeido = mails.find((mail) => !mail.leido)
    expect(getByTestId('btnMarcarLeido' + mailNoLeido.id)).toBeInTheDocument()
  })

})
