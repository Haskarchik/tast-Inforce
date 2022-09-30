import React, { useRef, useEffect, useState } from "react";
import { onValue, ref, remove, set } from "firebase/database";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import "./list.css";
import Modal from "../modal/Modal";
import { async } from "@firebase/util";

export default function List() {
  let list = [];
  let add = [];
  const [sorted, setsorted] = useState()
    const [modalActive, setmodalActive] = useState(false)
  const [todos, setTodos] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const sortByName = () => {
    let sortItems;
    
    if (todos[0].name.localeCompare(todos[1].name)  === 1) {
      sortItems = todos.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sortItems = todos.sort((a, b) => b.name.localeCompare(a.name));
    }

    sortItems.forEach((el) => {
      list.push(
        <div className="table-row">
          <div className="main-info">
            <div className="name"> {el.name}</div>
            <div className="date">{el.count}</div>
          </div>
          <div className="status">{el.weight} </div>
          <span>
           
            <button className=" view">
            
              <Link key={el.id} to={"/item/" + el.id}>
              View
              </Link>
            </button>
            <button
            className=" deleate"
              onClick={(e) => {
                deleateItem(el);
              }}
            >
              Deleate
            </button>
          </span>
        </div>
      );

      setsorted(list)
    });

    
  }



  const sortByCount = () => {
    let sortItems;
    if (todos[0].count.localeCompare(todos[1].count) === 1) {
      console.log('hi');
      sortItems = todos.sort( (a, b) => {
        if (Number(a.count)  < Number(b.count)) {
          return -1;
        }
      });
    } else {
      console.log('hi');

      sortItems = todos.sort( (a, b) => {
        if (Number(a.count)  > Number(b.count)) {
          return -1;
        }
      });
    }
    sortItems.forEach((el) => {
      list.push(
        <div className="table-row">
          <div className="main-info">
            <div className="name"> {el.name}</div>
            <div className="date">{el.count}</div>
          </div>
          <div className="status">{el.weight} </div>
          <span>
           
            <button className=" view">
            
              <Link key={el.id} to={"/item/" + el.id}>
              View
              </Link>
            </button>
            <button
            className=" deleate"
              onClick={(e) => {
                deleateItem(el);
              }}
            >
              Deleate
            </button>
          </span>
        </div>
      );

      setsorted(list)
  

            })
  }

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (isInitialRender) {
        setIsInitialRender(false);
        setTodos([]);
      }
      if (data !== null && data !== 0) {
        Object.values(data).map((todo) => {
          if (isInitialRender) {
            setIsInitialRender(false);
            setTodos((oldArray) => [...oldArray, todo]);
          }
        });
      }
    });
  });

   const deleateItem = (el) => {
    
 
   remove(ref(db, String(el.id)));
  };

 
  todos.forEach((el) => {
    list.push(
      <div className="table-row">
        <div className="main-info">
          <div className="name"> {el.name}</div>
          <div className="date">{el.count}</div>
        </div>
        <div className="status">{el.weight} </div>
        <span>
         
          <button className=" view">
          
            <Link key={el.id} to={"/item/" + el.id}>
            View
            </Link>
          </button>
          <button
          className=" deleate"
            onClick={(e) => {
              deleateItem(el);
            }}
          >
            Deleate
          </button>
        </span>
      </div>
    );
  });
 
  return (
    <>
    
      <div className="table">
        <div className="table-row main-row">
          <div className="main-info-row">
            <div className="name main" onClick={sortByName}>NAME</div>
            <div className="date main" onClick={sortByCount}>COUNT</div>
          </div>
          <div className="status main">WEIGHT</div>
          <div>
            <button onClick={e=>{
              setmodalActive(true)
            }}>Add item</button>
          </div>
        </div>
        {list}
      </div>
      <Modal active={modalActive} setActive={setmodalActive} isCount={''}></Modal>
      
    </>
  );
}
