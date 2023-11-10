
## Resolución de la búsqueda mediante el hook useEffect

Para poder hacer la llamada asincrónica al backend (simulado), utilizaremos el hook `useEffect` que reemplaza a los eventos `componentDidMount`, `componentDidUpdate` y `componentWillUnmount`.

```js
useEffect(() => {
  const fetchMails = async () => {
    const mails = await mailService.getMails(textoBusqueda)
    setMails(mails)
  }

  fetchMails()
}, [textoBusqueda])
```

El hook [`useEffect`](https://es.reactjs.org/docs/hooks-effect.html) sirve para ejecutar código una vez que React actualizó el DOM (después de que se evaluó la función `render`). La idea de **efecto** es importante, porque hablamos de él cuando se modifica el estado de un objeto, o cuando se modifica el valor de una referencia.

En el ejemplo de arriba vemos cómo 

- se define una función asincrónica que le pide los mails al backend
- luego se invoca a dicha función
- y se registra como árbol de dependencias el estado `textoBusqueda`. Esto significa que el useEffect se ejecutará la primera vez, y cada vez que cambie el estado del texto de búsqueda.

El ciclo de vida entonces es:

- render() inicial
- useEffect() inicial, que dispara una actualización al backend
- cuando completa, se actualiza el estado de la página, concretamente los mails
- como el estado cambió, nuevamente se dispara el render, mostrando la lista de mails
- el estado que cambió fue `mails`, que no está asociado a ningún `useEffect` definido. Es importante no registrar en el árbol de dependencias la referencia al estado `mails`, porque dado que estamos haciendo un `setMails(mails)`, esto podría generar un loop infinito (render inicial > useEffect inicial que setea los mails > render por cambio de estado de mails > useEffect que se activa ante un cambio en los mails que vuelve a disparar la búsqueda y dispara un cambio de estado por los mails > render por cambio de estado de mails ...)

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

## Por qué no utilizar el hook useEffect

- es una resolución que requiere entender cómo funciona el motor de React (se pierde la declaratividad)...
- además de ser complejo: actualizamos el estado del texto a buscar para luego asociarlo a un useEffect que a su vez termina actualizando el estado de los mails
- la variante que hace el fetch resuelve todo a un único punto donde se resuelve todo
- y el useEffect además es una función que sirve más para definir _custom hooks_ más que componentes propios de React

Podés profundizar más en [este video](https://www.youtube.com/watch?v=dH6i3GurZW8).
