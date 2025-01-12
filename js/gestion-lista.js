// Form
const form = document.getElementById("form-tarea");
const inputTarea = document.getElementById("input-tarea");
const listaTareas = document.getElementById("to-do");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtenemos el texto;
    const tarea = inputTarea.value;

    // Crear tarea
    crearTarea(tarea);

    inputTarea.value = "";
});

// Crear tarea
function crearTarea(texto, completada = false) {
    const tareali = document.createElement("li");
    tareali.classList.add('flex', 'items-center', 'justify-between');

    const tareaDiv = document.createElement("div");
    tareaDiv.classList.add('flex', 'items-center', 'space-x-3');

    const inputTarea = document.createElement("input");
    inputTarea.classList.add('form-checkbox', 'h-5', 'w-5', 'text-purple-600', 'rounded', 'bg-gray-700', 'border-gray-600');
    inputTarea.type = "checkbox";
    inputTarea.checked = completada;

    const textoSpan = document.createElement("span");
    textoSpan.textContent = texto;

    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add('text-red-400', 'hover:text-red-300', 'transition-colors', 'duration-200');

    const iconDelete = document.createElement("i");
    iconDelete.setAttribute("data-lucide", "trash-2");
    iconDelete.classList.add('w-5', 'h-5');

    tareali.appendChild(tareaDiv);
    tareaDiv.appendChild(inputTarea);
    tareaDiv.appendChild(textoSpan);
    tareali.appendChild(buttonDelete);
    buttonDelete.appendChild(iconDelete);

    listaTareas.appendChild(tareali);

    // Guardamos las tareas cada vez que se agrega una nueva
    guardarTareas();

    // Animación para el nuevo elemento (opcional)
    setTimeout(() => {
        tareali.classList.remove('opacity-0');
        tareali.classList.add('opacity-100');
        tareali.classList.remove('scale-95');
    }, 100);

    lucide.createIcons();  
}

// Añadir línea una vez completada
listaTareas.addEventListener('change', (event) => {
    if (event.target && event.target.type === 'checkbox') {
        const textoSpan = event.target.closest('li').querySelector('span');
        if (event.target.checked) {
            textoSpan.classList.add('line-through', 'text-gray-500');
        } else {
            textoSpan.classList.remove('line-through', 'text-gray-500');
        }
        // Guardar cambios al marcar o desmarcar la tarea
        guardarTareas();
    }
});

// Guardar tareas en localStorage
function guardarTareas() {
    const tareas = [];
    document.querySelectorAll('#to-do li').forEach((li) => {
        const tarea = {
            texto: li.querySelector('span').textContent,
            completada: li.querySelector('input').checked,
        };
        tareas.push(tarea);
    });
    localStorage.setItem('tareas', JSON.stringify(tareas)); // Guardamos las tareas en el localStorage
}

// Eliminar tareas
listaTareas.addEventListener('click', (event) => {
    // Comprobamos si el botón de eliminar fue clicado
    if (event.target && event.target.closest('button')) {
        const tareaLi = event.target.closest('li'); // Obtener el <li> de la tarea
        tareaLi.remove(); // Eliminar la tarea (el <li>)

        // Actualizamos el localStorage después de eliminar la tarea
        guardarTareas();
    }
});

// Cargar tareas desde el localStorage
function cargarTareas() {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'));
    if (tareasGuardadas) {
        tareasGuardadas.forEach((tarea) => {
            crearTarea(tarea.texto, tarea.completada);
        });
    }
}

// Cargar tareas al inicio
document.addEventListener("DOMContentLoaded", () => {
    cargarTareas(); // Cargamos las tareas cuando la página se carga
});
