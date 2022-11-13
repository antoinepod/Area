import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

function Header() {

  return (
    <div className="header">
          <span className="title">AREA</span>
          <Link to="/" className="fontDifferentPage">Homepage</Link>
          <Link to="/createpage" className="fontDifferentPage">Create action</Link>
          {/* <Link to="/linkpage"className="fontDifferentPage">Link account</Link> */}
          <button className="signOut" onClick={() => { localStorage.clear(); window.location.href = '/login' }}>Sign out</button>
        </div>
  )
}

export default Header