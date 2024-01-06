
import { makeDiv, makeButton, makeInput, InputField} from "./newElements.js";

const toDo = {

    createTask: makeButton(),
    enter  : makeButton(),
    clear  : makeButton(),

    //grid1 for the new tasks, grid2 for the outstanding tasks
    grid1  : document.querySelector(".grid1"),
    grid2  : document.querySelector(".grid2"),


    clearEnter: makeDiv(), //container to hold enter and clear buttons
    title: makeInput(),
    details: makeInput(),
    dueDate: makeInput(),
    priority: makeInput(),
    eachTask: makeDiv(),
    columnsContainer: makeDiv(),
    formContainer : makeDiv(),
    outstanding : document.createElement("h2"),
    
    
    // columns for outstanding tasks
    column0: makeDiv(),
    column1 : makeDiv(),
    column2 : makeDiv(),

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
        this.title.required = true;
        this.formContainer.appendChild(this.title);
        this.grid1.appendChild(this.formContainer);

        this.details.type = "text";
        this.details.name = "details";
        this.details.id = "details";
        this.details.value = "";
        this.details.required = true;
        this.details.placeholder = "Enter Task Details";
        this.formContainer.appendChild(this.details);

        this.dueDate.type = "date";
        this.dueDate.name = "dueDate";
        this.dueDate.id = "dueDate";
        this.dueDate.value = "";
        this.dueDate.required = true;
        this.formContainer.appendChild(this.dueDate);

        this.priority.type = "text";
        this.priority.classList.add("priority");
        this.priority.id = "priority";
        this.priority.value = "";
        this.priority.required = true;
        this.priority.placeholder = "Priority: Low / Medium / High";
        this.formContainer.appendChild(this.priority);

        this.grid1.appendChild(this.formContainer);
    },

    makeOutstandingColumns(){
        const columnArr = [this.column0, this.column1, this.column2];
        for(let i = 0; i < columnArr.length; i++){
            this.grid2.appendChild(columnArr[i]);
            columnArr[i].id = `column${i}`;
        
            const newDiv = makeDiv();
            if(columnArr[i].id === "column0"){
                newDiv.textContent = "Priority Low";

            }else if(columnArr[i].id === "column1"){
                newDiv.textContent = "Priority Medium";
             
            }else if(columnArr[i].id === "column2"){
                newDiv.textContent = "Priority High";

            };
            newDiv.style.color = "white";
            columnArr[i].appendChild(newDiv);      
        };
    },

    createColumnTitle(){
        this.outstanding.textContent = "OUTSTANDING TASKS";
        this.outstanding.id = "column2Heading";
        this.grid2.appendChild(this.outstanding);
        
    },

    captureInput(){
        const inputs = [this.title, this.details, this.dueDate, this.priority];
        this.enter.addEventListener("click", () =>{

        });
       
    },


    
    init(){
        this.defaultState();
        this.makeForm();
        this.makeOutstandingColumns();
        //this.createColumnTitle();
        this.captureInput();
    },
};

toDo.init();
