import React from 'react'
import './cards.scss'
import {Link} from 'react-router-dom'

export default function cards({title, action, reaction}) {
  return (
    <div className='cards'>
      <div className='fontCards'>{title}</div>
      <div className='descriptionCards'>{action}</div>
      <div className='descriptionCards'>{reaction}</div>
      {/* <Link to="/yougram" className="link">
          {title}
      </Link> */}
    </div>
  )
}
