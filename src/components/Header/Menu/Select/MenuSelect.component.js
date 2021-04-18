import React from 'react'
import { connect } from 'react-redux'
import Style from './MenuSelect.module.scss'

class MenuSelect extends React.Component{

  static defaultProps = {
    items: [],
    onChange: ()=>{}
  }

  constructor(){
    super(...arguments)
    this.state = {}
  }

  render() {
    return (      
      <div className={Style.SelectWrapper}>
        <select onChange={e => {this.props.onChange(e.target.value)}} className={Style.Select}>
          {this.props.items.map(item => 
            <option key={item}>{item}</option>
          )}
        </select>
      </div>      
    )
  }
}

export default connect()(MenuSelect)
