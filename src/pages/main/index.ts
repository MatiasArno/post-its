// Subscripta al State y escucha los cambios para imprimir los pendientes (todo-items) respetando lo que el state diga sobre cada uno de los items.
// Escucha el custom event del todo-item. Escucha el evento click del checkbox para avisarle al state del cambio.
// Cada vez que el State cambia, la page se entera y vuelve a imprimir toda la lista de tareas. 

import { state } from "../../state";

export function initMain() {

    const root = document.querySelector('.root') as HTMLElement;
    
    root.innerHTML = `
        <h1 class="main-title">PENDIENTES</h1>
    
        <form class="form">
            <input name="field" type="text" class="input-field">
            <button type="submit" class="submit-btn">Add</button>
        </form>
        
        <div class="tasks-list"></div>
    `;

    const tasksListEl = root.querySelector('.tasks-list') as HTMLElement;

    state.subscribe(() => renderTasksList());
        
    const form = root.querySelector('.form') as HTMLFormElement;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.setState(updateState(form.field.value));        
        form.field.value = "";     
    });

    function renderTasksList() {
        const stateTasks = state.getState().tasks as Object[];
        tasksListEl.innerHTML = `<div> ${stateTasks.map((t: any) => `<todo-item class="todo-item" state="${t.state}" content="${t.content}" id="${t.id}"></todo-item>`).join("")} </div>`;

        const tasksArray = root.querySelectorAll('.todo-item');
        tasksArray.forEach((task, i) => {
            task.addEventListener("item-deleted", () => {
                const stateTasks = state.getState() as Object[];
                console.log(task.getAttribute('id'), "CUSTOM EVENT");
            });
            task.addEventListener("item-checked", (e: any) => {
                const task = e.target as HTMLElement;
                const taskStatus = e.detail;
                taskStatus == true ? state.updateTaskStatus(task, "checked") : state.updateTaskStatus(task, "init");        // DESDE EL STATE SE GUARDA EN LOCAL STORAGE.  
            });
        });
    }    

    function updateState(itemContent: String) {
        const currentState = state.getState();        
        const newState = {
            ...currentState,
            tasks: [...currentState.tasks, {
                id: currentState.tasks.length < 1 ? 1 : (currentState.tasks.length + 1),
                state: "init",
                content: itemContent
            }]          
        }
        return newState;
    }
}