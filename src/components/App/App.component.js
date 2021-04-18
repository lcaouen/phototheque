/* eslint-disable no-undef */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ViewerActions from '../Viewer/Viewer.actions'

import Style from './App.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import * as Fa from 'react-icons/fa'
import { Fill, ViewPort, Layer, LeftResizable } from 'react-spaces'
import { Badge } from 'react-bootstrap'
import HeaderComponent from '../Header/Header.component'
import PanelComponent from '../Panel/Panel.component'
import Viewer from '../Viewer/Viewer.component'
import TreeFolder from '../TreeFolder/TreeFolder.component'
import Notifications from 'react-notify-toast'

class App extends React.Component{
  
  constructor(){
    super(...arguments)
    this.state = {
      // eslint-disable-next-line no-undef
      title: config.title,
      rights: null
    }
  }

  componentDidMount() {
    document.title = config.title
    this.props.fetchRights()
  }

  componentDidUpdate(prevProps) {
    Object.keys(prevProps).forEach((key) => {
      if (prevProps[key] !== this.props[key]) {
        let oldValue = prevProps[key]
        let value = this.props[key]
        if (typeof this[`on${key[0].toUpperCase()}${key.slice(1)}Changed`] === 'function') {
          this[`on${key[0].toUpperCase()}${key.slice(1)}Changed`](oldValue, value)
        }
      }
    })
  }

  onRightsChanged(oldValue, value) {
    if (value) {
      this.setState(
        {rights: value}
      )
    }
  }

  render(){
    return (
      <>
        <Notifications options={{zIndex: 999999, top: '50px'}} />
        <ViewPort>
          <HeaderComponent title={this.state.title} icon={Fa.FaMap}>
            <HeaderComponent.Menu>            
              <HeaderComponent.Menu.Popover icon={Fa.FaInfo} title='Info'>
                <div>
                  {config.title}
                  <br/>
                  {
                    this.state.rights && 
                  <div>
                    <Badge variant='primary'>{this.state.rights.userID}</Badge>
                    <br/>
                    <Badge variant='success'>{this.state.rights.loggedIn ? 'Connecté' : ''}</Badge>
                    <br/>
                    <Badge variant='warning'>{this.state.rights.isAdmin ? 'Admin' : ''}</Badge>
                  </div>
                  }
                </div>
              </HeaderComponent.Menu.Popover>
            </HeaderComponent.Menu>          
          </HeaderComponent>
          <Fill>
            <Layer zIndex={0}>
              <Fill className={Style.Background} />
            </Layer>
            {
              this.state.rights && this.state.rights.loggedIn &&
              <Layer zIndex={1000}>
                <LeftResizable size='30%'>
                  <TreeFolder/>
                </LeftResizable>
                <Fill>
                  <PanelComponent canHide={false} grey={true}>
                    <PanelComponent.Tab>
                      <Viewer rights={this.state.rights}/>
                    </PanelComponent.Tab>
                  </PanelComponent>
                </Fill>
              </Layer>
            }
            {
              this.state.rights && !this.state.rights.loggedIn &&
              <div>
                Vous n&apos;êtes pas connecté.
                <br/>
                Veuillez vous connecter sur la page adhérent.
              </div>
            }
          </Fill>
        </ViewPort>
      </>
    )
  }
}

const mapStateToProps = (state) => ({ ...state.Viewer })
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...ViewerActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
