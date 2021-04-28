# backend-project-1


Skolprojekt -
Övning i att bygga en SQL databas med Express & Sequalize.



Endpoints

Method
Path
Kommentar
POST
/register
Skapar en ny användare
POST
/auth
Loggar in och får tillbaka en JWT
GET
/ingredients
Listar ingredienser paginerat. Denna endpoint ska även ha en sökfunktion med hjälp av en query-param “filter”.
POST
/recipes
Skapar ett nytt recept. Endast tillgänglig för ägaren.
PATCH
/recipes/:id
Uppdaterar ett recept Endast tillgänglig för ägaren.
DELETE
/recipes/:id
Tar bort ett recept. Endast tillgänglig för ägaren.
GET
/recipes
Hämtar recept paginerat. Denna endpoint ska även ha en sökfunktion med hjälp av en query-param “filter”
GET
/recipes/:id
Hämtar ett specifikt recept

