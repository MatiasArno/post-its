// Recibe atributos para mostrar la card amarilla correspondiente a cada pendiente con la data que corresponda.
// Emite un evento (custom-event) para que la page se entere de que algo cambió.

import { state } from "../../state";

export function initTodoItem() {

    class TodoItem extends HTMLElement {

        shadow = this.attachShadow({mode: 'open'});

        constructor() {
            super();
            // state.subscribe(() => {this.render()});
        }
        
        connectedCallback(){
            this.render();
        }

        render() {
            const style = document.createElement('style');
            const div = document.createElement('div');
            const itemState = this.getAttribute("state");
            const itemContent = this.getAttribute("content");
            div.classList.add("container");

            style.innerHTML = `
                * {
                    box-sizing: border-box;
                    margin: 0;
                }

                .container {
                    display: flex;
                    height: 120px;
                    background-color: #FFF599;
                    margin: 18px 0 0 0;
                }

                .left {
                    display: flex;
                    align-items: center;
                    width: 90%;
                    height: 100%;
                    padding: 0 18px;
                    text-align: justify;
                }
                
                .right {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    width: 10%;
                    height: 100%;
                    padding: 15px 0 0 0;
                }

                    .task-completed {
                        text-decoration: line-through;
                    }
                
                input[type=checkbox] {
                    -webkit-transform: scale(2.07);
                    margin: 0 10px 0 0;
                }

                .button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    position: relative;
                    top: 54px;
                    background-color: rgba(255, 255, 255, 0);
                    border: none;
                    font-size: 3.6em;
                    font-weight: bolder;
                }
            `;

            div.innerHTML = `
                <div class="left ${itemState == "checked" ? "task-completed" : ""}">${itemContent}</div>
                <div class="right">
                    <input type="checkbox" class="checkbox" ${itemState == "checked" ? "checked" : ""}>
                    <button class="button">×</button>
                </div>
                `;


            const checkboxEl = div.querySelector('.checkbox') as HTMLFormElement;
            checkboxEl.addEventListener('click', () => {
                let itemChecked: any;
                checkboxEl.checked ? itemChecked = new CustomEvent('item-checked', {detail: true}) : itemChecked = new CustomEvent('item-checked', {detail: false});                
                this.dispatchEvent(itemChecked);
            });            

            const deleteBtnEl = div.querySelector('.button') as HTMLFormElement;
            deleteBtnEl.addEventListener('click', () => this.dispatchEvent(itemDeleted));          
            const itemDeleted = new CustomEvent('item-deleted');

            this.shadow.appendChild(style);
            this.shadow.appendChild(div);
        }
    }

    customElements.define("todo-item", TodoItem);
}