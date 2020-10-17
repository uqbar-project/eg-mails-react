import React from 'react'

// Componente que sabe mostrar los mails nuevos y los de la última semana
export const MailsSummary = ({ mails }) => {
  const cantidadRecientes = mails.filter((mail) => mail.esReciente()).length
  const cantidadSinLeer = mails.filter((mail) => !mail.leido).length

  return (
    <div className="p-m-2 p-p-2">
      <span className="p-overlay-badge">
        <i className="pi pi-calendar" style={{ fontSize: '2em' }}></i>
        <span className="p-badge">{cantidadRecientes}</span>
      </span>
      <span className="p-overlay-badge">
        <i className="pi pi-eye" style={{ fontSize: '2em' }}></i>
        <span className="p-badge">{cantidadSinLeer}</span>
      </span>
    </div>
  )
}
