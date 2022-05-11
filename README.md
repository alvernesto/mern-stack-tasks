# mern-stack-tasks
Client and server app + To do list app + React js + Express js + Pgadmin + taks's CRUD
+ cmd create data base with Pgadmin with your own password (conexion.js): 'tasks_db'
+ cmd create table: 
    CREATE TABLE tasks(
      id SERIAL,
      title VARCHAR(25),
      description VARCHAR(50),
      PRIMARY KEY(id)
    );
+ cmd set a new task : INSERT INTO tasks(title, description) values('eat', 'eat a lot') RETURNING *;
+ cmd start client app: npm run webpack
+ cmd start server app: npm run dev

