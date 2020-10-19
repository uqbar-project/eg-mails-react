import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

const fechaTemplate = (mail) => {
  return (
    <span>{mail.fechaCorta}</span>
  )
}

const marcarComoLeidoTemplate = (alLeerMail) => (mail) => {
  return (
    mail.leido ? '' : <Button type="button" icon="pi pi-check" className="p-button-secondary" title="Marcar como leído" onClick={() => alLeerMail(mail)}></Button>
  )
}

const recienteTemplate = (mail) => {
  return (
    mail.esReciente() ?
      <span title="Reciente" className="p-badge p-badge-info" style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
        <i className="pi pi-calendar"></i>
      </span> : ''
  )
}

const leidoTemplate = ({ leido }) => {
  return (
    leido ?
      '' :
      <span title="No leído" className="p-badge p-badge-warning" style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
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