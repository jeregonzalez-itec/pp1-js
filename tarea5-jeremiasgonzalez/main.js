
const inputTask  = document.getElementById("inputTask");
const taskList = document.getElementById("taskList");
const buttonMode = document.getElementById("toggleMode")
const darkMode = document.getElementsByClassName("bg-white")
buttonMode.addEventListener("click", () => {
    for (let modo of darkMode) {
        modo.classList.toggle("bg-white");
        modo.classList.toggle("dark");
    }
    console.log("ok");
});
inputTask.addEventListener("keydown",(event) =>{ 
        if (event.key === "Enter"){
            agregarTarea()
            inputTask.value='';
        }
});


function agregarTarea () {
    const taskText = inputTask.value.trim();
    if(taskText === "") return alert('La tarea no puede estar vacia.');
    
    const tarea = document.createElement ('li');
    tarea.classList.add(
        'bg-white',
        'text-gray-900',
         'rounded-xl',
         'w-90',
         'h-10',
         'py-1',
           "my-5",
        'px-5',
        'text-xl');
    const span = document.createElement("span");
    span.textContent = taskText; 
    const completada = () =>{
        span.classList.add(
        'bg-white',
        'text-gray-900',
         'rounded-xl',
         'w-90',
         'h-10',
         'py-1',
        'px-5',
        'text-xl',
        'line-through');
    }
    
    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("text-red-500", "hover:text-red-700", "focus:outline-none");
    buttonDelete.innerHTML = `<svg width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
    </svg>`;

    const deleteTask = () =>{
        tarea.remove();
    };
    
    buttonDelete.addEventListener('click',deleteTask);
    tarea.appendChild(span);
    tarea.addEventListener('click',completada);  
    tarea.appendChild(buttonDelete);
    taskList.appendChild(tarea);
    setTimeout(1000);
}
