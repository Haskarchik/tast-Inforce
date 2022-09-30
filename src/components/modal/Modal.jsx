import React from 'react'
import Item from '../item/Item'
import ItemEdit from '../item/ItemEdit'


import modal from './modal.module.css'


export default function Modal({active,setActive,idCount}) {

  return (
    <div className= {active ? modal.modal +' '+ modal.active : modal.modal} onClick={()=>setActive(false)}>
        <div className={modal.modal_content} onClick={(e)=>e.stopPropagation()}>

        {  idCount ? <ItemEdit idCount={idCount}></ItemEdit> : <Item></Item>}
   
    
        </div>
    </div>
  )
}
