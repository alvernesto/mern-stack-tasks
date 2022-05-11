//operaciones de URL que disponibiliza el servidor
const express = require('express');
//const task = require('../models/task');
const bd_function = require('../services/consultas');
const router = express.Router();

// GET | READ |
router.get('/tareas', async(req, res) => {
    try {
        const response = await bd_function.consultar_tareas();
        res.json(response);
    } catch (e) {
        console.log("error: ", e.detail);
    }
});

// GET | READ |
router.get('/tareas/:id', async(req, res) => {
    const id = req.params.id;
    let datos = [id];
    try {
        const response = await bd_function.buscar_tarea(datos);
        //console.log("response desde task.routes: ", response);
        if (response[0] > 0) {
            console.log("tu busqueda: ", response[1]);
            res.json(response[1]);
        } else {
            console.log("No se ha podido encontrar");
            res.json({
                message: "Tarea no se ha podido encontrar"
            });
        }
    } catch (e) {
        console.log("error: ", e.detail);
    }
});

// POST | CREATE |
router.post("/tareas", async(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    let datos = [title, description];
    try {
        const rowCount = await bd_function.guardar_tarea(datos);
        if (rowCount > 0) {
            console.log("¡Tarea guardado con éxito!");
            res.json({
                message: "¡Tarea guardado con éxito!"
            });
        } else {
            concole.log("Tarea no se ha podido guardar");
            res.json({
                message: "Tarea no se ha podido guardar"
            });
        }
    } catch (e) {
        console.log("error: ", e.detail);
    }
});

// PUT | UPDATE |
router.put("/tareas/:id", async(req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    let datos = [id, title, description];
    try {
        const rowCount = await bd_function.editar_tarea(datos);
        if (rowCount > 0) {
            console.log("La actualización se ha efectuado correctamente");
            res.json({
                message: "¡Tarea actualizada con éxito!"
            });
        } else {
            console.log("No se ha podido actualizar");
            res.json({
                message: "Tarea no se ha podido actualizar"
            });
        }
    } catch (e) {
        console.log("error: ", e.detail);
    }
});

// DELETE | DELETE | 
router.delete("/tareas/:id", async(req, res) => {
    const id = req.params.id;
    let datos = [id];
    try {
        const rowCount = await bd_function.eliminar_tarea(datos);
        if (rowCount > 0) {
            console.log("La eliminación se ha efectuado correctamente");
            res.json({
                message: "¡Tarea eliminada con éxito!"
            });
        } else {
            console.log("No se ha podido eliminar");
            res.json({
                message: "Tarea no se ha podido eliminar"
            });
        }
    } catch (e) {
        console.log("error: ", e.detail);
    }
});

module.exports = router;