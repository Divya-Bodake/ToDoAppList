document.getElementById('task-form').addEventListener('submit', addTask);
document.getElementById('task-list').addEventListener('click', handleTaskAction);

function addTask(event) {
    event.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskDesc = document.getElementById('task-desc').value;

    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName, description: taskDesc })
    })
    .then(response => response.json())
    .then(task => {
        appendTask(task);
        document.getElementById('task-form').reset();
    });
}

function appendTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `${task.name} - ${task.description}
                    <span>
                        <button class="complete">Complete</button>
                        <button class="delete">Delete</button>
                    </span>`;
    document.getElementById('task-list').appendChild(li);
}

function handleTaskAction(event) {
    const target = event.target;
    const taskId = target.closest('li').getAttribute('data-id');

    if (target.classList.contains('complete')) {
        target.closest('li').classList.toggle('completed');
    } else if (target.classList.contains('delete')) {
        fetch(`http://localhost:3000/tasks/${taskId}`, { method: 'DELETE' })
            .then(() => target.closest('li').remove());
    }
}

function loadTasks() {
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(tasks => tasks.forEach(appendTask));
}

loadTasks();
