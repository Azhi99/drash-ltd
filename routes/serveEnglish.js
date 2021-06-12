const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/:folder/:file', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/client/en/assets/' + req.params.folder + '/' + req.params.file));
});

router.get('/:folder/:subFolder/:file', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/client/en/assets/' + req.params.folder + '/' + req.params.subFolder + '/' + req.params.file));
});

module.exports = router;