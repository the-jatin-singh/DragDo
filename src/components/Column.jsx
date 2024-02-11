import React, { useState } from 'react'
import { Item } from './Item';
import DragIndicator from './DragIndicator';
import AddItem from './AddItem';

export const Column = ({title, titleColor, column, items, setItems}) => {

    const [active, setActive] = useState(false);



    const handleDrag = (e, item) => {
        e.dataTransfer.setData("itemID",item.id )
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        handleIndicators(e);
        setActive(true);
    }
    
    const handleIndicators = (e) => {
        const indicators = getIndicators();
        clearHighlights(indicators);
        const el = getNearestIndicator(e, indicators);
        el.element.style.opacity = "1";
    }

    const clearHighlights = (els) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        })
    }

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;
    
        const el = indicators.reduce(
          (closest, child) => {
            const box = child.getBoundingClientRect();
    
            const offset = e.clientY - (box.top + DISTANCE_OFFSET);
    
            if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
            } else {
              return closest;
            }
          },
          {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
          }
        );
    
        return el;
      };
    

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        clearHighlights()
        setActive(false)
    }

    const handleDragEnd = (e) =>{
        e.preventDefault()
        clearHighlights()
        setActive(false)

        const itemID = e.dataTransfer.getData("itemID");

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if(before !== itemID){
            let copy = [...items];

            let itemToTransfer = copy.find((item)=>item.id === itemID);

            if(!itemToTransfer) return;

            itemToTransfer = { ...itemToTransfer, column}

            copy = copy.filter((c)=>c.id !== itemID);

            const moveToBack = before === "-1";


            if (moveToBack){
                copy.push(itemToTransfer);
            }else{
                const insertAtIndex = copy.findIndex((el)=> el.id === before);
                if(insertAtIndex === undefined) return ;
                copy.splice(insertAtIndex, 0 , itemToTransfer);
            }
            setItems(copy);
        }
    }

    const filteredItems = items.filter((item)=> item.column === column)

  return (
    <div className='select-none w-56 shrink-0 '>
        <div className='px-2 py-1 bg-neutral-800/50 rounded-xl mb-3 flex items-center justify-between'>
            <h2 className={`font-medium ${titleColor}`}>{title}</h2>
            <span className='text-sm text-neutral-300'>{filteredItems.length}</span>
        </div>

        {/* items div */}
        <div onDrop={handleDragEnd} onDragLeave={handleDragLeave} onDragOver={handleDragOver} className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
            {/* items */}
            {filteredItems.map((item)=>{
                return <Item handleDrag={handleDrag} key={item.id}{...item} />;
            })}
            <DragIndicator beforeID="-1" column={column} />
            <AddItem column={column} setItems={setItems} />
        </div>
    </div>
  )
}
