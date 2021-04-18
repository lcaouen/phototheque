import React from 'react'
import { connect } from 'react-redux'
import Style from './Menu.module.scss'
import MenuPopoverComponent from './Popover/MenuPopover.component'
import MenuSelectComponent from './Select/MenuSelect.component'

class Menu extends React.Component{

  constructor(){
    super(...arguments)
    this.state = { }
  }

  static Popover = MenuPopoverComponent
  static Select = MenuSelectComponent

  render() {
    return (
      <div className={Style.Menu }>
        {this.props.children}
      </div>
    )
  }
}

export default connect()(Menu)
