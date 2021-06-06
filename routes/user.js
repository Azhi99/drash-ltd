const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/dbConfig');
const router = express.Router();

router.post('/addUser', async (req, res) => {
    try {
        const [u_id] = await db('tbl_users').insert({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 12),
            status: '1'
        });
        return res.status(200).send({ u_id });
    } catch (error) {
        if(error.errno == 1062) {
            return res.status(500).send({
                message: 'This username already exist'
            });
        }
    }
});

router.patch('/updateUser/:u_id', async (req, res) => {
    try {
        await db('tbl_users').where('u_id', req.params.u_id).update({
            username: req.body.username
        });
        return res.sendStatus(200);
    } catch (error) {
        if(error.errno == 1062) {
            return res.status(500).send({
                message: 'This username already exist'
            });
        }
    }
});

router.patch('/updatePassword/:u_id', async (req, res) => {
    try {
        await db('tbl_users').where('u_id', req.params.u_id).update({
            password: bcrypt.hashSync(req.body.password, 12)
        });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

router.patch('/deactiveUser/:u_id', async (req, res) => {
    const [{noOfActived}] = await db('tbl_users').where('status', '1').count('* as noOfActived');
    const [{userStatus}] = await db('tbl_users').where('u_id', req.params.u_id).select(['status as userStatus']);
    if(noOfActived > 1 && userStatus == 1) {
        await db('tbl_users').where('u_id', req.params.u_id).update({
            status: '0'
        });
        return res.sendStatus(200);
    }
    return res.status(500).send({
        message: 'You can not deactive this user'
    });
});

router.patch('/activeUser/:u_id', async (req, res) => {
    try {
        await db('tbl_users').where('u_id', req.params.u_id).update({
            status: '1'
        });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

router.delete('/deleteUser/:u_id', async (req, res) => {
    try {
        await db('tbl_users').where('u_id', req.params.u_id).delete();
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
})

module.exports = router;