import { subDays } from 'date-fns'
import { Mail } from 'src/domain/mail'

class MailService {
  mails = [
    new Mail('rgrisolia@unsam.edu.ar', 'Clase React', 'Hola Fer, sí, dale, contame para la clase', subDays(new Date(), 18), true),
    new Mail('jorgeluis@manija.edu.ar', 'Bulma', 'Eh Dodain! Estoy re-manija, doy la clase de Bulma ATR!!', subDays(new Date(), 16), true),
    new Mail('laura.iturbe@tumail.uy', 'Receta moussaka', 'Te mando la receta del moussaka: https://saboresymomentos.es/moussaka-griega-receta-original/', subDays(new Date(), 13)),
    new Mail('laura.iturbe@tumail.uy', 'Comprobante Autopista', 'Después buscamos el comprobante para hacer la rendición del gasto. Besito.', subDays(new Date(), 12), true),
    new Mail('rgrisolia@unsam.edu.ar', 'Feliz cumple', 'Ayer era tu cumple? Colgué', subDays(new Date(), 10)),
    new Mail('jcontardo@unsam.edu.ar', 'TPs', 'Están todos aprobados...', subDays(new Date(), 5)),
    new Mail('jcontardo@unsam.edu.ar', 'TP Extra', 'Hola Fer, te parece si agregamos un TP de Android?', subDays(new Date(), 4)),
    new Mail('rgrisolia@unsam.edu.ar', 'Estoy sin luz', 'Edesur me dejó sin luz, ya hice el reclamo...', new Date(), true),
  ]

  async getMails(textoBusqueda: string) {
    return this.mails.filter((mail) => !textoBusqueda || mail.contiene(textoBusqueda))
  }

  async actualizar(mailAActualizar: Mail) {
    const indiceActualizar = this.mails.findIndex((mail) => mail.id === mailAActualizar.id)
    if (indiceActualizar === -1) {
      this.mails.push(mailAActualizar)
    } else {
      this.mails[indiceActualizar] = mailAActualizar
    }
  }

}

export const mailService = new MailService()