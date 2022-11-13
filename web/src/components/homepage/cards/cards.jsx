import React, {useState} from 'react'
import './cards.scss'
import {Link} from 'react-router-dom'

export default function Cards({title, action, cards, cards2, cards3, cards4, cards5}) {
  const [isToggle, setisToggle] = useState(false);

  return (
    <div className='cards' style={{backgroundColor: isToggle ? '#B5D99C': ''}} onClick={() => setisToggle((curr)=> !curr)}>
      <div className='fontCards'>{title}</div>
      <div className='descriptionCards' >{action}</div>
      <button className='chooseCards' style={{color: isToggle ? '#3A4065': ''}} onClick={() => setisToggle((curr)=> !curr)}>{cards}</button>
      <button className='chooseCards2' style={{color: isToggle ? '#3A4065': ''}} onClick={() => setisToggle((curr)=> !curr)}>{cards2}</button>
      <button className='chooseCards2' style={{color: isToggle ? '#3A4065': ''}} onClick={() => setisToggle((curr)=> !curr)}>{cards3}</button>
      <button className='chooseCards2' style={{color: isToggle ? '#3A4065': ''}} onClick={() => setisToggle((curr)=> !curr)}>{cards4}</button>
    </div>
  )
}
