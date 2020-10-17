import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

// Componente que sabe mostrar los mails en una tabla
export const MailsGrid = ({ mails }) => {
  return (
    <DataTable value={mails} autoLayout={true}>
      <Column field="fechaCorta" header="Fecha" sortable></Column>
      <Column field="emisor" header="Enviado por" sortable></Column>
      <Column field="asunto" header="Asunto" sortable></Column>
      <Column field="texto" header="Texto" sortable></Column>
    </DataTable >
  )
}