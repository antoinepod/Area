import React from 'react'

export default function homepage() {
  return (
    <div>homepage
      <button onClick={()=>{localStorage.clear(); window.location.href = '/login'}}>Sign out</button>
    </div>
  )
}
