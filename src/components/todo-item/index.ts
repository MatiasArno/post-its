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
            div.classList.add("container");

            style.innerHTML = `
                .container {
                    display: flex;
                    height: 120px;
                    background-color: #FFF599;
                    margin: 18px 0 0 0;

                    border: 3px dotted;
                }

                .left {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 90%;
                    height: 100%;
                }
                
                .right {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    width: 10%;
                    height: 100%;
                }

                .checkbox {
                    width: 100%;
                }

                .button {
                    height: 36px;
                }
            `;

            div.innerHTML = `
                <div class="left">${itemContent}</div>
                <div class="right">
                    <input type="checkbox" class="checkbox">
                    <button class="button">☼</button>
                </div>
            `;

            this.shadow.appendChild(style);
            this.shadow.appendChild(div);
        }
    }

    customElements.define("todo-item", TodoItem);
}