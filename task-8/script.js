// DOM Elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const tasksCounter = document.getElementById('tasks-counter');
const clearCompletedBtn = document.getElementById('clear-completed');
const filters = document.querySelectorAll('.filter');

// App State
let tasks = [];
let currentFilter = 'all';

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    } else {
        showEmptyState();
    }
});

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(newTask);
    taskInput.value = '';
    
    saveTasks();
    renderTasks();
}

// Toggle task completion status
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    saveTasks();
    renderTasks();
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    
    saveTasks();
    renderTasks();
}

// Clear all completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    
    saveTasks();
    renderTasks();
}

// Filter tasks based on their status
function filterTasks(filter) {
    currentFilter = filter;
    
    // Update active filter UI
    filters.forEach(filterBtn => {
        if (filterBtn.getAttribute('data-filter') === filter) {
            filterBtn.classList.add('active');
        } else {
            filterBtn.classList.remove('active');
        }
    });
    
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Show empty state when there are no tasks
function showEmptyState() {
    taskList.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-clipboard-list"></i>
            <p>No tasks yet! Add a task to get started.</p>
        </div>
    `;
    tasksCounter.textContent = '0 tasks left';
}

// Render tasks based on the current filter
function renderTasks() {
    let filteredTasks;
    
    switch (currentFilter) {
        case 'active':
            filteredTasks = tasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = tasks.filter(task => task.completed);
            break;
        default:
            filteredTasks = [...tasks];
    }
    
    if (tasks.length === 0) {
        showEmptyState();
        return;
    }
    
    // Clear the task list
    taskList.innerHTML = '';
    
    // Create task elements
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        taskItem.innerHTML = `
            <div class="task-checkbox ${task.completed ? 'checked' : ''}"></div>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        
        // Add event listeners to task elements
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('click', () => toggleTask(task.id));
        
        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        taskList.appendChild(taskItem);
    });
    
    // Update tasks counter
    const activeTasks = tasks.filter(task => !task.completed).length;
    tasksCounter.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
}

// Event Listeners
addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        const filterType = filter.getAttribute('data-filter');
        filterTasks(filterType);
    });
});