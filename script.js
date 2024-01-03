
import { makeDiv, makeButton, makeInput} from "./newElements.js";

const toDo = {

    createTask: makeButton(),
    enter  : makeButton(),
    clear  : makeButton(),
    grid1  : document.querySelector(".grid1"),
    clearEnter: makeDiv(), //container to hold enter and clear buttons
    title: makeInput(),
    details: makeInput(),
    dueDate: makeInput(),
    priority: makeInput(),
    formContainer : makeDiv(),

    defaultState(){
        this.createTask.classList.add("newToDo");
        this.enter.classList.add("enter");
        this.clear.classList.add("clear");
        this.clearEnter.classList.add("enterClear");

        this.createTask.textContent = "+New Task";
        this.enter.textContent = "Enter";
        this.clear.textContent = "Clear";

        //adding buttons to left hand side of to do app.
        this.grid1.appendChild(this.createTask);
        this.clearEnter.appendChild(this.enter);
        this.clearEnter.appendChild(this.clear);
        this.createTask.after(this.clearEnter);
    },

   // some attributes given to form elements
    makeForm(){
        this.formContainer.id = "formContainer";
        this.title.type = "text";
        this.title.name = "task";
        this.title.value = "";
        this.title.placeholder = "Title";
        this.formContainer.appendChild(this.title);
        this.grid1.appendChild(this.formContainer);

        this.details.type = "text";
        this.details.name = "details";
        this.details.value = "";
        this.details.placeholder = "Enter Task Details";
        this.formContainer.appendChild(this.details);

        this.dueDate.type = "date";
        this.dueDate.name = "dueDate";
        this.dueDate.value = "";
        this.formContainer.appendChild(this.dueDate);

        this.priority.type = "text";
        this.priority.name = "priority";
        this.priority.value = "";
        this.priority.placeholder = "Low/Medium/High";
        this.formContainer.appendChild(this.priority);

        this.grid1.appendChild(this.formContainer);
         
    },



    init(){
        this.defaultState();
        this.makeForm()
        

    },
};

toDo.init();
