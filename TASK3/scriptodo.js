document.addEventListener('DOMContentLoaded', function () {
    // Check if there are saved tasks in localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    // Load saved tasks to the UI
    savedTasks.forEach(task => {
        addTaskToUI(task);
    });

    // Event listener for adding a task
    document.getElementById('taskInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = { text: taskText, completed: false };

        // Add task to UI
        addTaskToUI(task);

        // Save tasks to localStorage
        saveTasksToLocalStorage();

        // Clear input field
        taskInput.value = '';
    }
}

function addTaskToUI(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button onclick="toggleTaskStatus(this)">Done</button>
        <button onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(li);
}

function toggleTaskStatus(button) {
    const li = button.parentNode;
    const span = li.querySelector('span');
    span.classList.toggle('completed');

    // Update tasks in localStorage
    saveTasksToLocalStorage();
}

function removeTask(button) {
    const li = button.parentNode;
    li.remove();

    // Update tasks in localStorage
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    // Iterate through list items and save to tasks array
    taskList.querySelectorAll('li').forEach(li => {
        const taskText = li.querySelector('span').textContent;
        const completed = li.querySelector('span').classList.contains('completed');
        tasks.push({ text: taskText, completed: completed });
    });

    // Save tasks array to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    function completeTask(index) {
        tasks[index].completed = true;
        updateLists();
    }
   

}
