// Manipulación del DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const pendingTasks = document.getElementById('taskList');
const inProgressTasks = document.getElementById('inProgressList');
const doneTasks = document.getElementById('doneList');

// Agregar nuevas tareas a la lista de pendientes
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = document.createElement('li');
        newTask.textContent = taskText;

        // Botón para mover a "En Curso"
        const moveToInProgressButton = document.createElement('button');
        moveToInProgressButton.textContent = 'En Curso';
        moveToInProgressButton.addEventListener('click', () => {
            pendingTasks.removeChild(newTask);
            inProgressTasks.appendChild(newTask);
            moveToInProgressButton.remove(); // Quitar botón "En Curso"
            newTask.appendChild(moveToDoneButton); // Agregar botón "Hecho"
            newTask.appendChild(deleteButton); // Agregar botón de eliminar
        });

        // Botón para mover a "Hecho"
        const moveToDoneButton = document.createElement('button');
        moveToDoneButton.textContent = 'Hecho';
        moveToDoneButton.addEventListener('click', () => {
            inProgressTasks.removeChild(newTask);
            doneTasks.appendChild(newTask);
            moveToDoneButton.remove(); // Quitar botón "Hecho"
        });

        // Botón para eliminar tareas
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            const parentList = newTask.parentElement;
            parentList.removeChild(newTask);
        });

        newTask.appendChild(moveToInProgressButton);
        pendingTasks.appendChild(newTask);
        taskInput.value = '';
    } else {
        alert('Por favor, escribe una tarea.');
    }
});

// Animación al agregar tareas
const observer = new MutationObserver(() => {
    const tasks = document.querySelectorAll('#taskList li, #inProgressList li, #doneList li');
    tasks[tasks.length - 1]?.classList.add('fade-in');
});

observer.observe(pendingTasks, { childList: true });
observer.observe(inProgressTasks, { childList: true });
observer.observe(doneTasks, { childList: true });
