import { Mail } from '../domain/mail'
import PropTypes from 'prop-types'
import { Badge } from 'primereact/badge'

// Componente que sabe mostrar los mails nuevos y los leídos
export const MailsSummary = ({ mails }) => {
  const cantidadRecientes = mails.filter((mail) => mail.esReciente()).length
  const cantidadSinLeer = mails.filter((mail) => !mail.leido).length

  return (
    <div style={{ display: 'flex', margin: '1em' }}>
      <div style={{ margin: '1em' }}>
        <span title="Mails recientes">
          <i className="pi pi-calendar p-overlay-badge" style={{ fontSize: '2.4em' }}>
            <Badge data-testid="cantidad-recientes" severity="info" value={cantidadRecientes} />
          </i>
        </span>
      </div>
      <div style={{ margin: '1em' }}>
        <span className="p-m-2" title="Mails sin leer">
          <i className="pi pi-eye p-overlay-badge" style={{ fontSize: '2.5em' }}>
            <Badge data-testid="cantidad-sin-leer" severity="warning" value={cantidadSinLeer} />
          </i>
        </span>
      </div>
    </div>
  )
}

MailsSummary.propTypes = {
  mails: PropTypes.arrayOf(
    PropTypes.instanceOf(Mail)
  ),
}
