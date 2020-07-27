$(() => {
    
var addButton = document.getElementById('addButton');
var addInput = document.getElementById('itemInput');
var todoList = document.getElementById('todoList');
var listArray = '';

//function to change the dom of the list of todo list
var createItemDom =  (description, id) => {

    let listItem = `<li>
    <label>${description}</label>

        <button id="${id.toString()}" class="btn btn-success update">Update</button>
        <button id="${id.toString()}" class="btn btn-danger delete">Delete</button>
    </li>`

    return listItem;
}

// Page updater function defintion

var updater = (data) => {  // requires list of objects
    todoList.innerHTML = ''
    listArray = ''
    data.forEach(element => {
        listArray = listArray + (createItemDom(element.description, element.id))
        todoList.innerHTML = listArray
    });

    deleteButtons = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', (e)=>{
            //delete and item from the list
            let id = e.target.id
            
            //call to delete method of route needs to return the data list
            $.ajax({
                url: 'api/' + id,
                method: 'DELETE',
                success: updater
              }); 
        })
    }

    updateButtons = document.getElementsByClassName('update')
    for (let i = 0; i < updateButtons.length; i++) {
        updateButtons[i].addEventListener('click', (e)=>{
            //delete and item from the list
            let id = e.target.id
            let description = document.getElementById('itemInput').value
            
            //call to patch method of route needs to return the data list
            $.ajax({
                url: 'api/' + description + '/' + id,
                method: 'patch',
                success: updater
              });
            document.getElementById('itemInput').value = ''
        })
    }
}

addButton.addEventListener('click', (e)=>{
    //add a todo item to the list
    let item = document.getElementById('itemInput').value
    
    $.post('/api/', {item: item}, (data, status) => {
        // console.log(`status ${status}`)
        // console.log(`data: ${data}`)
        updater(data)
        document.getElementById('itemInput').value = ''
    })
})

fetch('/api')
    .then(response => response.json()) // data is already sent as json object
    .then(data => {
        // console.log(data);
        updater(data)
    });
})