import {motion} from 'framer-motion';
import DragIndicator from './DragIndicator'

export const Item = ({title, id, column, handleDrag}) => {
  return (
    <>
    <DragIndicator beforeID={id} column={column} />
        <motion.div
        layout
        layoutId={id}
            draggable={true} 
            onDragStart={(e) => handleDrag(e, {title, id, column})}
            className='cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing'>
            <p className='text-sm text-zinc-100'>{title}</p>
        </motion.div>
    </>
  )
}
