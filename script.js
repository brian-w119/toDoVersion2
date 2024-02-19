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

    transferInput(){
        this.enter.addEventListener("click", ()=> this.captureInput());
    },

     //assigns tasks to various columns
    captureInput(){
        const newDiv1 = makeDiv();
        newDiv1.classList.add("taskStyling");
        const inputs = [this.title, this.dueDate];
        newDiv1.style.backgroundColor = "rgb(209, 215, 254)";
        newDiv1.style.marginBottom = "10px";
        newDiv1.style.color = "black";
        let priority = this.priority.value.toUpperCase();
        
        this.task += 1;
        for(let i = 0; i < inputs.length; i++){
            newDiv1.innerText += `${inputs[i].value}\n`;
            //newDiv1.id = `task${this.task}`;
            if(priority  === "LOW"){
                this.column0.appendChild(newDiv1); 
                newDiv1.id = `task${this.task}-lowP`;

            }else if(priority === "MEDIUM"){
                this.column1.appendChild(newDiv1); 
                newDiv1.id = `task${this.task}-medP`;

            }else if(priority === "HIGH"){
                this.column2.appendChild(newDiv1); 
                newDiv1.id = `task${this.task}-highP`;
            };
        };
        //this.taskId = newDiv1.id;
        newDiv1.addEventListener("mousedown", ()=> {
            this.activeTask = newDiv1.id;
            this.expandToDo();
            this.expandedTaskButtons();
         });
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

    //attaches the expanded task to the body and adds class and expands the task view
    expandToDo(){
        this.clearInput();
        this.enlargedToDo.classList.add("enlargedToDo");
        this.cancel.id = "cancel";
        this.cancel.textContent = "X";
        this.enlargedToDo.appendChild(this.cancel);
        document.body.appendChild(this.enlargedToDo);
        this.toDoExpanded = true;
        this.disableEnableButtons();
        this.fillEnlarged();
    },

    //populate enlarged task with details
    fillEnlarged(){
        this.expandedInfo.innerHTML = "";
        const titleDiv = makeDiv();
       
        const detailsDiv = makeDiv();
        const dateDiv = makeDiv();
        const priorityDiv = makeDiv();
        
        const divs = [titleDiv, detailsDiv, dateDiv, priorityDiv];
        const allTaskDetails = [this.title.value, this.details.value, this.dueDate.value, this.priority.value];

       for(let i = 0; i < allTaskDetails.length; i++){
            if(allTaskDetails[i] === this.title.value){
                divs[i].innerText = `Title: ${allTaskDetails[i]}`;
            }else if(allTaskDetails[i] === this.dueDate.value){
                divs[i].innerText = `Due Date: ${allTaskDetails[i]}`;
            }else if(allTaskDetails[i] === this.priority.value){
                divs[i].innerText = `Priority: ${allTaskDetails[i]}`;
            }else{
                divs[i].innerText = allTaskDetails[i]
            };
            
            //divs[i].innerText = allTaskDetails[i];
            divs[i].id = `field${i}`;
            divs[i].classList.add("styling");
            this.expandedInfo.appendChild(divs[i]);
        };
        this.expandedInfo.id = "furtherInfo";
        this.enlargedToDo.appendChild(this.expandedInfo);
        this.infoLayout();        
    },


    // positions the different fields of the expanded task view
    infoLayout(){
        const info = [this.title, this.details, this.dueDate, this.priority];
        for(let i = 0; i < info.length; i++){
            info[i].style.display = "block";
            info[i].style.marginLeft = "auto";
            info[i].style.marginRight = "auto";

            if(info[i] === this.details){
                info[i].style.width = "300px";
            };

            if(info[i] === this.title){
                info[i].style.marginTop = "100px";
            };

            if(info[i] === this.dueDate){
                info[i].disabled = "true";
            };
        };
    },

    expandedTaskButtons(){
        this.taskButtonsContainer.id = "newContainer";

        this.taskDelete.id  = "taskDelete";
        this.taskDelete.innerText = "Delete";

        this.taskReAssign.id = "reAssign";
        this.taskReAssign.innerText = "Re-Assign";

        const buttons = [this.taskDelete, this.taskReAssign];
        for(let i = 0; i < buttons.length; i++){
            this.taskButtonsContainer.appendChild(buttons[i]);
        };
        this.enlargedToDo.appendChild(this.taskButtonsContainer);
    },

    //removes DELETE and ReAssign buttons
    removeButtons(){
        const buttons =  [this.taskDelete, this.taskReAssign];
        for(let i = 0; i < buttons.length; i++){
            this.taskButtonsContainer.removeChild(buttons[i]);
        };
    },
    
     //removes DELETE and ReAssign buttons on click
    removeButtons2(){
        this.taskReAssign.addEventListener("click", ()=> this.removeButtons());
    },

    //closes the enlarged task view and enables input buttons
    closeEnlarged(){
        this.cancel.addEventListener("click", ()=> {
            this.activeTask = null;
            document.body.removeChild(this.enlargedToDo);
            this.toDoExpanded = false;
            this.disableEnableButtons();
            this.enlargedToDo.removeChild(this.taskButtonsContainer);
            this.removeDivContents();
            this.taskReAssign.disabled = false;
            //this.taskId = null;
            console.log("enlarged view closed");
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
    
    //re-assigns current tasks
    reAssignTask(){
        this.taskReAssign.addEventListener("click", ()=>{
            this.deleteRogueButtons();
            this.createreAssignButtons();
            this.disableReAssignButton();
            this.columnReAssign();
        });
    },

    createreAssignButtons(){
        this.taskButtonsContainer.id = "taskButtons";

        this.lowPriority = makeButton();
        this.lowPriority.innerText = "Low Priority";
        this.lowPriority.id = "priority0";

        this.mediumPriority = makeButton();
        this.mediumPriority.innerText = "Medium Priority";
        this.mediumPriority.id = "priority1";

        this.highPriority = makeButton();
        this.highPriority.innerText = "High Priority";
        this.highPriority.id = "priority2";

        const priorities = [this.lowPriority,this.mediumPriority, this.highPriority];
        for(let i = 0; i < priorities.length; i++){
           priorities[i].classList.add("buttonsStyling");
           //priorities[i].id = `reAssign${[i]}`;
           this.taskButtonsContainer.appendChild(priorities[i]);
        };
        this.enlargedToDo.appendChild(this.taskButtonsContainer);
        console.log(this.taskButtonsContainer);
        //removes the expanded tasks, so that only task re-assign buttons are visible
        this.enlargedToDo.removeChild(this.expandedInfo);
    },

    removeDivContents(){
        const taskButtons = document.querySelector("#taskButtons")
        const contents = [this.taskReAssign, this.taskDelete];
        this.taskButtonsContainer.innerText = "";
    },

    disableReAssignButton(){
        this.taskReAssign.disabled = "true";
    },

    taskToDelete(){
        const currentTask = document.querySelector(`#${this.activeTask}`);
        console.log(currentTask);
        currentTask.remove();
        document.body.removeChild(this.enlargedToDo);
        this.closeEnlarged();
        this.toDoExpanded = false;
        this.disableEnableButtons();
        this.clearInput();
        this.dueDate.disabled = false;
    },
    
    //enables due date field
    priorityChange(){
        this.dueDate.disabled = false;
    },

    //re-assigns tasks to diggerent columns
    columnReAssign(){
        const currentTask = document.querySelector(`#${this.activeTask}`);
       
        const priorityLow = document.querySelector("#priority0");
        priorityLow.addEventListener("click", ()=> {
            this.taskChangedCondition = true;
            this.column0.appendChild(currentTask);
            document.body.removeChild(this.enlargedToDo);
        });

        const priorityMedium = document.querySelector("#priority1");
        priorityMedium.addEventListener("click", ()=> {
            this.taskChangedCondition = true;
            this.column1.appendChild(currentTask);
            document.body.removeChild(this.enlargedToDo);
        });

        const priorityHigh = document.querySelector("#priority2");
        priorityHigh.addEventListener("click", ()=> ()=> {
            this.taskChangedCondition = true;
            this.column2.appendChild(currentTask);
            document.body.removeChild(this.enlargedToDo);
        });
        this.priorityChange();
    },

    deleteRogueButtons(){
        const container = document.querySelector("#newContainer");
        const button0 = document.querySelector("#priority0");
        const button1 = document.querySelector("#priority1");
        const button2 =  document.querySelector("#priority2");

        const array = [button0, button1, button2];
        for(let i = 0; i < length.length; i++){
            if(container.includes(array[i]) === true){
                array[i].remove();
                console.log("rogue button deleted");
            };
        };
    },

    init(){
        this.defaultState();
        this.generateForm();
        this.makeOutstandingColumns();
        this.transferInput();
        this.clearInput();
        this.closeEnlarged();
        this.reAssignTask();
        this.removeButtons2();
        this.taskDelete.addEventListener("click", ()=>{
            this.taskToDelete();
         });
        //this.columnReAssign();
        // this.priorityChange();
    },
};

toDo.init();
