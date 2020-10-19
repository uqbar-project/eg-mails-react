# Ejemplo de Mails

[![Build Status](https://travis-ci.com/uqbar-project/eg-mails-react.svg?branch=master)](https://travis-ci.com/uqbar-project/eg-mails-react)

![demo](./video/demo.gif)

En este ejemplo podemos ver

- el uso de React Hooks (`useState` y `useEffect`) para manipular el estado en un componente funcional cuando tenemos que disparar llamadas asincrónicas
- cómo podemos pasar una función desde un componente padre a uno hijo para disparar actualizaciones en cascada
- el renderizado condicional de componentes, recordando que JSX son expresiones (javascript)

## Componentes React

La aplicación cuenta con tres componentes React desarrollados por nosotros:

- **MailsReader**: el componente "madre" (o padre) que permite ingresar un texto de búsqueda
- **MailsSummary**: el que nos permite detectar cuántos mails sin leer y cuántos mails recientes tenemos en base a los filtros seleccionados
- **MailsGrid**: el componente que muestra la lista de mails, permite ordenarlos y marcar como leídos aquellos que están sin leer.

![componentes mails](./images/componentes.png)

## MailsReader

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

## Material relacionado

- [How the useEffect Hook Works (with Examples)](https://daveceddia.com/useeffect-hook-examples/)
- [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)
