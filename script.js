// Manipulación del DOM
const colorButton = document.getElementById('colorButton');
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const pendingTasks = document.getElementById('taskList');
const inProgressTasks = document.getElementById('inProgressList');

// Cambiar el color de fondo al azar
colorButton.addEventListener('click', () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
});

// Agregar nuevas tareas a la lista de pendientes
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = document.createElement('li');
        newTask.textContent = taskText;

        // Botón para mover a "En Curso"
        const moveButton = document.createElement('button');
        moveButton.textContent = 'En Curso';
        moveButton.addEventListener('click', () => {
            pendingTasks.removeChild(newTask);
            inProgressTasks.appendChild(newTask);
            moveButton.remove(); // Quitar botón "En Curso"
            newTask.appendChild(deleteButton); // Agregar botón de eliminar
        });

        // Botón para eliminar tareas
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            const parentList = newTask.parentElement;
            parentList.removeChild(newTask);
        });

        newTask.appendChild(moveButton);
        pendingTasks.appendChild(newTask);
        taskInput.value = '';
    } else {
        alert('Por favor, escribe una tarea.');
    }
});

// Animación al agregar tareas
const observer = new MutationObserver(() => {
    const tasks = document.querySelectorAll('#taskList li, #inProgressList li');
    tasks[tasks.length - 1]?.classList.add('fade-in');
});

observer.observe(pendingTasks, { childList: true });
observer.observe(inProgressTasks, { childList: true });

// CSS para animación de las tareas
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    button {
        margin-left: 10px;
        background-color: #6200ea;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
    }

    button:hover {
        background-color: #3700b3;
    }
`;
document.head.appendChild(style);
