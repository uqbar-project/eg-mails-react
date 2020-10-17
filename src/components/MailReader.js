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

  useEffect(() => {
    console.log('texto búsqueda', textoBusqueda)
    // devolvemos una función que manda a actualizar el estado cuando obtiene los mails
    return async () => {
      // ojo, el DataTable no admite que la referencia mails tenga objetos
      const mails = await mailService.getMails(textoBusqueda)
      setMails(mails)
    }
  }, [textoBusqueda])

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
        <MailsGrid mails={mails} />
      </Panel>
    </div >
  )
}