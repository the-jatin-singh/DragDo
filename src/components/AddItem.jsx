import { useState } from "react"
import { FiPlus } from "react-icons/fi"

import {motion} from 'framer-motion';


const AddItem = ({column, setItems}) => {

    const [text,setText] = useState("")
    const [show,setShow] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!text.trim().length) return;

        const newItem = {
            column,
            title: text.trim(),
            id:Math.random().toString(),
        };

        setItems((pv)=>[...pv, newItem]);
        setText("")
        setShow(false);
    };

  return (
    <>
        {show? (
        <motion.form layout onSubmit={handleSubmit}>
            <textarea 
                onChange={(e) => setText(e.target.value)}
                autoFocus
                placeholder="Add a task..."
                className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
            <div className="select-none mt-1.5 flex items-center justify-end gap-1.5">
                <button 
                onClick={()=>setShow(false)}
                className=" px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
                >Close</button>
                <button 
                type="submit"
                className="font-medium flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                >
                <span>Add</span>
                <FiPlus />
                </button>
            </div>
        </motion.form>

        ) : (
        <motion.button layout
        className="select-none flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        onClick={() => setShow(true)}>
            <span>Add</span>
            <FiPlus />
        </motion.button>
        )}
    </>
  )
}

export default AddItem