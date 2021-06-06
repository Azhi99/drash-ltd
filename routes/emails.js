const db = require('../db/dbConfig.js')
const express = require('express')
const router = express.Router()

router.post('/addEmail', async(req,res) => {
    try {
        const [addEmail] = await db('tbl_emails').insert({
            full_name: req.body.full_name,
            phone: req.body.phone,
            email: req.body.email,
            description: req.body.description,
            recived_date: new Date().toISOString().split('T')[0],
            seen_status: req.body.seen_status
        })

        return res.status(200).send()
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.patch('/updateEmail/:e_id', async(req,res) => {
    try {
        await db('tbl_emails').where('e_id', req.params.e_id).update({
            full_name: req.body.full_name,
            phone: req.body.phone,
            email: req.body.email,
            description: req.body.description,
            recived_date: new Date().toISOString().split('T')[0],
            seen_status: req.body.seen_status
        })

        return res.status(200).send()
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.delete('/deleteEmail/:e_id', async(req,res) => {
    try {
        await db('tbl_emails').where('e_id', req.params.e_id).delete()
         return res.status(200).send()
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.get('/allEmails', async(req,res) => {
    try {
        const allEmails = await db('tbl_emails').select('*')
         return res.status(200).json({
             allEmails
         })
    } catch (error) {
        
    }
})

module.exports = router