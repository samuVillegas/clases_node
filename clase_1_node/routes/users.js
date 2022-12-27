const express = require('express');
const users = express.Router();
const fs = require('fs')
//Servicio 1: Obtener todos los usuarios
users.get('/', (req, res) => {
    try {
        //Obtener datos
        const json = fs.readFileSync(__dirname+'/../data/info.json', 'utf8'); //Leer archivo
        const data = JSON.parse(json); // Convertir a Objeto para manejarlo en JS
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('ERROR');
    }
})

//Servicio 2: Obtener usuario por id
users.get('/:id', (req, res) => {
    try {
        const { id } = req.params; //Obtener parametro
        const json = fs.readFileSync('data/info.json', 'utf8'); //Leer archivo
        const data = JSON.parse(json); // Convertir a Objeto para manejarlo en JS
        const user = data.filter(item => item.id === parseInt(id));
        if (user.length > 0) {
            //Hay usuario con el id 
            res.send(user[0]);
        } else {
            //No hay usuarios con el id
            res.status(204).send()
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('ERROR');
    }
})

//Servicio 3: Crear usuario
users.post('/', (req, res) => {
    try {
        const { id, nickname, email, password } = req.body;
        const json = fs.readFileSync('data/info.json', 'utf8'); //Leer archivo
        const data = JSON.parse(json); // Convertir a Objeto para manejarlo en JS
        data.push({ id, nickname, email, password });
        fs.writeFileSync('data/info.json', JSON.stringify(data)); //Guardar archivo
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(500).send('ERROR');
    }
})

//Servicio 4: Actualizar usuario
users.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { nickname, email, password } = req.body;
        const json = fs.readFileSync('data/info.json', 'utf8'); //Leer archivo
        const data = JSON.parse(json); // Convertir a Objeto para manejarlo en JS
        let indice = -1;
        data.map((item, index) => {
            if (item.id === parseInt(id)) {
                indice = index;
            }
        });
        if (indice !== -1) {
            //Hay usuario con el id procedo a actualizar
            data[indice] = {
                id: parseInt(data[indice].id),
                nickname,
                email,
                password
            }
            fs.writeFileSync('data/info.json', JSON.stringify(data)); //Guardar archivo
            res.send(data[indice]);
        } else {
            //No hay usuarios con el id
            res.status(432).send("No hay usuarios con el id enviado")
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('ERROR');
    }
})

//Servicio 5: Eliminar usuario
users.delete('/:id', (req, res) => {
    const { id } = req.params;
    const json = fs.readFileSync('data/info.json', 'utf8'); //Leer archivo
    const data = JSON.parse(json); // Convertir a Objeto para manejarlo en JS
    const new_users = data.filter(item => item.id !== parseInt(id));
    fs.writeFileSync('data/info.json', JSON.stringify(new_users)); //Guardar archivo
    res.send('User deleted');
})

module.exports = users;