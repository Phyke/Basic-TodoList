// for accessing HTML Elements
const addButton = document.querySelector("#addButton");
const addDialog = document.querySelector("#addDialog");
const addDialog_input = addDialog.querySelectorAll("input");
const inputData = addDialog.querySelectorAll("input");
const itemListTable = document.querySelector("#item-container");

// global variable for counting to do items, also use for indexing
let itemCount = 0;

class item {
    constructor(name, due) {
        this.name = name;
        this.due = due;
    }
}

// function for creating a table row with 4 table cells
// cell 1 contains index number
// cell 2 contains name of to do item
// cell 3 contains due date of tto do item
// ceel 4 contains button for row deletion which will run deleteItem() function on click
function createHtmlElement_Item(item) {

    // create a table row with 4 table cells
    const newRow = document.createElement("tr");
    const d = new Array();
    for(let i = 0; i < 4; i++) {
        d[i] = document.createElement("td");
        newRow.appendChild(d[i]);
    }
    
    // assign respective value into each cell
    newRow.childNodes[0].innerHTML = 1 + itemCount++;
    newRow.childNodes[1].innerHTML = item.name;
    newRow.childNodes[2].innerHTML = item.due;
    const deleteButton = document.createElement("button");
    newRow.childNodes[3].appendChild(deleteButton);
    deleteButton.innerHTML = "X";
    deleteButton.setAttribute("class", "btn btn-danger");
    deleteButton.setAttribute("onclick", "deleteItem(this.parentElement.parentElement.rowIndex)");
    // this                             = button
    // this.parentElement               = table cell
    // this.parentElement.parentElement = table row
    console.log("A new item has been created");
    console.debug(newRow);
    return newRow;
}

// function for checking when user inserts a new item to the list
function isEmptyInput() {
    if(inputData[0].value == "" || inputData[1].value == "")
        return true;
    return false;
}

// function for clearing user inputs
// so the next time user wants to add a new item will not have the old input left
function clearDialogInput() {
    inputData[0].value = "";
    inputData[1].value = "";
    console.log("Both input has been cleared.");
}

// function for correcting index number after deletion of an item
function updateRunningNo() {
    itemCount--;
    for(let i = 0; i < itemListTable.childElementCount; i++)
        itemListTable.childNodes[i + 1].firstChild.innerHTML = i + 1;
    console.log("Index numbers have been updated");
}

function deleteItem(rowIndex) {
    //console.dir(itemListTable.childNodes[rowIndex + 1]);
    if(confirm("Do you want to delete " + (rowIndex))){
        itemListTable.childNodes[rowIndex].remove();
        console.log("item with index " + (rowIndex) + " has been deleted");
    }
    updateRunningNo();
}

addButton.addEventListener("click", e => {
    addDialog.showModal();
    console.log("Showing Dialog");
})

addDialog.querySelector("#cancelButton").addEventListener("click", e => {
    clearDialogInput()
    addDialog.close();
    console.log("Dialog Closed");
})

addDialog.querySelector("#confirmButton").addEventListener("click", e => {
    if(!isEmptyInput()){
        console.log("Valid input (Both not Empty)");
        const newItem = createHtmlElement_Item(new item(inputData[0].value, inputData[1].value));
        
        itemListTable.appendChild(newItem);
        console.log("A new item has been added to the list");
        clearDialogInput();
        addDialog.close();
        console.log("Dialog Closed");
    }
    else {
        console.warn("Invalid input (Empty value)");
        alert("Please insert valid input.");
    }
})