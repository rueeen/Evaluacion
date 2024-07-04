console.log("Conectando js");

const tareas = [];

const formulario = document.querySelector('#formulario');
const title_error = document.querySelector('#title-error');
const description_error = document.querySelector('#description-error');

title_error.innerHTML = '';
description_error.innerHTML = '';

console.log(formulario);

formulario.addEventListener('submit', function (e) {
    console.log('Haciendo click');
    e.preventDefault();

    const title = formulario['title'].value;
    const description = formulario['description'].value;
    const existe = tareas.find(t => t.title === title);

    console.log(title, description);

    if (title.trim() === '') {
        title_error.innerHTML = 'Campos vacios';
    }
    else if (description.trim() === '') {
        description_error.innerHTML = 'Campos vacios';
    } else {
        if (existe) {
            alert('Tarea ya existe');
        }
        else {
            const task = {
                title: title,
                description: description,
                completed: false
            }
            tareas.push(task);
            alert('Se agrego tarea');
            formulario['title'].value = '';
            formulario['description'].value = '';
            cargar_tarea()
        }
    }

    setInterval(() => {
        title_error.innerHTML = '';
        description_error.innerHTML = '';
    }, 3000);
});

const cuerpo_tarea = document.querySelector('#tareas');
console.log(cuerpo_tarea);

function completar_tarea(title){
    const t = tareas.find(t => t.title === title);
    if(t){
        t.completed = !t.completed;
        cargar_tarea();
    }
}

function cargar_tarea() {
    cuerpo_tarea.innerHTML = '';
    tareas.forEach(function(t) {
        if (t.completed) {
            cuerpo_tarea.innerHTML += `<div class="card mb-2">
                                            <div class="d-flex align-items-center">
                                                <div class="card-body">
                                                    <!--Datos tarea-->
                                                    <h5 class="card-title">${t.title}</h5>
                                                    <p class="card-text text-decoration-line-through">${t.description}</p>
                                                </div>
                                                <div class="form-check p-2">
                                                    <input class="form-check-input" type="checkbox" onchange="completar_tarea('${t.title}')" checked>
                                                    <label class="form-check-label">
                                                        Completa
                                                    </label>
                                                </div>
                                            </div>
                                        </div>`;
        } else {
            cuerpo_tarea.innerHTML += `<div class="card mb-2">
                                            <div class="d-flex align-items-center">
                                                <div class="card-body">
                                                    <!--Datos tarea-->
                                                    <h5 class="card-title">${t.title}</h5>
                                                    <p class="card-text">${t.description}</p>
                                                </div>
                                                <div class="form-check p-2">
                                                    <input class="form-check-input" type="checkbox" onchange="completar_tarea('${t.title}')">
                                                    <label class="form-check-label">
                                                        Completa
                                                    </label>
                                                </div>
                                            </div>
                                        </div>`;
        }
    });
}

window.addEventListener('load', function(){
    cargar_tarea()
});