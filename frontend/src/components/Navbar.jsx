import React from 'react'

const Navbar = () => {
  return (
    <Nav>
       <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
        </ul>
    </Nav>
  )
}

export default Navbar
