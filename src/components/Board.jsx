import React, { useEffect, useState } from 'react'
import { Column } from './Column';
import {DEFAULT_ITEMS} from '../utils/index'
import DeleteArea from './DeleteArea';

const Board = () => {

    const [items, setItems] = useState([]);
    const [checked, setChecked] = useState(false);

    useEffect(()=>{
        checked && localStorage.setItem("dragdoitems", JSON.stringify(items));

    },[items])

    useEffect(()=>{
        const itemsData = localStorage.getItem("dragdoitems")

        setItems(itemsData ? JSON.parse(itemsData) : [])

        setChecked(true)
    },[])

    return (
      <div className='flex h-full w-full gap-3 overflow-scroll p-12'>

        <Column
            title="BACKLOG"
            column="backlog"
            titleColor="text-gray-400"
            items={items}
            setItems={setItems}
        />
        <Column
            title="TODO"
            column="todo"
            titleColor="text-yellow-400"
            items={items}
            setItems={setItems}
        />
        <Column
            title="IN PROGRESS"
            column="doing"
            titleColor="text-blue-400"
            items={items}
            setItems={setItems}
        />
        <Column
            title="COMPLETED"
            column="done"
            titleColor="text-emerald-400"
            items={items}
            setItems={setItems}
        />

        <DeleteArea setItems={setItems} />

      </div>
    )
}

export default Board 