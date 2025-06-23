import React, {useState} from 'react';


const Test = () => {

  function toDos() {
    fetch('https://playground.4geeks.com/todo/users/steph-mos', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); 
        console.log(resp.status); 
        return resp.json(); 
      })
      .then(data => {
        
        console.log(data.todos); 
      })

  }

 

  function addTodo() {
    fetch('https://playground.4geeks.com/todo/todos/steph-mos', {
      method: "POST",
      body: {
        "label": "Comprar caramelo",
        "is_done": false
      },
      headers: {
        "Content-Type": "application/json"
      }
    })

    .then (resp => {
      console.log (resp.ok)
      console.log (resp.status)
    })
    .then (data =>{
      console.log(data)
    })

  }

  function deleteTodo() {
    
    fetch ('https://playground.4geeks.com/todo/todos/steph-mos')
  }






return (
    <>


      <div className='container'>
        <h1>Test Api</h1>

        <button type="button" className='btn btn-success' onClick={toDos}>Mis tareas</button>
        <button type="button" className='btn btn-primary' onClick={addTodo}>Agregar tarea</button>
      </div>


    </>

  );
}

export default Test;

