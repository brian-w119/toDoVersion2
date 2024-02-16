import { makeDiv, makeButton, makeInput, InputField, makeFormElement} from "./newElements.js";

const toDo = {

    createTask: makeButton(),
    enter  : makeButton(),
    clear  : makeButton(),

    //grid1 for the new tasks, grid2 for the outstanding tasks
    grid1  : document.querySelector(".grid1"),
    grid2  : document.querySelector(".grid2"),


    clearEnter: makeDiv(), //container to hold enter and clear buttons
    title: makeInput(),
    details: makeFormElement(),
    dueDate: makeInput(),
    priority: makeInput(),
    eachTask: makeDiv(),
    columnsContainer: makeDiv(),
    formContainer : makeDiv(),
    outstanding : document.createElement("h2"),
    newDiv1: makeDiv(),
    pageGrid: document.querySelector(".pageGrid"),
    enlargedToDo: makeDiv(),
    cancel: makeButton(),
    taskButtonsHolder: makeDiv(),
    task: 0,
    taskId: null,
    activeTask: null,
    column: null,
    assignmentChanged: null,


    lowPriority: makeButton(),
    mediumPriority: makeButton(),
    highPriority: makeButton(),

    // container for information when task expanded
    expandedInfo: makeDiv(), 

    toDoExpanded: false,

    //container to house buttons for expanded tasks
    taskButtonsContainer: makeDiv(),

    taskDelete: makeButton(),
    taskReAssign: makeButton(),
   
    //divs to contain task details when expanded
    title1: makeDiv(),
    priority1: makeDiv(),
    dueDate1: makeDiv(),
    details1: makeDiv(),

    // columns for outstanding tasks
    column0: makeDiv(),
    column1 : makeDiv(),
    column2 : makeDiv(),

    defaultState(){
        this.createTask.classList.add("newToDo");
        this.enter.classList.add("enter");
        this.enter.id = "enter";
        this.clear.classList.add("clear");
        this.clear.id = "clear";
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
        const allFields = [this.title, this.details, this.dueDate, this.priority];

        this.title.type = "text";
        this.title.name = "task";
        this.title.value = "";
        this.title.placeholder = "Title";
        this.title.required = true;
        this.formContainer.appendChild(this.title);

        this.details.name = "details";
        this.details.id = "details";
        this.details.value = "";
        this.details.row = "3";
        this.details.columns = "30";
        this.details.required = true;
        this.details.placeholder = "Enter Task Details";

        this.dueDate.type = "date";
        this.dueDate.name = "dueDate";
        this.dueDate.id = "dueDate";
        this.dueDate.value = "";
        this.dueDate.required = true;
        this.dueDate.disabled = false;

        this.priority.type = "text";
        this.priority.classList.add("priority");
        this.priority.id = "priority";
        this.priority.value = "";
        this.priority.required = true;
        this.priority.placeholder = "Priority: Low / Medium / High";

        //adds all input fields to formContainer element
        for(let i = 0; i < allFields.length; i++){
            this.formContainer.appendChild(allFields[i]);
        };
        this.grid1.appendChild(this.formContainer);
    },

    generateForm(){
        this.createTask.addEventListener("click", ()=> this.makeForm());
    },

    //makes columns for outstanding tasks and adds headings
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
            newDiv.style.marginBottom = "10px";
            columnArr[i].appendChild(newDiv);      
        };
    },

    createColumnTitle(){
        this.outstanding.textContent = "OUTSTANDING TASKS";
        this.outstanding.id = "column2Heading";
        this.grid2.appendChild(this.outstanding);
    },

    //clears data from the input fields
    clearInput(){
        this.clear.addEventListener("click", ()=> {
            const allInputs = [this.dueDate, this.details, this.priority, this.title];
            for(let i = 0; i < allInputs.length; i++){
                allInputs[i].value = "";
            };
        });
        console.log("clearInput");
    },

    //thius function transfers data from input field to column on ENTER being pressed
    transferToPriority(){
         const enter = document.querySelector("#enter");
         enter.addEventListener("click", ()=> {
            if(this.priority.value === "low"){
                this.addToColumn(this.column0);
            }else if(this.priority.value === "medium"){
                this.addToColumn(this.column1);
            }else{
                this.addToColumn(this.column2);
            };
         });
    },

    //this function determines which column the to do goes in
    addToColumn(column){
        const div = makeDiv();
        div.id = "toDoContainer";
        const data = [this.title, this.dueDate];
        for(let i = 0; i < data.length; i++){
            div.innerText += `\n${data[i].value}`;
        };
        column.appendChild(div);
    },

    init(){
        this.defaultState();
        this.generateForm();
        this.makeOutstandingColumns();
        this.transferToPriority();
    },
};

toDo.init();
