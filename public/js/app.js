document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.lista-conocimientos');

    if (skills) {
        skills.addEventListener('click', agregarSkills);

        // Al Editar, llamar función
        skillsSeleccionados();
    }
});

const skills = new Set();

const agregarSkills = e => {
    if (e.target.tagName === 'LI') {
        if (e.target.classList.contains('activo')) {
            // Quitarlo del Set y quitar la Clase
            skills.delete(e.target.textContent);
            e.target.classList.remove('activo');
        } else {
            // Agregarlo al Set y agregar la Clase
            skills.add(e.target.textContent);
            e.target.classList.add('activo');
        }
    }

    const skillsArray = [...skills];
    document.querySelector('#skills').value = skillsArray;
}

const skillsSeleccionados = () => {
    const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));

    seleccionadas.forEach(seleccionada => {
        skills.add(seleccionada.textContent);
    })

    // Inyectarlo en el Hidden
    const skillsArray = [...skills];
    document.querySelector('#skills').value = skillsArray;
}