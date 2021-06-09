const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/dashboard/emails.html'));
});

router.get('/:pageName', (req, res) => {
    const file = path.join(__dirname, '../public/dashboard/' + req.params.pageName + '.html');
    if(fs.existsSync(file)){
        return res.sendFile(file);
    }
});

module.exports = router;