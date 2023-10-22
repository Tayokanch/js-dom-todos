const form = document.querySelector('form')
const todoParentContainer = document.querySelector('div:last-of-type')
const todoListContainer = document.querySelector('ul');
const root = 'http://localhost:3001';

const state = {
    lists : [
        
    ]
}

//second
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

//First you fetch
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
 

