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

export{makeDiv, makeButton, makeInput};