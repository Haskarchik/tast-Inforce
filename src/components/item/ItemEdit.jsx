import React from 'react'
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import { onValue, ref, set } from "firebase/database";

export default function ItemEdit({active,setActive,idCount}) {
  const [inputNAME, setInputNAME] = useState();

  const [inputCount, setInputCount] = useState();

  const [inputWeight, setInputWeight] = useState();

  const [inputImg, setInputImg] = useState();
  const [inputHeihgt, setInputHeight] = useState();
  const [inputwidth, setInputWidth] = useState('');

  const datas = useRef();

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();

      datas.current = data;
    });
  });

  async function setObj(idCount) {
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
      comments: ["CommentModel", "CommentModel"],
    }).then(() => {
      
      setInputNAME('')
      setInputCount('')
      setInputWeight('')
      setInputImg('')
      setInputHeight('')
      setInputWidth('')
    });
}
  }
  return (
   
        <div className="item_Add">
            <div>Edit item</div><br />
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
          type="text"
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
      <button className="button" onClick={()=>{setObj(idCount)}}  >Push</button>

    </div>
   
      
  )
}
