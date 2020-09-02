import React from 'react'
import './layout.styl'

export const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <header>
        <img src={config.business_logo} alt='logo' />
        <h2 className='business_name'>{config.business_name}</h2>
      </header>
      <main className='main-container'>
        {children}
      </main>
    </div>)
}
