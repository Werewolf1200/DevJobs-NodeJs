const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    });
}

// Agrega las Vacantes a la base de Datos
exports.agregarVacante = async (req, res) => {
    const vacante = new Vacante(req.body);

    // Crear el Array de Skills
    vacante.skills = req.body.skills.split(',');
    
    // Almacenar vacante en la Base de Datos
    const nuevaVacante = await vacante.save();

    // Redireccionar
    res.redirect(`/vacantes/${nuevaVacante.url}`);
}