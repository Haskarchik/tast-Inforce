import React from "react";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import { onValue, ref, set } from "firebase/database";
import "./item.css";

export default function Item() {
  const [inputNAME, setInputNAME] = useState();

  const [inputCount, setInputCount] = useState();

  const [inputWeight, setInputWeight] = useState();
  const [inputCom, setInputCom] = useState();

  const [inputImg, setInputImg] = useState();
  const [inputHeihgt, setInputHeight] = useState();
  const [inputwidth, setInputWidth] = useState("");

  const datas = useRef();
  const comments = useRef([])

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();

      datas.current = data;
    });
  });

  async function setObj() {
    if (
      !inputImg ||
      !inputNAME ||
      !inputCount ||
      !inputwidth ||
      !inputHeihgt ||
      !inputWeight
    ) {
      alert("Write all inputs");
    } else {
      let idCount = 0;
      if (datas.current == null) {
        idCount = "0";
      } else {
        idCount = String(Object.keys(datas.current).length);
      }
      set(ref(db, idCount), {
        id: idCount,
        imageUrl: inputImg,
        name: inputNAME,
        count: inputCount,
        size: {
          width: inputwidth,
          height: inputHeihgt,
        },
        weight: inputWeight,
        comments: comments.current,
      }).then(() => {
        setInputNAME("");
        setInputCount("");
        setInputWeight("");
        setInputImg("");
        setInputHeight("");
        setInputWidth("");
      });
    }
  }
  return (
    <div className="item_Add">
      <div>Add item</div>
      <br />
      <div className="input_block">
        Name
        <input
          className="input"
          type="text"
          value={inputNAME}
          onChange={(event) => setInputNAME(event.target.value)}
          placeholder="Name"
        />
      </div>
      <div className="input_block">
        Count
        <input
          className="input"
          type="number"
          value={inputCount}
          onChange={(event) => setInputCount(event.target.value)}
          placeholder="Count"
        />
      </div>
      <div className="input_block">
        Weihgt
        <input
          className="input"
          type="text"
          value={inputWeight}
          onChange={(event) => setInputWeight(event.target.value)}
          placeholder="Weight"
        />
      </div>
      <div className="input_block">
        Img url
        <input
          className="input"
          type="text"
          value={inputImg}
          onChange={(event) => setInputImg(event.target.value)}
          placeholder="Img URL"
        />
      </div>
      <div className="input_block size">
        <span> size</span>
        Height
        <input
          className="input"
          type="text"
          value={inputHeihgt}
          onChange={(event) => setInputHeight(event.target.value)}
          placeholder="Height"
        />
        Weidth
        <input
          className="input"
          type="text"
          value={inputwidth}
          onChange={(event) => setInputWidth(event.target.value)}
          placeholder="Weight"
        />
      </div>
      <button
        className="button"
        onClick={() => {
          setObj();
        }}
      >
        Push item
      </button>
      <div className="input_block">
        Comments
        <input
          className="input"
          type="text"
          value={inputCom}
          onChange={(event) => setInputCom(event.target.value)}
          placeholder="Comment"
        />
      </div>
      <button onClick={()=>{
       let id = Math.random()
        comments.current.push(
          id = {
            "id": id,
            "productId": Math.random(),
            "description": inputCom,
            "date": new Date().toLocaleDateString()
            }
        )
        console.log(comments.current);
      }}> Comment</button>
    </div>
  );
}
