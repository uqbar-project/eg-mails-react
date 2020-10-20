import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'

import { mailService } from '../service/mail'
import { MailsGrid } from './MailsGrid'
import { MailsSummary } from './MailsSummary'

export const MailReader = () => {
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [mails, setMails] = useState([])

  const leerMail = async (mail) => {
    mail.leer()
    // no es necesario hacer esto, pero ojo con avisar al backend
    await mailService.actualizar(mail)
    setMails([...mails])

    // otra variante de un amigo: Dami Pereira
    // setMails(mails.map((mail) =>
    //   mail.id === idLeido ? mail.leer() : mail
    // ))
    // leer debería ser una función que devuelve un nuevo mail
  }

  useEffect(() => {
    const fetchMails = async () => {
      const mails = await mailService.getMails(textoBusqueda)
      setMails(mails)
    }

    // invocamos a la función que obtiene los mails
    // en base al criterio de búsqueda
    fetchMails()
  }, [textoBusqueda])

  return (
    <div>
      <Panel header="Mails">
        <div className="p-col-12 p-md-4">
          <div className="p-inputgroup">
            <InputText placeholder="texto a buscar" data-testid='textSearch' value={textoBusqueda} onChange={(event) => setTextoBusqueda(event.target.value)} />
            <Button icon="pi pi-search" />
          </div>
        </div>
        <MailsSummary mails={mails} />
        <MailsGrid mails={mails} alLeerMail={async (mail) => leerMail(mail)} />
      </Panel>
    </div >
  )
}