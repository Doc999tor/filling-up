import React from 'react'

import './header.styl'

const Header = () => (<header className='layout_header'>
  <img src={config.business_logo} alt='logo' />
  <h2 className='business_name'>{config.business_name}</h2>
</header>)

export default Header
