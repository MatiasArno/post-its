// Subscripta al State y escucha los cambios para imprimir los pendientes (todo-items) respetando lo que el state diga sobre cada uno de los items.
// Escucha el custom event del todo-item. Escucha el evento click del checkbox para avisarle al state del cambio.
// Cada vez que el State cambia, la page se entera y vuelve a imprimir toda la lista de tareas. 

import { state } from "../../state";

export function initMain() {

    const root = document.querySelector('.root') as HTMLElement;
    
    root.innerHTML = `
        <h1 class="main-title">MAIN PAGE</h1>
    
        <form class="form">
            <input name="field" type="text">
            <button type="submit">Add</button>
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

        const tasksArray = root.querySelectorAll('.todo-item');
        
        tasksArray.forEach((i) => {
            i.addEventListener("item-deleted", () => {
                console.log("ITEM DELETED EVENT");
                console.log(state.getSavedState());
            });

            i.addEventListener("item-checked", (e) => {
                const task = e.target as HTMLElement;
                const taskStatus = e.detail;
                taskStatus == true ? state.updateTaskStatus(task, "checked") : state.updateTaskStatus(task, "init");
                console.log(task, "ITEM CHECKED");
            });
        });
    });

    function renderTasksList() {
        tasksListEl.innerHTML = `<div> ${state.getState().tasks.map((t: any) => `<todo-item class="todo-item" state="${t.state}" content="${t.content}" id="${t.id}"></todo-item>`).join("")} </div>`;
    }    

    function updateState(itemContent: string) {
        const currentState = state.getState();        
        const newState = {
            ...currentState,
            tasks: [...currentState.tasks, {
                id: currentState.tasks.length == 0 ? 1 : (currentState.tasks.length + 1),
                state: "init",
                content: itemContent
            }]          
        }        
        return newState;
    }
}