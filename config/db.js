const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

mongoose.connection.on('error', (error) => {
    console.log(error)
})