const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vancantes gratis, solo debes crear una cuenta'
    });
}

// Validar Formulario
exports.validarRegistro = (req, res, next) => {

    // Sanitizar Datos
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('password').escape();
    req.sanitizeBody('confirmar').escape();

    // Validar
    req.checkBody('nombre', 'El nombre es obligatorio').notEmpty();
    req.checkBody('email', 'El email debe ser valido').isEmail();
    req.checkBody('password', 'El password no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'Confirmar password no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password);

    const errores = req.validationErrors();

    if (errores) {
        // Si hay errores
        req.flash('error', errores.map(error => error.msg));

        res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en devJobs',
            tagline: 'Comienza a publicar tus vancantes gratis, solo debes crear una cuenta',
            mensajes: req.flash()
    });
        return;
    }

    // Si la validación es correcta
    next();
}

exports.crearUsuario = async (req, res, next) => {
    // Crear el usuario
    const usuario = new Usuarios(req.body);

    try {
        await usuario.save();
        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error);
        res.redirect('/crear-cuenta');
    }
}

// Formulario para Iniciar Sesión
exports.formIniciarSesion = (req, res) => {
    res.render('iniciar-sesion', {
        nombrePagina: 'Iniciar Sesión devJobs'
    })
}

// Editar Perfil
exports.formEditarPerfil = (req, res) => {
    res.render('editar-perfil', {
        nombrePagina: 'Edita tu Perfil en devJobs',
        usuario: req.user.toObject(),
        cerrarSesion: true,
        nombre: req.user.nombre
    })
}

exports.editarPerfil = async (req, res) => {
    const usuario = await Usuarios.findById(req.user._id);

    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;

    if (req.body.password) {
        usuario.password = req.body.password
    }

    await usuario.save();

    req.flash('correcto', 'Cambios Guardados Correctamente');

    res.redirect('/administracion');
}