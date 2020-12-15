import React from 'react'
import './layout.styl'

export const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <main className='main-container'>
        {children}
      </main>
    </div>)
}
