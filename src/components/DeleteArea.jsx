import React, { useState } from 'react';
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

const DeleteArea = ({setItems}) => {
    
    const [active,setActive] = useState(false)

    const handleDragOver = (e) => {
      e.preventDefault();
      setActive(true);
    }

    const handleDragLeave = () => {
      setActive(false)
    }

    const handleDrop = (e) => {
      const ItemID = e.dataTransfer.getData("itemID")
      
      setItems((prev)=>prev.filter((item)=>item.id !== ItemID))
      setActive(false)
    }

  return (
    
    <div
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${active?"border-red-700/80 bg-red-700/20 text-red-500":"border-neutral-500/70 bg-neutral-500/20 text-neutral-500"}`}>
        {active? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  )
}

export default DeleteArea; 