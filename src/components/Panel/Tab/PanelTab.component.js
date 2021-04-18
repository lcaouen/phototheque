import React from 'react'
import { connect } from 'react-redux'
import Style from './PanelTab.module.scss'
import { Top } from 'react-spaces'
import * as Fa from 'react-icons/fa'

class PanelTab extends React.Component{

  static defaultProps = {
    icon: Fa.FaAddressBook,
    children: '',
    onClick: () => {}
  }

  constructor(){
    super(...arguments)
    this.state = {
    }
  }

  render() {
    return (
      <Top size='40px' centerContent='vertical' 
        onClick={e => this.props.onClick(e.target.value)}
        className={Style.PanelTab + ' ' + (this.props.selected ? Style.Active : '')}>
        <this.props.icon size='16px' className={Style.Icon}/>
      </Top>
    )
  }
}

export default connect()(PanelTab)
