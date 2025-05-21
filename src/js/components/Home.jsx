import React, { useEffect, useState, } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

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
          throw new Error(`error ${response.status}:${response.statusText}`);
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
      .catch((error) => alert(error.message));
  }


  return (

    <form className="lista-tareas row g-3">
      <h1 className="text-center mt-5">Mi lista de tareas</h1>

      <input type="text"

        className="form-control col-auto"
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
            <li className="col-auto"
            >{todo.label}
              <button className="btn btn-sm pe-3"
                onClick={() => Delete(index)}>
                <FaRegTrashAlt size={25} color="white" />
              </button>
      
            </li>



          </ul>

        );
      })}

    </form>
  );
};

export default Home;
