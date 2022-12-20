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

        <div class="items-list">
            ${state.subscribe(() => {
                state.getState().tasks.forEach(item => `<todo-item class="todo-item" id="${item.id}" state="${item.state}" content="${item.content}"></todo-item>`);             
            })}
        </div>
    `;

    const form = root.querySelector('.form') as HTMLFormElement;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.setState(updateState(form.field.value));
    });

    root.querySelector('.todo-item')?.addEventListener('item-created', () => {              // Escucha el custom event y actualiza el state.
        console.log('An item has been created!', '|<-- CUSTOM EVENT LISTENER');
    });

    function updateState(itemContent: string) {

        const lastState = state.getState();

        const newState = {
            ...lastState,
            tasks: [...lastState.tasks, {
                id: lastState.tasks.id == undefined ? 0 : (lastState.tasks.id + 1),
                state: "init",
                content: itemContent
            }]          
        }

        return newState;
    }
}