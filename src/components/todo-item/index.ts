// Recibe atributos para mostrar la card amarilla correspondiente a cada pendiente con la data que corresponda.
// Emite un evento (custom-event) para que la page se entere de que algo cambió.

export function initTodoItem() {

    class TodoItem extends HTMLElement {

        shadow = this.attachShadow({mode: 'open'});

        constructor() {
            super();
        }
        
        connectedCallback(){
            const itemCreated = new CustomEvent('item-created', {detail: "POR ACÁ LE PUEDO PASAR EL CHECKBOX PARA PODER ESCUCHARLO EN LA PAGE"});
            this.render();
            this.dispatchEvent(itemCreated);
        }

        render() {
            const style = document.createElement('style');
            const div = document.createElement('div');
            const itemState = this.getAttribute("state");
            const itemContent = this.getAttribute("content");

            style.innerHTML = `
                div {
                    background-color: yellow;
                    border: 3px dashed;
                }
            `;

            div.innerHTML = `
                <h3>${itemContent} |<-- item content</h3>
                <h3>${itemState} |<-- item state</h3>
            `;

            this.shadow.appendChild(style);
            this.shadow.appendChild(div);
        }
    }

    customElements.define("todo-item", TodoItem);
}