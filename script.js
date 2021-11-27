const initialItemsString = localStorage.getItem("toDoList");
const initialItemsState = JSON.parse(initialItemsString);

const state = {
    items: initialItemsState || [],

};

const createTodoItem = (item) => {
    const newItem = document.createElement("li");
    newItem.className = "todo-item";
    newItem.innerHTML = `
    <label class='ch-box-wrapper'>
    <input type="checkbox" class='ch-box' ${item.isDone ? "checked" : ""
        } itemId="${item.id}" onchange="onChangeCheckbox(this)"></checkbox>
    <span class='custom-ch-box'></span>
  </label>
  <span class="todo-text ${item.isDone ? "todo-text__line-through" : ""}"> ${item.text}</span>
  <button class="todo-remove-btn" itemId="${item.id}" oncLick="onDeleteClick(this)">
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.830777" y1="9.96212" x2="9.46211" y2="1.33078" stroke="black" stroke-opacity="0.5"/>
      <line x1="9.27778" y1="9.98489" x2="0.646446" y2="1.35355" stroke="black" stroke-opacity="0.5"/>
    </svg>    
  </button>
    `;

    return newItem;

};

const renderApp = () => {
    const toDoList = document.getElementById("toDoList");
    const doneList = document.getElementById("doneList");

    toDoList.innerHTML = "";
    doneList.innerHTML = "";
    state.items.forEach((item) => {
        const newItemElement = createTodoItem(item);

        if (item.isDone) {
            doneList.appendChild(newItemElement);
        } else {
            toDoList.appendChild(newItemElement);
        }
    })

    localStorage.setItem("toDoList", JSON.stringify(state.items));

};

renderApp();

const addItemForm = document.getElementById("addItemForm");

addItemForm.onsubmit = (event) => {
    event.preventDefault();

    const newTodoText = event.target.newToDo.value;

    state.items.push({
        id: uuid.v1(),
        text: newTodoText,
        isDone: false,
    });

    event.target.newToDo.value = "";

    renderApp();
};

const onChangeCheckbox = (target) => {
    const id = target.getAttribute("itemId");

    state.items.forEach((item, index) => {
        if (item.id === id) {
            state.items[index].isDone = target.checked;
        }

    });

    renderApp();
};

const onDeleteClick = (target) => {

    const id = target.getAttribute("itemId");

    state.items = state.items.filter((item) => {
        return item.id !== id;
    });

    renderApp();
}

const clearAllBtn = document.getElementById("clearAll");

clearAllBtn.onclick = () => {

    state.items = [];
    renderApp();
};















