const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.module');

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM todos';
    pool.query(queryText)
        .then(result => {
            console.log('result.rows', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('err', err);
            res.sendStatus(500);
        });
});

module.exports = router;