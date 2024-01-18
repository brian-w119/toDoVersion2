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
    newDiv1: makeDiv(),
    pageGrid: document.querySelector(".pageGrid"),
    enlargedToDo: makeDiv(),
    cancel: makeButton(),
    expandedInfo: makeDiv(), // container for information when task expanded
    toDoExpanded: false,

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

    generateForm(){
        this.createTask.addEventListener("click", ()=> this.makeForm());
    },

    //makes columns for outstanding tasks and add headings
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

    transferInput(){
        this.enter.addEventListener("click", ()=> this.captureInput());
    },

    //assigns tasks to various columns
    captureInput(){
        const newDiv1 = makeDiv();
        const inputs = [this.title, this.dueDate];
        newDiv1.style.backgroundColor = "rgb(209, 215, 254)";
        newDiv1.style.marginBottom = "10px";
        let priority = this.priority.value.toUpperCase();
   
        for(let i = 0; i < inputs.length; i++){
            newDiv1.innerText += `${inputs[i].value}\n`;
            if(priority  === "LOW"){
                this.column0.appendChild(newDiv1); 

            }else if(priority === "MEDIUM"){
                this.column1.appendChild(newDiv1); 

            }else if(priority === "HIGH"){
                this.column2.appendChild(newDiv1); 
            };
            
            newDiv1.addEventListener("mousedown", ()=> {
               this.expandToDo();
            });
        };
        console.log(this.task);
    },

    //clears data from the input fields
    clearInput(){
        this.clear.addEventListener("click", ()=> {
            const allInputs = [this.dueDate, this.details, this.priority, this.title];
            for(let i = 0; i < allInputs.length; i++){
                allInputs[i].value = "";
            };
        });
    },

    //attaches the expanded task to the body and adds class and expands the task view
    expandToDo(){
        this.enlargedToDo.classList.add("enlargedToDo");
        this.cancel.id = "cancel";
        this.cancel.textContent = "X";
        this.enlargedToDo.appendChild(this.cancel);
        document.body.appendChild(this.enlargedToDo);
        this.toDoExpanded = true;
        this.disableEnableButtons();
    },


    //populate enlarged task with details
    fillEnlarged(){
        this.expandedInfo.id = "furtherInfo";
        this.enlargedToDo.appendChild(this.expandedInfo);
    },

    //closes the enlarged task view and enables input buttons
    closeEnlarged(){
        this.cancel.addEventListener("click", ()=> {
            document.body.removeChild(this.enlargedToDo);
            this.toDoExpanded = false;
            this.disableEnableButtons();
        });
    },

    disableEnableButtons(){
        const inputButtons = [this.createTask, this.clear, this.enter];
        for(let i = 0; i < inputButtons.length; i++){
            if(this.toDoExpanded === true){
               inputButtons[i].disabled = true;
            }else if(this.toDoExpanded === false){
                inputButtons[i].disabled = false;
            };
        };
        console.log(this.toDoExpanded);
    },
     
    init(){
        this.defaultState();
        //this.makeForm();
        this.generateForm();
        this.makeOutstandingColumns();
        //this.createColumnTitle();
        this.transferInput();
        this.clearInput();
        this.closeEnlarged();
        this.fillEnlarged();
        //this.disableInputButtons();
      //  this.checkExpandedState();
       // this.whenExpandedClose();
    },
};

toDo.init();