const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const usuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: String,
    expira: Date
});

// Hashear Passwords
usuariosSchema.pre('save', async function (next) {
    // Si el Password ya está Hasheado
    if (!this.isModified('password')) {
        return next();
    }
    // Si No está Hasheado
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});

module.exports = mongoose.model('Usuarios', usuariosSchema);
