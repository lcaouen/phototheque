import React from 'react'
import { connect } from 'react-redux'
import Style from './Header.module.scss'
import { Top, Right, Fill } from 'react-spaces'
import MenuComponent from './Menu/Menu.component'

class Header extends React.Component{

  constructor(){
    super(...arguments)
    this.state = { }
  }

  static Menu = MenuComponent

  render() {
    return (
      <Top size='30px' className={Style.Navbar}>
        <Fill>
          <this.props.icon size='24px' className={Style.Icon + ' ml-3'}/> {this.props.title}
        </Fill>
        <Right size='50%' centerContent='vertical' className='text-right mr-3'> 
          {this.props.children}
        </Right>
      </Top>
    )
  }
}

export default connect()(Header)
