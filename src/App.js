import { useEffect, useRef ,useState} from 'react';
import './App.css';
import {db} from './components/firebase/firebase'
import { onValue, ref, set } from "firebase/database";
import List from './components/list/List';
import Item from './components/item/Item';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modal from './components/modal/Modal';
import ItemPage from './components/page/ItemPage';



function App() {
  const [inputValue, setInputValue] = useState()
  const [inputValue2, setInputValue2] = useState()

  const [inputValue3, setInputValue3] = useState()

  const [inputValue4, setInputValue4] = useState()

  const datas = useRef()

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
    
      datas.current  = data
    });
  })

  

  async function setObj() {

    let idCount = 0
    if( datas.current == null) {
    idCount = '0'
    }
    else {
      idCount = String(Object.keys(datas.current).length)  
    }
   set(ref(db, idCount ),{
    id: idCount ,
    "imageUrl": "some url here",
    "name": inputValue2,
    "count": inputValue3,
    "size": {
    "width": 200,
    "height": 200
    },
    "weight": inputValue4,
    "comments": ["CommentModel", "CommentModel"]
    })
   .then(()=>{
    console.log('sucsesful', datas.current);
   }
   )
   console.log(datas.current);
   console.log(Object.keys(datas.current))
  }

  
  return (
  
   
     <BrowserRouter>
     <Routes>
       
       <Route path="/" element={<List />} />
       <Route path="/item/:id" element={<ItemPage/>} />
       
     
     </Routes>
   </BrowserRouter>
   
  );
}

export default App;
