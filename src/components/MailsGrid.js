import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { Mail } from '../domain/mail'

const fechaTemplate = (mail) => {
  return (
    <span data-testid="fecha">{mail.fechaCorta}</span>
  )
}

const marcarComoLeidoTemplate = (alLeerMail) => (mail) => {
  return (
    mail.leido ? '' : <Button type="button" data-testid={'btnMarcarLeido' + mail.id} icon="pi pi-check" className="p-button-secondary" title="Marcar como leído" onClick={() => alLeerMail(mail)}></Button>
  )
}

const recienteTemplate = (mail) => {
  return (
    mail.esReciente() ?
      <span title="Reciente" data-testid={'reciente' + mail.id} className="p-badge p-badge-info icon-badge" style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
        <i className="pi pi-calendar"></i>
      </span> : ''
  )
}

const leidoTemplate = ({ id, leido }) => {
  return (
    leido ?
      '' :
      <span title="No leído" data-testid={'noLeido' + id} className="p-badge p-badge-warning icon-badge" style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
        <i className="pi pi-eye"></i>
      </span>
  )
}

// Componente que sabe mostrar los mails en una tabla
export const MailsGrid = ({ mails, alLeerMail }) => {
  return (
    <DataTable value={mails} autoLayout={true} className="p-datatable-striped">
      <Column header="Fecha" body={fechaTemplate} field="fechaOrdenamiento" sortable></Column>
      <Column field="emisor" header="Enviado por" sortable></Column>
      <Column field="asunto" header="Asunto" sortable></Column>
      <Column field="texto" header="Texto" sortable></Column>
      <Column body={recienteTemplate} ></Column>
      <Column body={leidoTemplate} ></Column>
      <Column body={marcarComoLeidoTemplate(alLeerMail)} ></Column>
    </DataTable >
  )
}

MailsGrid.propTypes = {
  mails: [Mail],
  alLeerMail: () => Promise,
}
