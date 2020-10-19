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
  // solo para forzar un render
  const [forceChange, setForceChange] = useState(0)

  const leerMail = async (mail) => {
    mail.leer()
    await mailService.actualizar(mail)
    setForceChange(forceChange + 1)
  }

  useEffect(() => {
    // devolvemos una función que manda a actualizar el estado cuando obtiene los mails
    const fetchMails = async () => {
      // ojo, el DataTable no admite que la referencia a Column 
      // tenga objetos que no sean primitivos
      const mails = await mailService.getMails(textoBusqueda)
      setMails(mails)
    }

    fetchMails()
  }, [textoBusqueda, forceChange])

  return (
    <div>
      <Panel header="Mails">
        <div className="p-col-12 p-md-4">
          <div className="p-inputgroup">
            <InputText placeholder="texto a buscar" value={textoBusqueda} onChange={(event) => setTextoBusqueda(event.target.value)} />
            <Button icon="pi pi-search" />
          </div>
        </div>
        <MailsSummary mails={mails} />
        <MailsGrid mails={mails} alLeerMail={async (mail) => leerMail(mail)} />
      </Panel>
    </div >
  )
}