import React from 'react'
import { connect } from 'react-redux'
import Style from './Panel.module.scss'
import { Fill, Left } from 'react-spaces'
import PanelTabComponent from './Tab/PanelTab.component'
import _ from 'lodash'

class Panel extends React.Component{

  constructor(){
    super(...arguments)
    this.state = {
      visible: true,
      initialWidth: 'calc(100% - 40px)',
      selected: 0
    }

  }

  static Tab = PanelTabComponent


  toggleVisible = () => {
    this.setState({ visible: !this.state.visible })
  }

  setSelected = (i) => {
    this.setState({selected: i !== this.state.selected || !this.props.canHide ? i : null}, () => {
      this.setState({ visible: this.state.selected !== null })
    })    
  }

  render() {
    let children = React.Children.map(this.props.children, (child, i) =>
      React.cloneElement(child, { 
        onClick: () => this.setSelected(i),
        selected: i === this.state.selected
      })
    )

    return (
      <Fill className={Style.Panel + ' ' + (this.props.grey ? Style.Grey : Style.White)} 
        style={{width: !this.state.visible ? '42px': this.state.initialWidth}}>
        <Left size={children.length === 1 && !this.props.canHide ? '0px' : '40px'} className='text-center'>
          {_.clone(children).reverse()}
        </Left>
        { !this.state.visible ? '' :
          <Fill className={Style.Content}>
            {this.state.selected != null && children[this.state.selected].props.children}
          </Fill>
        }        
      </Fill>
    )
  }
}

export default connect()(Panel)
