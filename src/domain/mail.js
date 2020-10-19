import { differenceInDays, format } from 'date-fns'

const MAXIMO_TEXTO = 40
let ultimoId = 1

export class Mail {
  constructor(emisor, asunto, texto, fecha = new Date(), leido = false) {
    this.id = ultimoId++
    this.fecha = fecha
    this.emisor = emisor
    this.asunto = asunto
    this.texto = texto
    this.leido = leido
  }

  get fechaCorta() {
    return format(this.fecha, 'dd/MM/yyyy')
  }

  get fechaOrdenamiento() {
    return format(this.fecha, 'yyyyMMdd')
  }

  get textoCorto() {
    return this.texto.length > MAXIMO_TEXTO ? this.texto.substring(0, MAXIMO_TEXTO - 3) + "..." : this.texto
  }

  esReciente() {
    return differenceInDays(new Date(), this.fecha) < 7
  }

  contiene(texto) {
    const textoMinuscula = texto.toLowerCase()
    return this.asunto.toLowerCase().includes(textoMinuscula) || this.texto.toLowerCase().includes(textoMinuscula)
  }

  leer() {
    this.leido = true
  }

}