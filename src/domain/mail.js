import { differenceInDays, format } from 'date-fns'

const MAXIMO_TEXTO = 40

export class Mail {
  constructor(emisor, asunto, texto, fecha = new Date(), leido = false) {
    this.fecha = fecha
    this.emisor = emisor
    this.asunto = asunto
    this.texto = texto
    this.leido = leido
  }

  get fechaCorta() {
    return format(this.fecha, 'dd/MM/yyyy')
  }

  get textoCorto() {
    return this.texto.length > MAXIMO_TEXTO ? this.texto.substring(0, MAXIMO_TEXTO - 3) + "..." : this.texto
  }

  esReciente() {
    return differenceInDays(new Date(), this.fecha) < 7
  }

  contiene(texto) {
    const textoMinuscula = texto.toLowerCase()
    return !texto || this.asunto.toLowerCase().includes(textoMinuscula) || this.texto.toLowerCase().includes(textoMinuscula)
  }

}