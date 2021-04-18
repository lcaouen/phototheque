import React from 'react'
import { connect } from 'react-redux'
import Style from './MenuPopover.module.scss'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { FaAd } from 'react-icons/fa'

class MenuPopover extends React.Component{

  static defaultProps = {
    title: '',
    icon: FaAd,
    children: ''
  }

  constructor(){
    super(...arguments)
    this.state = { }
  }

  render() {
    return (
      <OverlayTrigger trigger={['hover', 'hover']} delay={{show: 100, hide: 200}} 
        placement='bottom' 
        overlay={
          <Popover>
            <Popover.Title as='h3'>{this.props.title}</Popover.Title>
            <Popover.Content>
              {this.props.children}
            </Popover.Content>
          </Popover>
        }>
        <div className={Style.Container}>
          <this.props.icon size='12px' className={Style.Icon + ' mr-3 ml-3'} title={this.props.title}/>
        </div>
      </OverlayTrigger>
    )
  }
}


export default connect()(MenuPopover)

