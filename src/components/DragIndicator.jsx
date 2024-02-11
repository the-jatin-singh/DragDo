import React from 'react'

const DragIndicator = ({beforeID, column}) => {
  return (
    <div 
    data-before={beforeID || "-1"}
    data-column={column}
    className='my-0.5 h-0.5 w-full bg-white opacity-0'>

    </div>
  )
}

export default DragIndicator