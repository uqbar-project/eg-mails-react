import './MailReader.css'
import { useRef, useState } from 'react'

import { MailsGrid } from './MailsGrid'
import { MailsSummary } from './MailsSummary'
// import { useOnInit } from 'src/customHooks/hooks'
import { Mail } from 'src/domain/mail'
import { mailService } from 'src/service/mailService'

export const MailReader = () => {
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [mails, setMails] = useState<Mail[]>([])

  // Opción 1 para disparar la búsqueda de mail - creamos una función async y la llamamos en el botón de búsqueda
  const buscarMails = async (textoBusquedaNuevo: string) => {
    setTextoBusqueda(textoBusquedaNuevo)
    const nuevosMails = await mailService.getMails(textoBusquedaNuevo)
    setMails(nuevosMails)
  }
  
  // Opción 2 - más rebuscado: el InputText tiene definido onChange={(event) => setTextoBusqueda(event.target.value)} 
  // y el useEffect detecta cambios en el texto de búsqueda y se encarga de disparar la búsqueda 
  // useEffect(() => {
  //   const fetchMails = async () => {
  //     const mails = await mailService.getMails(textoBusqueda)
  //     setMails(mails)
  //   }
  //   fetchMails()
  // }, [textoBusqueda])
  /*
  Opción 1 para la carga inicial - usamos un ref para disparar la carga inicial 
  */
  const hasInitializedRef = useRef(false)
  if (!hasInitializedRef.current) {
    hasInitializedRef.current = true
    buscarMails('')
  }

  /* Opción 2 para la carga inicial - usamos el hook useOnInit que enmascara un useEffect */
  // useOnInit(() => buscarMails(textoBusqueda))

  const leerMail = async (mail: Mail) => {
    mail.leer()
    // en este ejemplo no es necesario pero si tenemos un backend de verdad hay que avisarle
    await mailService.actualizar(mail)
    setMails([...mails])
  }

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