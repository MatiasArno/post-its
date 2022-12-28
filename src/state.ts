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

    init(){
        const storedState = localStorage.getItem('state') as string;
        storedState == null ? console.log("No stored data to render...") : this.setState(JSON.parse(storedState));
    },

    getState(){
        return this.data;
    },

    setState(newState: Object){
        this.data = newState;
        for(const cb of this.listeners) {                                                                   // Recorre las funciones de listeners y las ejecuta.
            cb();                           
        }

        localStorage.setItem('state', JSON.stringify(newState));
    },

    updateTaskStatus(task: HTMLElement, taskStatus: string) {
        const currentState = this.getState();
        const taskFound = currentState.tasks.find((t: HTMLElement) => t.id == task.getAttribute("id"));     // Encuentra la tarea del state correspondiente a la tarea renderizada.
        taskFound.state = taskStatus;
        this.setState(currentState);
    },

    subscribe(callback: (any: any) => any){                                                                // ACTUALIZA LOS COMPONENTES ASOCIADOS.Recibe una función llamada "callback" por convención.
        this.listeners.push(callback);                                                                     // Genero un array de funciones.
    }
};

export { state };