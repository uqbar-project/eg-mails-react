# Ejemplo de Mails

[![Build Status](https://travis-ci.com/uqbar-project/eg-mails-react.svg?branch=master)](https://travis-ci.com/uqbar-project/eg-mails-react)

![demo](./video/demo.gif)

En este ejemplo podemos ver

- el uso de React Hooks (`useState` y `useEffect`) para manipular el estado en un componente funcional cuando tenemos que disparar llamadas asincrónicas
- cómo podemos pasar una función desde un componente padre a uno hijo para disparar actualizaciones en cascada
- el renderizado condicional de componentes, recordando que JSX son expresiones (javascript)

## Componentes React

La aplicación cuenta con tres componentes React desarrollados por nosotros:

- **MailReader**: el componente "madre" (o padre) que permite ingresar un texto de búsqueda
- **MailsSummary**: el que nos permite detectar cuántos mails sin leer y cuántos mails recientes tenemos en base a los filtros seleccionados
- **MailsGrid**: el componente que muestra la lista de mails, permite ordenarlos y marcar como leídos aquellos que están sin leer.

![componentes mails](./images/componentes.png)

## MailReader

MailReader tiene como estado:

- el texto de búsqueda
- los mails leídos
- y un estado adicional que permite forzar la búsqueda

### useState

Para mantener la idea del componente como función, utilizamos el hook `useState`:

```js
export const MailReader = () => {
  const [textoBusqueda, setTextoBusqueda] = useState('')

  const [mails, setMails] = useState([])
  // solo para forzar un render
  const [forceChange, setForceChange] = useState(0)
```

### useEffect

Para poder hacer la llamada asincrónica al backend (simulado), utilizaremos el hook `sideEffect` que reemplaza a los eventos `componentDidMount`, `componentDidUpdate` y `componentWillUnmount`.

```js
  useEffect(() => {
    const fetchMails = async () => {
      const mails = await mailService.getMails(textoBusqueda)
      setMails(mails)
    }

    fetchMails()
  }, [textoBusqueda, forceChange])
```

El hook [`useEffect`](https://es.reactjs.org/docs/hooks-effect.html) sirve para ejecutar código una vez que React actualizó el DOM (después de que se evaluó la función `render`). La idea de **efecto** es importante, porque hablamos de él cuando se modifica el estado de un objeto, o cuando se modifica el valor de una referencia.

En el ejemplo de arriba vemos cómo 

- se define una función asincrónica que le pide los mails al backend
- luego se invoca a dicha función
- y se registra como dependencias los estados `textoBusqueda` y `forceChange`. Esto significa que el useEffect se ejecutará la primera vez, y cada vez que cambie el estado del texto de búsqueda o el force change, que veremos más adelante.

El ciclo de vida entonces es:

- render() inicial
- useEffect() inicial, que dispara una actualización al backend
- cuando completa, se actualiza el estado de la página, concretamente los mails
- como el estado cambió, nuevamente se dispara el render, mostrando la lista de mails
- dado que el useEffect() no está asociado a un cambio de los mails, no se ejecuta ninguna función. Es importante no registrar en el árbol de dependencias la referencia al estado `mails`, porque dado que estamos haciendo un `setMails(mails)`, esto podría generar un loop infinito (render inicial > useEffect inicial que setea los mails > render por cambio de estado de mails > useEffect que se activa ante un cambio en los mails que vuelve a disparar la búsqueda y dispara un cambio de estado por los mails > render por cambio de estado de mails ...)

## Buenas prácticas y gotchas del useEffect

- evitar el loop infinito no incluyendo en el árbol de dependencias los mismos estados que estamos afectando dentro de la función
- el useEffect puede llamar a una función asincrónica pero no debe devolver una función asincrónica porque no se ejecutará:

```js
  // no hacer esto
  useEffect(() => {
    return async () => {
      const mails = await mailService.getMails(textoBusqueda)
      setMails(mails)
    }
  }, ...
```

- el `useEffect` es útil para tomar y liberar recursos (como el equivalente del par `componentDidMount` y `componentWillUnmount`), aunque puede ser bastante más confuso entender cómo resolverlo

En general el hook `useEffect` es una implementación poco intuitiva, muy fácil de romper y nuestra apuesta es que será mejorada con el correr del tiempo. Por el momento la alternativa es contar con [reglas del linter](https://es.reactjs.org/docs/hooks-rules.html) que reemplaza el diseño un tanto confuso que hoy nos ofrece para seguir manteniendo nuestros componentes funcionales.

Cuando el usuario escribe algo en el input de búsqueda, eso dispara la actualización del estado:

```js
<InputText placeholder="texto a buscar" value={textoBusqueda} onChange={(event) => setTextoBusqueda(event.target.value)} />
```

que a su vez es referenciado por el useEffect, por lo que dispara nuevamente la consulta al service.

Cada vez que hay nuevos mails, los componentes hijos reciben como props dicha información:

```js
  <MailsSummary mails={mails} />
  <MailsGrid mails={mails} ... />
```

## MailsSummary

El resumen de los mails leídos y recientes aparece con dos íconos con sus respectivos _badges_. Recibimos la lista de mails y filtramos las cantidades correspondientes:

```js
export const MailsSummary = ({ mails }) => {
  const cantidadRecientes = mails.filter((mail) => mail.esReciente()).length
  const cantidadSinLeer = mails.filter((mail) => !mail.leido).length
  ... armamos los badges ...
```

Para calcular las cantidades, recibimos como _props_ únicamente los mails, por eso utilizamos la sintaxis de deconstrucción de objetos:

```js
const ave = { nombre: 'pepita', edad: 20 }
ave.nombre   // 'pepita'
ave.edad     // 20
// o... equivalente
const { nombre, edad } = { nombre: 'pepita', edad: 20 } // o una referencia
nombre   // 'pepita'
edad     // 20
```

## MailsGrid

Este componente funcional muestra la lista de mails con un DataTable:

```js
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
```

Lo interesante son algunas customizaciones que hicimos:

- en cada `Column` del `DataTable` solo podemos utilizar valores primitivos (no están permitidos objetos), por eso debemos usar una "fechaCorta" que lo formatea a un string `dd/MM/yyyy`. Por otra parte, le asociamos como field `fechaOrdenamiento` para que no ordene primero por el día, sino primero por el año, luego por el mes y por último por el día (el formateo es `yyyyMMdd`)

### Renderizado condicional

Para mostrar el ícono de reciente usamos una función que va a recibir el mail y mostrará condicionalmente la expresión JSX que muestra el ícono, o un espacio en blanco:

```jsx
const recienteTemplate = (mail) => {
  return (
    mail.esReciente() ?
      // si el mail es reciente devuelvo el span
      <span title="Reciente" ...>
        <i className="pi pi-calendar"></i>
      </span> 
      :
      // en caso contrario, no muestro nada
      ''
  )
}
```

Lo mismo para el caso del elemento leído. 

### Marcando un mail como leído

El componente hijo `MailsGrid` es el que tiene el botón para marcar como leído un mail. El tema es que recibe los mails como `props`, porque el que maneja el estado es el componente padre: `MailReader`. Entonces, ¿cómo podemos lograr que al presionar el botón haga un cambio de estado?

Para ello, el MailReader le pasa una función en las props, que le dice qué hacer cuando marquen un mail como leído:

```jsx
<MailsGrid mails={mails} alLeerMail={async (mail) => leerMail(mail)} />
```

En la definición de MailsGrid (componente hijo) recibimos como props la función asincrónica `alLeerMail`:

```jsx
<Column body={marcarComoLeidoTemplate(alLeerMail)} ></Column>
```

Esa función se la pasamos a su vez a marcarComoLeidoTemplate, que es una función que genera el JSX con el botón:

```jsx
const marcarComoLeidoTemplate = (alLeerMail) => (mail) => {
  return (
    mail.leido ? '' : <Button type="button" data-testid={'btnMarcarLeido' + mail.id} icon="pi pi-check" className="p-button-secondary" title="Marcar como leído" onClick={() => alLeerMail(mail)}></Button>
  )
}
```

Bueno, se picó un poco, ¿no? La función marcarComoLeidoTemplate recibe como parámetro una función (la que dice lo que hay que hacer cuando el usuario presione el botón). A su vez, devuelve... otra función!!

![mind blown](https://media2.giphy.com/media/ZF40pid2AozVC/giphy.gif)

Y la función que devuelve es la que espera `Column`, que dado un mail hace aparecer condicionalmente el botón si el mail no fue leído aun.

Cuando el usuario presiona el botón, se invoca a la función `alLeerMail(mail)`, que termina resolviendo lo que MailReader pidió:

```jsx
async (mail) => leerMail(mail)
```

es decir:

```js
const leerMail = async (mail) => {
  mail.leer()
  await mailService.actualizar(mail)
  setForceChange(forceChange + 1)
}
```

- marcamos el mail como leído
- actualizamos el "backend" representado por el service, en forma asincrónica
- y por último forzamos un cambio de estado con un valor autoincrementado, para hacer que el MailReader se vuelva a renderizar, y esto causa a su vez el renderizado en cascada de MailsGrid y MailsSummary.

Sí, es fácil perderse. Para los próximos ejemplos veremos alternativas a esta opción. 

TODO: Agregar ejemplos de aplicación parcial.

## Material relacionado

- [How the useEffect Hook Works (with Examples)](https://daveceddia.com/useeffect-hook-examples/)
- [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)
