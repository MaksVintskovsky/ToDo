const form = document.querySelector('#form'),
    taskInput = document.querySelector('#taskInput'),
    emptyList = document.querySelector('#emptyList'),
    tasksList = document.querySelector('#tasksList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) => renderTask(task))
}

checkEmptyList();

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value;

    const newTask ={
        id: Date.now(),
        text: taskText,
        done: false,
    }

    tasks.push(newTask)

    renderTask(newTask)
    taskInput.value = '';
    taskInput.focus();

    // if(tasksList.children.length > 1) {
    //     emptyList.classList.add('none');
    // }
    checkEmptyList();
    saveToLocalstorage();
}

function deleteTask(e) {
    if(e.target.dataset.action !== 'delete') return ;

    const parentNode = e.target.closest('.list-group-item')

    const id = Number(parentNode.id);

    tasks = tasks.filter( (task) => task.id !== id);

    // const index = tasks.findIndex( (task) => task.id === id);
    // console.log(index)
    // tasks.splice(index, 1)

    parentNode.remove();
    
    // if(tasksList.children.length === 1) {
    //     emptyList.classList.remove('none');
    // }
    checkEmptyList();
    saveToLocalstorage();
}

function doneTask(e) {
    if(e.target.dataset.action !== 'done') return ;

    const parentNode = e.target.closest('.list-group-item');

    const id = Number(parentNode.id);

    // const task = tasks.find(function(task) {
    //     if (task.id === id) {
    //         return true
    //     }
    // })
    const task = tasks.find( (task) => task.id === id)

    task.done = !task.done
    
    saveToLocalstorage();

    const taskTitle = parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
                            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                            <div class="empty-list__title">Список дел пуст</div>
                        </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }
    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        // console.log(emptyList)
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalstorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? "task-title task-title--done" : "task-title"

    const textHTML = `
            <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                <span class="${cssClass}">${task.text}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                    </button>
                    <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                    </button>
                </div>
            </li>
    `;
    tasksList.insertAdjacentHTML('beforeend', textHTML);

}