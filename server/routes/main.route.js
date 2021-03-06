const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.module');

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM todos ORDER BY id';
    pool.query(queryText)
        .then(result => {
            console.log('result.rows', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    const queryText = `INSERT INTO todos (content) VALUES ($1)`;
    pool.query(queryText, [req.body.content])
        .then(result => {
            console.log('result.rows', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

router.put('/updateStatus', (req, res) => {
    const queryText = `UPDATE todos SET status=$1 WHERE id=$2`;
    pool.query(queryText, [req.body.status, req.body.id])
        .then(result => {
            console.log('result.rows', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res) => {
    const queryText = 'DELETE FROM todos WHERE id = $1';
    pool.query(queryText, [req.params.id])
        .then(result => {
            console.log('result.rows', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

module.exports = router;