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

    getState() {
        return this.data;
    },

    setState(newState: Object) {
        console.log("Recibí datos ==> ", newState);
        this.data = newState;

        for(const cb of this.listeners) {                   // Recorre las funciones de listeners y las ejecuta.
            cb();                           
        }
    },

    saveState(){
        console.log('State saved... (TEST)');
    },

    subscribe(callback: (any: any) => any) {                // SUBSCRIPCION AL STATE PARA ACTUALIZAR LOS COMPONENTES ASOCIADOS.
                                                            // Recibe una función llamada "callback" por convención.
        this.listeners.push(callback);                      // Genero un array de funciones.
        console.log(`NEW CALLBACK -->| ${callback} |<---`);
    }
};

export { state };