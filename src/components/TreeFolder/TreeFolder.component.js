import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ViewerActions from '../Viewer/Viewer.actions'

import Style from './TreeFolder.module.scss'
import Tree from '@naisutech/react-tree'

class Actions extends React.Component{

  constructor(){
    super(...arguments)

    this.state = {
      nodes: [
        {
          'id': 1,
          'parentId': null,
          'label': '',
          'items': null
        }
      ]
    }
  }

  componentDidMount() {
    this.props.fetchDirectories(this.props.viewerType)    
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

  onDirectoriesChanged(oldValue, value) {
    let nodes = []
    if (value !== null && value.length > 0) {
      this.directoryToNode(value, null, nodes, '')
      this.setState({nodes: nodes})
    }
  }
  
  directoryToNode(directories, parentId, nodes, path) {
    directories.forEach(d => {
      let node = {
        label: d.text,
        id: d.id,
        parentId: parentId,
        path: path === '' ? d.id : path  + '/' + d.id,
        items: null
      }
      nodes.push(node)
      this.directoryToNode(d.children, d.id, nodes, node.path)
    })
  }

  onSelect = (selectedNode) => {
    if (selectedNode.path) {
      this.props.setNode(selectedNode)
    }
  }

  render() {
    return (
      <div className={Style.TreeFolder}>
        <Tree nodes={this.state.nodes}
          noIcons={true}
          isLoading={true}
          theme={'light'}
          onSelect={this.onSelect}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ ...state.Viewer })
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...ViewerActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
