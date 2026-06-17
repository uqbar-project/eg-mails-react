import badgeRecent from 'src/assets/badge-recent.svg'
import badgeUnread from 'src/assets/badge-unread.png'
import type { Mail } from 'src/domain/mail'
import './MailsSummary.css'

// Componente que sabe mostrar los mails nuevos y los leídos
export const MailsSummary = ({ mails }: { mails: Mail[] }) => {
  const cantidadRecientes = mails.filter((mail) => mail.esReciente()).length
  const cantidadSinLeer = mails.filter((mail) => !mail.leido).length

  return (
    <div className="badges">
      <span title="Mails recientes">
        <img
          src={badgeRecent}
          className="badge"
          alt=""
          aria-hidden="true"
        ></img>
        <span className="badge-numero" data-testid="cantidad-recientes">
          {cantidadRecientes}
        </span>
      </span>
      <span title="Mails sin leer">
        <img
          src={badgeUnread}
          className="badge"
          alt=""
          aria-hidden="true"
        ></img>
        <span className="badge-numero" data-testid="cantidad-sin-leer">
          {cantidadSinLeer}
        </span>
      </span>
    </div>
  )
}
