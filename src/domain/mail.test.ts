import { subDays } from 'date-fns'
import { Mail } from './mail'
import { beforeEach, describe, expect, test } from 'vitest'

describe('Tests de mail', () => {
  let mail: Mail

  beforeEach(() => {
    mail = new Mail('laura.iturbe@tumail.uy', 'Receta moussaka', 'Te mando la receta del moussaka: https://saboresymomentos.es/moussaka-griega-receta-original/', subDays(new Date(), 13))
  })
  
  test('el mail originalmente no está leido', () => {
    expect(mail.leido).toBeFalsy()
  })

  test('al leer el mail pasa a estar leido', () => {
    mail.leer()
    expect(mail.leido).toBeTruthy()
  })

  test('el texto corto de un mail largo muestra la primera parte solamente', () => {
    expect(mail.textoCorto).toBe('Te mando la receta del moussaka: http...')
  })

  test('el texto corto de un mail no muy extenso muestra toda la descripción', () => {
    const mailCorto = new Mail('laura.iturbe@tumail.uy', 'Receta moussaka', 'Hola!', subDays(new Date(), 13))
    expect(mailCorto.textoCorto).toBe('Hola!')
  })

  test('fecha de ordenamiento', () => {
    mail.fecha = new Date(2010, 1, 1)
    expect(mail.fechaOrdenamiento).toBe('20100201')
  })

  test('fecha', () => {
    mail.fecha = new Date(2010, 1, 1)
    expect(mail.fechaCorta).toBe('01/02/2010')
  })

  test('contiene acepta valores en texto', () => {
    expect(mail.contiene('Mando')).toBeTruthy()
    expect(mail.contiene('Manda')).toBeFalsy()
  })

  test('contiene acepta valores en asunto', () => {
    expect(mail.contiene('mouSsaka')).toBeTruthy()
    expect(mail.contiene('mousaka')).toBeFalsy()
  })
})