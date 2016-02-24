import React from 'react';
import { Link } from 'react-router'

const PopupPage = ({ children }) => (
  <div className="popup-page">
    <nav className="global-nav">
      <Link to="/">Return to Top</Link>
    </nav>
    { children }
  </div>
)

export default PopupPage
