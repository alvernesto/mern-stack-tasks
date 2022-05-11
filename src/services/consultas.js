const pool = require('./conexion');

//guardar | create | POST
const guardar_tarea = async(datos) => {
    const SQLQuery = {
        text: "INSERT INTO tasks(title, description) values($1, $2) RETURNING *;", //id is SERIAL
        values: datos,
    };
    try {
        const result = await pool.query(SQLQuery);
        console.log("que chucha pasa: ", result);
        return result.rowCount;
    } catch (e) {
        console.log(e.detail);
        return e;
    }
}

//buscar | read | GET
async function buscar_tarea(datos) {
    const SQLQuery = {
        text: "SELECT id, title, description FROM tasks WHERE id = $1", //id is SERIAL
        values: datos,
    };
    try {
        const result = await pool.query(SQLQuery);
        console.log("result: ", result);
        return [result.rowCount, result.rows];
    } catch (e) {
        console.log(e.detail);
        return e;
    }
}

//consultar | read | GET
const consultar_tareas = async() => {
    try {
        const result = await pool.query("SELECT * FROM tasks;");
        return result.rows;
    } catch (e) {
        console.log(e.detail);
        return e;
    }
};

//editar | update | PUT o patch eventualmente

const editar_tarea = async(datos) => {
    const SQLQuery = {
        text: 'UPDATE tasks SET title = $2, description = $3 WHERE id = $1 RETURNING * ;',
        values: datos,
    };
    try {
        const result = await pool.query(SQLQuery);
        return result.rowCount;
    } catch (e) {
        console.log(e.detail);
        return e;
    }
}

//eliminar | delete | DELETE
const eliminar_tarea = async(datos) => {
    const SQLQuery = {
        text: 'DELETE FROM tasks WHERE id = $1;',
        values: datos,
    }
    try {
        const result = await pool.query(SQLQuery);
        return result.rowCount;
    } catch (e) {
        console.log(e.detail);
        return e;
    }
}

exports.guardar_tarea = guardar_tarea;
exports.buscar_tarea = buscar_tarea;
exports.consultar_tareas = consultar_tareas;
exports.editar_tarea = editar_tarea;
exports.eliminar_tarea = eliminar_tarea;