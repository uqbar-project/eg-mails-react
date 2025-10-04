import { differenceInDays, format } from 'date-fns'

const MAXIMO_TEXTO = 40
let ultimoId = 1

export class Mail {
  public id: number

  constructor(public emisor: string, public asunto: string, public texto: string, public fecha = new Date(), public leido = false) {
    this.id = ultimoId++
  }

  get fechaCorta() {
    return format(this.fecha, 'dd/MM/yyyy')
  }

  get fechaOrdenamiento() {
    return format(this.fecha, 'yyyyMMdd')
  }

  get textoCorto() {
    return this.texto.length > MAXIMO_TEXTO ? this.texto.substring(0, MAXIMO_TEXTO - 3) + '...' : this.texto
  }

  esReciente() {
    return differenceInDays(new Date(), this.fecha) < 7
  }

  contiene(texto: string) {
    const textoMinuscula = texto.toLowerCase()
    return this.asunto.toLowerCase().includes(textoMinuscula) || this.texto.toLowerCase().includes(textoMinuscula)
  }

  leer() {
    this.leido = true
  }

}