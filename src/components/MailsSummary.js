import React from 'react'

// Componente que sabe mostrar los mails nuevos y los de la última semana
export const MailsSummary = ({ mails }) => {
  const cantidadRecientes = mails.filter((mail) => mail.esReciente()).length
  const cantidadSinLeer = mails.filter((mail) => !mail.leido).length

  return (
    <div style={{ display: 'flex', margin: '1em' }}>
      <div style={{ margin: '1em' }}>
        <span className="p-overlay-badge" title="Mails recientes">
          <i className="pi pi-calendar" style={{ fontSize: '2em' }}></i>
          <span className="p-badge p-badge-info">{cantidadRecientes}</span>
        </span>
      </div>
      <div style={{ margin: '1em' }}>
        <span className="p-overlay-badge p-m-2" title="Mails sin leer">
          <i className="pi pi-eye" style={{ fontSize: '2em' }}></i>
          <span className="p-badge p-badge-warning">{cantidadSinLeer}</span>
        </span>
      </div>
    </div>
  )
}
