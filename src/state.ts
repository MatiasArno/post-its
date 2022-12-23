// Tiene métodos para acceder y ser escrito.
// Tiene info de todas las tareas y sus distintas variaciones (completado - borrado).
// Se sincroniza con el LocalStorage.
// Usar un ID en cada pendiente.

import {Task} from "./types";

const state = {

    data: {
        tasks: [] as Task[]
    },

    listeners: [],

    getState(){
        return this.data;
    },

    setState(newState: Object){
        console.log("Recibí datos ==> ", newState);
        this.data = newState;

        for(const cb of this.listeners) {                                                                   // Recorre las funciones de listeners y las ejecuta.
            cb();                           
        }

        this.saveState();
    },

    updateTaskStatus(task: HTMLElement, taskStatus: string) {
        const currentState = this.getState();
        const taskFound = currentState.tasks.find((t: HTMLElement) => t.id == task.getAttribute("id"));     // Encuentra la tarea del state correspondiente a la tarea renderizada.
        taskFound.state = taskStatus;

        this.saveState();
    },

    saveState(){
        const currentStateTasks = this.getState().tasks;
        currentStateTasks.forEach((t: any) => window.localStorage.setItem(`${t.id}`, `{id: "${t.id}", state: "${t.state}", content: "${t.content}"}`));
    },

    getSavedState(){
        
        return window.localStorage;
    },

    subscribe(callback: (any: any) => any){                                                                // ACTUALIZA LOS COMPONENTES ASOCIADOS.Recibe una función llamada "callback" por convención.
        this.listeners.push(callback);                                                                      // Genero un array de funciones.
    }
};

export { state };