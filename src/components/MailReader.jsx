import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { useState } from 'react'

import { MailsGrid } from './MailsGrid'
import { MailsSummary } from './MailsSummary'
import { mailService } from 'src/service/mailService'
import { useOnInit } from 'src/customHooks/hooks'

export const MailReader = () => {
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [mails, setMails] = useState([])
  
  useOnInit(() => buscarMails(textoBusqueda))
  
  const leerMail = async (mail) => {
    mail.leer()
    // no es necesario hacer esto, pero ojo con avisar al backend
    await mailService.actualizar(mail)
    setMails([...mails])
    
    // setMails(mails.map((mail) =>
    //   mail.id === idLeido ? mail.leer() : mail
    // ))
    // leer debería ser una función que devuelve un nuevo mail
  }
  
  // Variante más simple
  const buscarMails = async (textoBusquedaNuevo) => {
    setTextoBusqueda(textoBusquedaNuevo)
    const nuevosMails = await mailService.getMails(textoBusquedaNuevo)
    setMails(nuevosMails)
  }
  
  



  // otra variante más rebuscada
  // es que el InputText tenga el onchange definido como onChange={(event) => setTextoBusqueda(event.target.value)} 
  //
  // useEffect(() => {
  //   const fetchMails = async () => {
  //     const mails = await mailService.getMails(textoBusqueda)
  //     setMails(mails)
  //   }

  //   fetchMails()
  // }, [textoBusqueda])

  return (
    <div>
      <Panel header="Mails">
        <div className="p-col-12 p-md-4">
          <div className="p-inputgroup">
            <InputText placeholder="texto a buscar" data-testid='textSearch' value={textoBusqueda} onChange={(event) => buscarMails(event.target.value)} />
            <Button icon="pi pi-search" />
          </div>
        </div>
        <MailsSummary mails={mails} />
        <MailsGrid mails={mails} alLeerMail={leerMail} />
      </Panel>
    </div >
  )
}