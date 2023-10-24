const form = document.querySelector('form')
const todoParentContainer = document.querySelector('div:last-of-type')
const todoListContainer = document.querySelector('ul');
const root = 'http://localhost:3001';

const state = {
    lists : [
        
    ]
}

//second
// if the path has some data in it, then do this with the data
const renderList = ()=>{
    state.lists.forEach((list)=>{
  
        const todoList = document.createElement('li')

        todoList.innerText  = list.title
    
        if(list.completed){
            todoList.classList.add('completed')

        }
        else{
            todoList.classList.remove('completed')
        }
        todoListContainer.append(todoList)
     
    })
    
}

//First you make a fetch from the path
const fetchByGet = ()=>{
    //getting data from todos path
    fetch(`${root}/todos`)

    .then((response)=> response.json())

    .then((data)=> {
        state.lists = data
        renderList()
    })

}

//Third
//Post more data to the path and then call the second function to update the data on our webpage
const fetchByPost = ()=>{

    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        todoListContainer.innerHTML = ''
    
     
        formData = {
            title: e.target[0].value
        } 
        const options = {
            method : "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        } 
        
        fetch(`${root}/todos`, options)
        .then((response)=> response.json())
        .then(() =>{
            renderList()
        })
      
        .catch((err)=>console.log('There is an error in your code', err))
    })
}

fetchByPost()
fetchByGet()
 

