import './MailsGrid.css'
import { Mail } from 'src/domain/mail'

// Componente que sabe mostrar los mails en una tabla
export const MailsGrid = ({ mails, alLeerMail }: { mails: Mail[], alLeerMail: (mail: Mail) => Promise<void> }) => {
  return (
    <div className="grid">
      <div className="table header">
        <span>Fecha</span>
        <span>Emisor</span>
        <span>Asunto</span>
        <span>Texto</span>
        <span></span>
      </div>
      { mails.map((mail: Mail) => (
      <div key={'padre' + mail.id}>
        <div key={mail.id} className="table">
          <span data-testid="fecha">{mail.fechaCorta}</span>
          <span>{mail.emisor}</span>
          <span>{mail.asunto}</span>
          <span>{mail.texto}</span>
          <div className="status">
            {mail.esReciente() && <img className="icon" title="reciente" src="src/assets/recent.svg" data-testid={'reciente-' + mail.id}></img>}
            {!mail.leido && <img className="icon seleccionable" title="sin leer -> podés hacer click para marcarlo como leído" src="src/assets/pending.svg" data-testid={'no-leido-' + mail.id} onClick={() => alLeerMail(mail)}></img>}
            </div>
        </div>
        <hr/>
      </div>
      )) 
      }
    </div>
  )
}
