import pendingIcon from '../assets/pending.svg'
import recentIcon from '../assets/recent.svg'
import type { Mail } from '../domain/mail'
import './MailsGrid.css'

// Componente que sabe mostrar los mails en una tabla
export const MailsGrid = ({
  mails,
  alLeerMail,
}: {
  mails: Mail[]
  alLeerMail: (mail: Mail) => Promise<void>
}) => {
  return (
    <div className="grid">
      <div className="table header">
        <span>Fecha</span>
        <span>Emisor</span>
        <span>Asunto</span>
        <span>Texto</span>
        <span></span>
      </div>
      {mails.map((mail: Mail) => (
        <div key={`padre${mail.id}`}>
          <div key={mail.id} className="table">
            <span data-testid="fecha">{mail.fechaCorta}</span>
            <span>{mail.emisor}</span>
            <span>{mail.asunto}</span>
            <span>{mail.texto}</span>
            <div className="status">
              {mail.esReciente() && (
                <img
                  className="icon"
                  title="reciente"
                  src={recentIcon}
                  data-testid={`reciente-${mail.id}`}
                  alt=""
                  aria-hidden="true"
                ></img>
              )}
              {!mail.leido && (
                <button
                  className="icon seleccionable"
                  title="sin leer -> podés hacer click para marcarlo como leído"
                  onClick={() => alLeerMail(mail)}
                  data-testid={`no-leido-${mail.id}`}
                  aria-label="Marcar como leído"
                  type="button"
                >
                  <img src={pendingIcon} alt="" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  )
}
