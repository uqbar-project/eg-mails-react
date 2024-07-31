import './MailReader.css'
import { useState } from 'react'

import { MailsGrid } from './MailsGrid'
import { MailsSummary } from './MailsSummary'
import { useOnInit } from 'src/customHooks/hooks'
import { Mail } from 'src/domain/mail'
import { mailService } from 'src/service/mailService'

export const MailReader = () => {
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [mails, setMails] = useState<Mail[]>([])
  
  useOnInit(() => buscarMails(textoBusqueda))
  
  const leerMail = async (mail: Mail) => {
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
  const buscarMails = async (textoBusquedaNuevo: string) => {
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
    <div className="main">
      <h3>Aplicación de Mails</h3>
      <MailsSummary mails={mails} />
      <div className="searchGroup">
        <div>
          <input type="text" placeholder="texto a buscar" data-testid="textSearch" value={textoBusqueda} onChange={(event) => buscarMails(event.target.value)} className="search" />
          <img src="src/assets/search.png" className="search"></img>
        </div>
      </div>
      <MailsGrid mails={mails} alLeerMail={leerMail} />
    </div >
  )
}