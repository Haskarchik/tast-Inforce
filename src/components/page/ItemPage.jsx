import React from "react";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import { onValue, ref, remove, set } from "firebase/database";
import "./itemPage.css";
import Modal from "../modal/Modal";

export default function ItemPage() {
  const draw = []
  const [modalActive, setmodalActive] = useState(false);

  const [todos, setTodos] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

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
  function removeComment(params,elId) {


    let com = Object.entries(params.comments)
   com.map((e)=>{ if (e[1].id == elId ) {
   remove(ref(db, e))
    
   } 
  })
}
  
  function comments (e) {
 let comments = []
  e.comments.forEach(el => {
    comments.push(

      <div>
        Coment at <span> {el.date } </span>
        <div>{el.description}</div>
        <button onClick={()=>{removeComment(e,el.id)}}> Deleate it</button>
      </div>
    )
  });
  return comments
}
  function goDraw() {
    
    todos.forEach((e) => {
      if (e.id == window.location.pathname.slice(6)) {
        draw.push(
          <div key={e.id} className="item_block">
            <img src={e.imageUrl} alt="" />
            <div>Name : {e.name}</div>
            <div>count :{e.count}</div>
            <div>weight: {e.weight}</div>
            <div>height: {e.size.height}</div>
            <div>width: {e.size.width}</div>
            <button
              onClick={() => {
                setmodalActive(true);
              }}
              className="item_edit"
            >
              Edit
            </button>
  
            <div>comments: {comments(e) }</div>
          </div>
        );
             
      }
    });
    return draw
  }
  goDraw()

  return (
    <div>
      <div>
      {draw}

      </div>
      <Modal active={modalActive} setActive={setmodalActive} idCount={window.location.pathname.slice(6)}></Modal>
    </div>
  );
}
