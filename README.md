<img src="https://www.silenzine.com/wp-content/uploads/2017/06/rick-morty-header.jpg" alt="RickAndMorty" />

<br>

> # **RICK AND MORTY | First Project**

<br>

> ## **FUNCIONAMIENTO**

En el siguiente aplicativo se puede:

-    Buscar personajes.
-    Ver detalles de cada personaje.
-    Iniciar Sesión.
-    Elegir Personajes Favoritos.
-    Filtrar por Status y Gender.
-    Ordenar por nombre.

<br>

---

<br>

> ## **BASE DE DATOS**

Consta de la una base de datos llamada _`db_rickandmmorty`_ y dos modelos: _`Users`_ y _`Favorites`_ relacionados de muchos a muchos.

> ### _📍 MODELS:_

#### _📍 Users_

-    ID \*
-    Name \*
-    Email \*
-    Password \*

#### _📍 Favorites_

-    ID \*
-    Name \*
-    Status \*
-    Gender \*
-    Image \*
-    Species \*
-    Origin \*
-    Location \*

<br>

---

<br>

> ## **BACK-END**

El back-end consta de la siguientes carpetas:

-    📁 src
     -    📁 controllers
     -    📁 middlewares
     -    📁 models
     -    📁 routes
     -    📄 app
     -    📄 db
-    📁 tests (aun no tiene tests)

> ### _📌 RUTAS A USAR_

-    **GET https://rickandmortyapi.com/api/character**

> ### _📌 RUTAS A REALIZAR_

-    **GET http://localhost:4001/rick-and-morty/login**
-    **POST http://localhost:4001/rick-and-morty/login?=email&=password**
-    **GET http://localhost:4001/rick-and-morty/characters**
-    **GET http://localhost:4001/rick-and-morty/characters?=name**
-    **GET http://localhost:4001/rick-and-morty/characters/:idCharacter**
-    **POST http://localhost:4001/rick-and-morty/favorites**
-    **DELETE http://localhost:4001/rick-and-morty/favorites/:idCharacter**

<br>

---

<br>

> ## **FRONT-END**

> ### _💻 PAGINAS DEL SITIO_

#### _🏠 HOME PAGE_

-    Muestra todos los personajes.

#### _♦ DETAIL PAGE_

-    Muestra información detallada de un personaje.

#### _♥ FAVORITE PAGE_

-    Muestra todos los personajes favoritos de cada usuario.

> ### _⚙ COMPONENTES_

#### _🗃 Navbar_

-    Muestra la barra de navegación.

#### _🔍 Searchbar_

-    Permite ingresar una cadena para buscar personajes por nombres.

#### _🏷 Filters_

-    Permite filtrar por `Status` y `Gender` y ordenar por `Name`.

#### _▶ Paginate_

-    Sirve para pasar por paginas de 8 personajes cada uno.

<br>

---

<br>

<img src="https://images3.alphacoders.com/812/812062.png" alt="RickMorty" />
