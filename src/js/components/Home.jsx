import React, { useEffect, useState, } from "react";
import { IoClose } from "react-icons/io5";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");


  /* Función para ver mi lista de tareas desde la API */

  function getTodos() {
    fetch("https://playground.4geeks.com/todo/users/steph-mos")

      .then((response) => {
        console.log(response);
        if (response.ok == false) {
          throw new Error(`Error ${response.status}:${response.statusText} usuario incorrecto.`);
        }

        return response.json();
      })
      .then((dataTodos) => {
        console.log(dataTodos);
        setTodos(dataTodos.todos);
      })
      .catch((error) => {
        alert(error.message);
      })

  }

  /* Hook para renderizar mi lista de tareas */

  useEffect(() => {

    getTodos();

  }, [])

  /* Añadir una tarea */

  function addTasks() {
    let bodyData = {
      label: inputValue,
      is_done: false,
    };

    fetch("https://playground.4geeks.com/todo/todos/steph-mos", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })

      .then((data) => {
        console.log(data);
        setInputValue("");
        getTodos();
      })

      .catch((error) => {
        alert(error.message);
      });
  }

 /* Eliminar una tarea */

  function Delete(index) {
    const item = todos[index];
    fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) throw new Error(`error ${response.status}:${response.statusText}`);
        getTodos();
      })
      // .catch((error) => alert(error.message));
  }


  return (
    <>

      <div className="container-fluid todolist">

        <h1 className="text-center mt-5">Todos</h1>

        <input

          type="text"
          className="items col-auto"
          placeholder="Añadir nueva tarea"
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && inputValue !== "") {
              setTodos([...todos]);
              addTasks();
            }
          }}
          value={inputValue}

        />

        {todos.map((todo, index) => {
          return (

            <ul
              className="list-group px-5 my-3">
              <li className="items col-auto"
              >{todo.label}

                <button className="delete-button"
                  onClick={() => Delete(index)}>X
                </button>

              </li>

            </ul>
          );
        })}
      </div>
      <div className="tarjeta-1"> </div>
      <div className="tarjeta-2"> </div>
    </>
  );
};

export default Home;
