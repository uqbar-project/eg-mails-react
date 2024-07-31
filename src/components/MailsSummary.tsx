import './MailsSummary.css'
import { Mail } from 'src/domain/mail'

// Componente que sabe mostrar los mails nuevos y los leídos
export const MailsSummary = ({ mails }: { mails: Mail[]}) => {
  const cantidadRecientes = mails.filter((mail) => mail.esReciente()).length
  const cantidadSinLeer = mails.filter((mail) => !mail.leido).length

  return (
    <div className="badges">
      <span title="Mails recientes">
        <img src="src/assets/badge-recent.svg" className="badge"></img>
        <span className="badge-numero" data-testid="cantidad-recientes">{cantidadRecientes}</span>
      </span>
      <span title="Mails sin leer">
        <img src="src/assets/badge-unread.png" className="badge"></img>
        <span className="badge-numero" data-testid="cantidad-sin-leer">{cantidadSinLeer}</span>
      </span>
    </div>
  )
}
