
const express = require('express');
const router = express.Router();
const db = require('../models/database');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false})); //req.body now has form data from header

router.get('/', (req,res) => {
  
    res.render('index')
})


router.get('/api', (req, res) => {
    db.query('SELECT * from todos ORDER BY id')
        .then((response) => {
            res.json(response)
        })
    //return all of the current todos (as json object)
})


router.post('/api', (req, res) => {
    //insert a todo

    let item = req.body.item;

    db.none(`INSERT INTO todos VALUES (DEFAULT, $1)`, [item])
        .then((result) => {
            // console.log(result);
            db.query('SELECT * from todos ORDER BY id')
            .then((response) => {
                res.json(response)
        })
        })
        .catch(error => {
            console.log(error);
            db.query('SELECT * from todos ORDER BY id')
            .then((response) => {
                res.json(response)
        })
        })
    
})

router.patch('/api/:description/:id', (req, res) => {
    //update a todo description

    // console.log('Button Press transmitted');
    let id = parseInt(req.params.id);
    let description = req.params.description
    // console.log(id);
    // console.log(description);

    db.none(`UPDATE todos SET description = '${description}' WHERE id = ${id}`)
        .then((result) => {
            // console.log(result);
            db.query('SELECT * from todos ORDER BY id')
            .then((response) => {
                res.json(response)
        })
        })
        .catch(error => {
            console.log(error);
            db.query('SELECT * from todos ORDER BY id')
            .then((response) => {
                res.json(response)
        })
        })
   
})



router.delete('/api/:id', (req, res) => {
    let id = req.params.id;

    db.none(`DELETE FROM todos WHERE id = ${id}`)
        .then((result) => {
            // console.log(result);
            db.query('SELECT * from todos ORDER BY id')
            .then((response) => {
                res.json(response)
        })
        })
        .catch(error => {
            console.log(error);
            db.query('SELECT * from todos ORDER BY id')
            .then((response) => {
                res.json(response)
        })
        })
    
})

router.delete('/api/all', (req, res) => {
    //deletes all entries
    
})

module.exports = router;