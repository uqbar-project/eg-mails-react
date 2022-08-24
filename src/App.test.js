import { act } from 'react-dom/test-utils'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import App from './App'

import { MailReader } from './components/MailReader'
import { MailsGrid } from './components/MailsGrid'
import { MailsSummary } from './components/MailsSummary'
import { mailService } from './service/mail'

describe('smoke test de la app', () => {
  test('la app levanta', () => {
    render(<App/>)
    expect(screen.getByTestId('app')).toBeInTheDocument()
  })
})

describe('tests del mail summary', () => {

  test('recupera la cantidad de recientes', () => {
    render(<MailsSummary mails={mailService.mails} />)
    expect(screen.getByTestId('cantidad-recientes')).toHaveTextContent('3')
  })

  test('recupera la cantidad de mails sin leer', () => {
    render(<MailsSummary mails={mailService.mails} />)
    expect(screen.getByTestId('cantidad-sin-leer')).toHaveTextContent('4')
  })

})


describe('tests del mail grid', () => {

  test('muestra un mail reciente con el ícono adecuado', () => {
    const mails = mailService.mails
    render(<MailsGrid mails={mails} />)
    const mailReciente = mails.find((mail) => mail.esReciente())
    expect(screen.getByTestId('reciente' + mailReciente.id)).toBeInTheDocument()
  })

  test('muestra un mail no leído con el ícono adecuado', () => {
    const mails = mailService.mails
    render(<MailsGrid mails={mails} />)
    const mailNoLeido = mails.find((mail) => !mail.leido)
    expect(screen.getByTestId('noLeido' + mailNoLeido.id)).toBeInTheDocument()
  })

  test('muestra un botón para marcar como leído un mail no leído', () => {
    const mails = mailService.mails
    render(<MailsGrid mails={mails} />)
    const mailNoLeido = mails.find((mail) => !mail.leido)
    expect(screen.getByTestId('btnMarcarLeido' + mailNoLeido.id)).toBeInTheDocument()
  })

})

describe('tests del Mail Reader', () => {

  // https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

  test('al buscar pasa los mails filtrados a los componentes hijos', async () => {
    render(<MailReader />)
    const textSearch = screen.getByTestId('textSearch')
    userEvent.type(textSearch, 'luz')
    const spanMail = await screen.findAllByTestId('fecha')
    expect(spanMail.length).toBe(1)
  })
})

