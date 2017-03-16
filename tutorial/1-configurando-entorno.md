Procedemos a configurar el entorno de desarrollo completo para comenzar a construir nuestro bot con:
- [Bot Framework](https://dev.botframework.com/): plataforma de Microsoft para el despliegue de bots en las distintas aplicaciones de mensajería.
- [BotBuilder](https://github.com/Microsoft/BotBuilder): SDK open source de Microsoft para el desarrollo de la lógica de bots.
- [LUIS](https://www.luis.ai/home/index): API de Microsoft para capacitar al bot de comprensión del lenguaje natural.
- [Node.js](https://nodejs.org/es/): framework sobre el que corre nuestro bot.
- [TypeScript](https://www.typescriptlang.org/): lenguaje de programación, que extiende el lenguaje JavaScript con tipado.

### Nos posicionamos en la rama con el proyecto semilla
Si abrimos la consola del entorno veremos que ya tenemos clonada la rama `master` de nuestro repositorio inicial, pero no es está la rama que contiene nuestro proyecto semilla.
Asegúrate de posicionarte en la rama donde se encuentra el proyecto semilla `feat/boilerplate-helloworld-1` cambiando a esta rama con el comando: `git checkout -b feat/boilerplate-helloworld-1 origin/feat/boilerplate-helloworld-1`.

### Creamos nuestro bot en la plataforma Microsoft Bot Framework
Entramos en https://dev.botframework.com/ y creamos el bot.
Los únicos datos a los que debemos prestar especial atención a la hora de registrarlo son:
- Messaging endpoint: este es el endpoint que expone tu bot y que tiene la siguiente forma: `https://xxxxxxxx.ngrok.io/api/messages`
- APP ID y APP PASSWORD: estas credenciales que generarás clickando en el botón `Manage Microsoft app ID and password` las tendrás que introducir en el fichero `run.sh` en las variables de entorno correspondientes.

### Ejecutamos por primera vez nuestro bot semilla
Para ejecutar el bot debemos ejecutamos `sh run.sh` para ejecutar el fichero `run.sh` el cual importa las variables de entorno necesarias y pone en marcha el bot.

### Creamos un túnel para conectar con MS Bot Framework
Para conectar nuestro bot con la plataforma Microsoft Bot Framework la cual lo expone y publica, tenemos que crear un túnel con `ngrok` mediante el siguiente comando:
`ngrok http 3978` el cual expone nuestra máquina de Codebox públicamente el puerto 3978 con un dominio asignado.

### Saludamos a Stockito
Abrimos de nuevo https://dev.botframework.com/ y clickamos en `Test`, en caso de que nos devuelva un mensaje `Accepted` vamos a la ventana de dialogo para enviar nuestro primer mensaje a Stockito: `Hi`... ¡Magia! Nos devuelve el saludo. ¿Pero cómo lo hemos hecho? **Te lo explicamos**.
