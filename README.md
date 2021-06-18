# BasarsoftInternShip
<div align="justify">
This project belongs to my internship at Basarsoft, which works on the geographic information systems.

When program starts, Turkey map appears. We can add door or neighborhood to the map. Both of them are vector. Door is point, neighborhood is polygon. 

In the main page there are some buttons. First of this button is add door. When you click this button you can draw a point on the map. After this jspanel appears. In this panel, we can see coordinates of clicked place and we can add door number to this point also we can add neighborhood to map using add neighborhood button. When we click this button we can draw the polygon on the map and save this neighborhood to the database. 
When program starts saved neighborhoods and doors appears on the map. Also we can do updae and delete operations about theese. For example we can change neighborhood location after that this changes reflect to the database. 

## Backend
This application was made with .Net 5 MVC in visual studio. I used MSSQL for database and code first approach. Entity Framework used to access MSSQL. The program is abstracted in itself. Project has models folder for entities, datacontext folder for database connection, dataaccess folder for access the database and business folder to write rules about neighborhood and doors. I used these operations in the controller. Therefore The program is abstracted in itself and Loose coupling. So When we change something other objects will not be affected so much. I used OOP, Design Patterns and SOLID principles in this project.
</div>
