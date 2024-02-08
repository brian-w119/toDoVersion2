//this module creates new elements


function makeDiv(){
    return document.createElement("div");
};

function makeButton(){
    return document.createElement("button");
};

function makeInput(){
    return document.createElement("input");
};

function makeFormElement(){
    return document.createElement("textarea");
};

class InputField {
    constructor(name, value, placeholder) {
        this.name = "name";
        this.value = "value";
        this.inputPlaceholder = "placeholder";
    }
};

export{makeDiv, makeButton, makeInput, InputField, makeFormElement};