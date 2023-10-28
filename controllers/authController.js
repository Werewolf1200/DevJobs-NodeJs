const passport = require('passport');
const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/administracion',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

// Revisar si el Usuario está Autenticado
exports.verificarUsuario = (req, res, next) => {
    
    // Revisar el Usuario
    if (req.isAuthenticated()) { // Passport method
        return next();
    }

    // Redireccionar
    res.redirect('/iniciar-sesion');
}

exports.mostrarPanel = async (req, res) => {

    // Consultar el usuario autenticado
    const vacantes = await Vacante.find({ autor: req.user._id }).lean();

    res.render('administracion', {
        nombrePagina: 'Panel de Administración',
        tagline: 'Crea y Administra tus vacantes desde aquí',
        cerrarSesion: true,
        nombre: req.user.nombre,
        vacantes
     })
}
 
exports.cerrarSesion = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
            req.flash('correcto', 'Cerraste Sesión Correctamente');
            return res.redirect('/iniciar-sesion');
    });
}