import { subDays } from "date-fns"
import { mailService } from "./mailService"
import { beforeEach, describe, expect, test } from 'vitest'
import { Mail } from "src/domain/mail"

describe('test del service', () => {

  beforeEach(() => {
    mailService.mails = [
      new Mail('rgrisolia@unsam.edu.ar', 'Clase React', 'Hola Fer, sí, dale, contame para la clase', subDays(new Date(), 18), true),
      new Mail('jorgeluis@manija.edu.ar', 'Bulma', 'Eh Dodain! Estoy re-manija, doy la clase de Bulma ATR!!', subDays(new Date(), 16), true),
    ]
  })

  test('al actualizar un mail existente cambia los valores', async () => {
    const nuevoAsunto = 'KCyo'
    const mailAActualizar = mailService.mails[0]
    mailAActualizar.asunto = nuevoAsunto
    await mailService.actualizar(mailAActualizar)
    expect(mailService.mails[0].asunto).toBe(nuevoAsunto)
  })

  test('al actualizar un mail que no existe genera un nuevo mail', async () => {
    const cantidadMails = mailService.mails.length
    const mailAActualizar = new Mail('alguien@unsam.edu.ar', 'Feliz cumple', 'Capo!', subDays(new Date(), 10))
    await mailService.actualizar(mailAActualizar)
    expect(mailService.mails.length).toBe(cantidadMails + 1)
  })

  test('buscar mails por asunto o texto', async () => {
    const result = await mailService.getMails('Bulma')
    expect(result.length).toEqual(1)
  })
})