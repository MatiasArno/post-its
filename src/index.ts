import { initMain } from "./pages/main";
import { initTodoItem } from "./components/todo-item";
import { state } from "./state";

function main() {
    initMain();
    state.init();
    initTodoItem();
}

main();