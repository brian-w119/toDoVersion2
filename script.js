import {
  makeDiv,
  makeButton,
  makeInput,
  InputField,
  makeFormElement,
} from "./newElements.js";

const toDo = {
  createTask: makeButton(),
  enter: makeButton(),
  clear: makeButton(),

  //grid1 for the new tasks, grid2 for the outstanding tasks
  grid1: document.querySelector(".grid1"),
  grid2: document.querySelector(".grid2"),

  clearEnter: makeDiv(), //container to hold enter and clear buttons
  title: makeInput(),
  details: makeFormElement(),
  dueDate: makeInput(),
  priority: makeInput(),
  eachTask: makeDiv(),
  columnsContainer: makeDiv(),
  formContainer: makeDiv(),
  outstanding: document.createElement("h2"),
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

  clearAllTasks: makeButton(),

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
  column1: makeDiv(),
  column2: makeDiv(),

  question: makeButton(),
  yesResponse: makeButton(),
  noResponse: makeButton(),
  questionBox: makeDiv(),

  savedData: null,
  retrievedData: null,

  // the below corresponds to localStorage
  whichPriority: null,
  priorityL: [],
  priorityM: [],
  priorityH: [],
  colL: null,
  colM: null,
  colH: null,
  tempL: [],
  tempM: [],
  tempH: [],
  taskReassigned: null,

  taskData: {
    taskName: null,
    taskDateDue: null,
    taskInfo: null,
    taskIdentifier: null,
    taskClass: null,
  },

  defaultState() {
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

  //some attributes given to form elements
  makeForm() {
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
    for (let i = 0; i < allFields.length; i++) {
      this.formContainer.appendChild(allFields[i]);
    }
    this.grid1.appendChild(this.formContainer);
  },

  generateForm() {
    this.createTask.addEventListener("click", () => this.makeForm());
  },

  //makes columns for outstanding tasks and adds headings
  makeOutstandingColumns() {
    const columnArr = [this.column0, this.column1, this.column2];

    for (let i = 0; i < columnArr.length; i++) {
      this.grid2.appendChild(columnArr[i]);
      columnArr[i].id = `column${i}`;

      const newDiv = makeDiv();
      if (columnArr[i].id === "column0") {
        newDiv.textContent = "Priority Low";
      } else if (columnArr[i].id === "column1") {
        newDiv.textContent = "Priority Medium";
      } else if (columnArr[i].id === "column2") {
        newDiv.textContent = "Priority High";
      }
      newDiv.style.color = "white";
      newDiv.style.marginBottom = "10px";
      columnArr[i].appendChild(newDiv);
    }
  },

  createColumnTitle() {
    this.outstanding.textContent = "OUTSTANDING TASKS";
    this.outstanding.id = "column2Heading";
    this.grid2.appendChild(this.outstanding);
  },

  transferInput() {
    this.enter.addEventListener("click", () => {
      this.captureInput();
      this.details.disabled = false;
      this.saveToLocalObj();
    });
  },

  //assigns tasks to various columns and saves data in object for localStorage
  captureInput() {
    this.taskData = {};
    const newDiv1 = makeDiv();
    newDiv1.classList.add("taskStyling");
    const inputs = [this.title, this.dueDate, this.details];
    let priority = this.priority.value.toUpperCase();

    this.task += 1;
    for (let i = 0; i < inputs.length; i++) {
      newDiv1.innerText += `${inputs[i].value}\n`;

      if (priority === "LOW") {
        this.column0.appendChild(newDiv1);
        newDiv1.id = `task${this.task}-lowP`;
        this.taskData["taskIdentifier"] = newDiv1.id;
        //the "whichPriority" variable is used by the localStorage functionality
        this.whichPriority = "lowP";
        this.updateStorageObject();
      } else if (priority === "MEDIUM") {
        this.column1.appendChild(newDiv1);
        newDiv1.id = `task${this.task}-medP`;
        this.taskData["taskIdentifier"] = newDiv1.id;
        //the "whichPriority" variable is used by the localStorage functionality
        this.whichPriority = "medP";
        this.updateStorageObject();
      } else if (priority === "HIGH") {
        this.column2.appendChild(newDiv1);
        newDiv1.id = `task${this.task}-highP`;
        this.taskData["taskIdentifier"] = newDiv1.id;
        //the "whichPriority" variable is used by the localStorage functionality
        this.whichPriority = "highP";
        this.updateStorageObject();
      }
    }
    this.taskData["taskClass"] = "taskStyling";
    console.log(newDiv1);
    /*
    newDiv1.addEventListener("mousedown", () => {
      this.activeTask = newDiv1.id;
      this.expandToDo();
      this.expandedTaskButtons();
      this.clearRogueContents();
      this.disableReAssignButton(false);
    });
    */
    this.mouseDownEvent(newDiv1);
  },

  mouseDownEvent(div) {
    div.addEventListener("mousedown", () => {
      this.activeTask = div.id;
      this.expandToDo();
      this.expandedTaskButtons();
      this.clearRogueContents();
      this.disableReAssignButton(false);
    });
  },

  //values of current task to be added to storage object
  updateStorageObject() {
    this.taskData["taskName"] = this.title.value;
    this.taskData["taskDateDue"] = `${this.dueDate.value}`;
    this.taskData["taskInfo"] = `${this.details.value}`;
  },

  //saves data to localStorage
  saveToLocalObj() {
    if (this.whichPriority === "lowP") {
      this.priorityL.push(this.taskData);
      localStorage.setItem("priorityL", JSON.stringify(this.priorityL));
    } else if (this.whichPriority === "medP") {
      this.priorityM.push(this.taskData);
      localStorage.setItem("priorityM", JSON.stringify(this.priorityM));
    } else if (this.whichPriority === "highP") {
      this.priorityH.push(this.taskData);
      localStorage.setItem("priorityH", JSON.stringify(this.priorityH));
    }
    //console.log(this.priorityH);
  },

  toJSON(priority) {
    localStorage.setItem("priority", JSON.stringify(priority));
  },

  //retrieve data from localStorage
  retrieveFromStorage() {
    this.colL = null;
    this.colH = null;
    this.colM = null;

    this.colL = JSON.parse(localStorage.getItem("priorityL"));
    this.colM = JSON.parse(localStorage.getItem("priorityM"));
    this.colH = JSON.parse(localStorage.getItem("priorityH"));
  },

  //retrieved storage data being written back to columnns
  writeToColumns() {
    //extracts data from locaLStorage for the columns
    const allPriorities = [this.colL, this.colM, this.colH];
    for (let i = 0; i < allPriorities.length; i++) {
      for (const data in allPriorities[i]) {
        const newDiv = makeDiv();
        newDiv.classList.add("taskStyling");
        const info = Object.values(allPriorities[i][data]);
        newDiv.id = `${info[0]}`;
        console.log(`Task id is: ${this.retrievedtask}`);
        this.addRetrievedData(newDiv, info);
        const priority = newDiv.id.split("-");
        this.assignToColumns(priority, newDiv);
        this.mouseDownEvent(newDiv);
        console.log(info);
      }
    }
  },

  assignToColumns2() {
    const newDiv = makeDiv();
    newDiv.classList.add("taskStyling");

    const allPriorities = [this.colL, this.colM, this.colH];

    for (let column = 0; column < allPriorities.length; column++) {
      for (let task in allPriorities[column]) {
        const info = Object.values(allPriorities[column][task]);
        newDiv.id = `${info[0]}`;
        const splitString = newDiv.id.split("-");
        const priority = splitString[1];
        console.log(info);

        this.makeForm();
        this.title.value = info[1];
        console.log(this.title.value);
      }
    }
  },

  //assigned retrieved data to respective columns
  assignToColumns(priority, task) {
    if (priority[1] === "lowP") {
      this.column0.appendChild(task);
    } else if (priority[1] === "medP") {
      this.column1.appendChild(task);
    } else if (priority[1] === "highP") {
      this.column2.appendChild(task);
    }
    console.log("assign to column function invoked");
  },

  //writes retrieved data from locaStorage to a div
  addRetrievedData(div, arr) {
    const line1 = makeDiv();
    const line2 = makeDiv();
    const line3 = makeDiv();

    const lines = [line1, line2, line3];
    for (let i = 0; i < lines.length; i++) {
      lines[i].innerText = `${arr[i + 1]}`;
      div.appendChild(lines[i]);
    }
  },

  //clears data from the input fields
  clearInput() {
    this.clear.addEventListener("click", () => {
      const allInputs = [this.dueDate, this.details, this.priority, this.title];
      for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = "";
      }
    });
    console.log("clearInput");
  },

  //attaches the expanded task to the body and adds class and expands the task view
  expandToDo() {
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
  fillEnlarged() {
    this.expandedInfo.innerHTML = "";
    const titleDiv = makeDiv();
    const detailsDiv = makeDiv();
    const dateDiv = makeDiv();
    const priorityDiv = makeDiv();

    const divs = [titleDiv, detailsDiv, dateDiv, priorityDiv];
    const allTaskDetails = [
      this.title.value,
      this.details.value,
      this.dueDate.value,
      this.priority.value,
    ];

    for (let i = 0; i < allTaskDetails.length; i++) {
      if (allTaskDetails[i] === this.title.value) {
        divs[i].innerText = `Title: ${allTaskDetails[i]}`;
      } else if (allTaskDetails[i] === this.dueDate.value) {
        divs[i].innerText = `Due Date: ${allTaskDetails[i]}`;
      } else if (allTaskDetails[i] === this.priority.value) {
        divs[i].innerText = `Priority: ${allTaskDetails[i]}`;
      } else {
        divs[i].innerText = allTaskDetails[i];
      }

      //divs[i].innerText = allTaskDetails[i];
      divs[i].id = `field${i}`;
      divs[i].classList.add("styling");
      this.expandedInfo.appendChild(divs[i]);
    }
    this.expandedInfo.id = "furtherInfo";
    //this.enlargedToDo.appendChild(this.expandedInfo);
    this.infoLayout();
  },

  // positions the different fields of the expanded task view
  infoLayout() {
    const info = [this.title, this.details, this.dueDate, this.priority];
    for (let i = 0; i < info.length; i++) {
      info[i].style.display = "block";
      info[i].style.marginLeft = "auto";
      info[i].style.marginRight = "auto";

      if (info[i] === this.details) {
        info[i].style.width = "300px";
      }

      if (info[i] === this.title) {
        info[i].style.marginTop = "100px";
      }

      if (info[i] === this.dueDate) {
        info[i].disabled = "true";
      }
    }
  },

  expandedTaskButtons() {
    this.taskButtonsContainer.id = "newContainer";

    this.taskDelete.id = "taskDelete";
    this.taskDelete.innerText = "Task Delete";

    this.taskReAssign.id = "reAssign";
    this.taskReAssign.innerText = "Task Re-Assign";

    const buttons = [this.taskDelete, this.taskReAssign];
    for (let i = 0; i < buttons.length; i++) {
      this.taskButtonsContainer.appendChild(buttons[i]);
    }
    this.enlargedToDo.appendChild(this.taskButtonsContainer);
  },

  //removes DELETE and ReAssign buttons
  removeButtons() {
    const buttons = [this.taskDelete, this.taskReAssign];
    for (let i = 0; i < buttons.length; i++) {
      this.taskButtonsContainer.removeChild(buttons[i]);
    }
  },

  //removes DELETE and ReAssign buttons on click
  removeButtons2() {
    this.taskReAssign.addEventListener("click", () => this.removeButtons());
  },

  //closes the enlarged task view and enables input buttons
  closeEnlarged() {
    this.cancel.addEventListener("click", () => {
      this.activeTask = null;
      document.body.removeChild(this.enlargedToDo);
      this.toDoExpanded = false;
      this.disableEnableButtons();
      this.enlargedToDo.removeChild(this.taskButtonsContainer);
      this.removeDivContents();
      this.taskReAssign.disabled = false;
      //this.taskId = null;
      alert("enlarged view closed");
    });
  },

  disableEnableButtons() {
    const inputButtons = [this.createTask, this.clear, this.enter];
    for (let i = 0; i < inputButtons.length; i++) {
      if (this.toDoExpanded === true) {
        inputButtons[i].disabled = true;
      } else if (this.toDoExpanded === false) {
        inputButtons[i].disabled = false;
      }
    }
    console.log(this.toDoExpanded);
  },

  //re-assigns current tasks
  reAssignTask() {
    this.taskReAssign.addEventListener("click", () => {
      this.createreAssignButtons();
      this.disableReAssignButton(true);
      this.columnReAssign();
    });
  },

  createreAssignButtons() {
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

    const priorities = [
      this.lowPriority,
      this.mediumPriority,
      this.highPriority,
    ];
    for (let i = 0; i < priorities.length; i++) {
      priorities[i].classList.add("buttonsStyling");
      //priorities[i].id = `reAssign${[i]}`;
      this.taskButtonsContainer.appendChild(priorities[i]);
    }
    this.enlargedToDo.appendChild(this.taskButtonsContainer);
    console.log(this.taskButtonsContainer);
    //removes the expanded tasks, so that only task re-assign buttons are visible
    //this.enlargedToDo.removeChild(this.expandedInfo);
  },

  removeDivContents() {
    const taskButtons = document.querySelector("#taskButtons");
    const contents = [this.taskReAssign, this.taskDelete];
    this.taskButtonsContainer.innerText = "";
  },

  disableReAssignButton(value) {
    this.taskReAssign.disabled = value;
  },

  taskToDelete() {
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
  priorityChange() {
    this.dueDate.disabled = false;
  },

  //re-assigns tasks to diggerent columns
  columnReAssign() {
    const currentTask = document.querySelector(`#${this.activeTask}`);

    const priorityLow = document.querySelector("#priority0");
    priorityLow.addEventListener("click", () => {
      this.taskChangedCondition = true;
      this.column0.appendChild(currentTask);
      document.body.removeChild(this.enlargedToDo);
      console.log("low priority selected");
    });

    const priorityMedium = document.querySelector("#priority1");
    priorityMedium.addEventListener("click", () => {
      this.taskChangedCondition = true;
      this.column1.appendChild(currentTask);
      document.body.removeChild(this.enlargedToDo);
      console.log("Medium priority selected");
    });

    const priorityHigh = document.querySelector("#priority2");
    priorityHigh.addEventListener("click", () => {
      this.taskChangedCondition = true;
      this.column2.appendChild(currentTask);
      document.body.removeChild(this.enlargedToDo);
      console.log("high priority selected");
    });
    this.priorityChange();
    this.enableInputButtons(false);
  },

  //removes unwanted task re-assign buttons
  clearRogueContents() {
    const container = document.querySelector("#newContainer");
    const button1 = document.querySelector("#priority0");
    const button2 = document.querySelector("#priority1");
    const button3 = document.querySelector("#priority2");

    const rogueElements = [button1, button2, button3];

    for (let i = 0; i < rogueElements.length; i++) {
      if (container.contains(rogueElements[i])) {
        rogueElements[i].remove();
        console.log("rogue button deleted");
      }
    }
  },

  enableInputButtons(value) {
    const inputs = [this.enter, this.clear, this.createTask];
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = value;
    }
    console.log("inputs enabled");
  },

  //deletes all outstanding tasks
  deleteToDos() {
    this.clearAllTasks.id = "wipeAll";
    this.clearAllTasks.innerText = "DELETE ALL TASKS";
    const deleteAll = document.querySelector("#wipeAll");
    document.body.appendChild(this.clearAllTasks);
    this.clearAllTasks.addEventListener("click", () => {
      this.deleteQuestion();
      localStorage.clear();
    });
    console.log("delete all appended");
  },

  clearLocalStorage() {
    if (
      (this.column0.innerHTML = "") &
      (this.column1.innerHTML = "") &
      (this.column2.innerHTML === "")
    ) {
      localStorage.clear();
    }
  },

  //function that presents two choices when "DELETE ALL TASKS" is pressed
  deleteQuestion() {
    const text = makeDiv();
    text.id = "textBox";
    text.innerText = "Are You Sure ?";

    const buttonBox = makeDiv();

    this.yesResponse.id = "yesResponse";
    this.yesResponse.innerText = "Yes";

    this.noResponse.id = "noResponse";
    this.noResponse.innerText = "No";

    this.questionBox.id = "question";

    document.body.removeChild(this.clearAllTasks);
    document.body.appendChild(this.questionBox);
    this.questionBox.appendChild(text);
    this.questionBox.appendChild(this.yesResponse);
    this.questionBox.appendChild(this.noResponse);
  },

  //function for "No" event
  responseNo() {
    this.noResponse.addEventListener("click", () => {
      const innerContent = document.querySelector("#question");
      document.body.removeChild(innerContent);
      document.body.appendChild(this.clearAllTasks);
      this.questionBox.innerHTML = "";
      console.log("no clicked");
    });
  },

  //function for "Yes" event
  responseYes() {
    this.yesResponse.addEventListener("click", () => {
      console.log("yes clicked");
      const columns = [this.column0, this.column1, this.column2];

      for (let i = 0; i < columns.length; i++) {
        columns[i].innerHTML = "";
      }
      localStorage.clear();
      this.priorityL = null;
      this.priorityM = null;
      this.priorityH = null;
      window.location.reload();
    });
  },

  init() {
    this.defaultState();
    this.generateForm();
    this.makeOutstandingColumns();
    this.transferInput();
    this.clearInput();
    this.closeEnlarged();
    this.reAssignTask();
    this.removeButtons2();
    this.taskDelete.addEventListener("click", () => {
      this.taskToDelete();
    });
    this.deleteToDos();
    this.responseNo();
    this.responseYes();
    window.addEventListener("load", () => {
      this.retrieveFromStorage();
      this.writeToColumns();
      //this.extractFromlocalStorage();
    });
  },
};

toDo.init();
