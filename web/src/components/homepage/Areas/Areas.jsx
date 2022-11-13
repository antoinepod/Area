import React from 'react'
import './Areas.scss'

function Areas({action, reaction}) {
  return (
    <div className='areas'>
        <h1 style={{
            color: 'rgba(252,70,107,1)',
        }}>
            {action}
        </h1>
        <h1 style={{
            color: 'rgba(63,94,251,1) ',
        }}>
            {reaction}
        </h1>
        
        </div>
  )
}

export default Areas