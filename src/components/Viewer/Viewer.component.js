import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Modal, Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import * as Fa from 'react-icons/fa'
import _ from 'lodash'

import * as ViewerActions from './Viewer.actions'
import Style from './Viewer.module.scss'

import ReactViewer from 'react-viewer'
import Gallery from 'react-photo-gallery'

class Viewer extends React.Component{
  constructor() {
    super(...arguments)
    
    this.commentRef = React.createRef()

    this.state = {
      rights: this.props.rights,
      visible : false,
      items: [],
      images: [],
      showModal: false,
      modalText: ''
    }
  }

  componentDidMount() {
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

  onNodeChanged(oldValue, value) {
    if (value) {
      this.setState(
        {node: value},
        () => this.props.fetchImages(this.props.viewerType, value.path)
      )
    }
  }

  onImagesChanged(oldValue, value) {
    if (value === null) return
    let images = value
    images.splice(0, 1)
    images = images.map(this.getItem)
    this.setState({images: images})

    let items = images.slice(0,4).map(i => {
      return {
        src: i.src,
        width: 4,
        height: 3
      }
    })
    items.push({
      src: '',
      alt: `${images.length} IMAGES`,
      width: 4,
      height: 3
    })
    this.setState({items: items})
  }

  onRightsChanged(oldValue, value) {
    if (value) this.setState({rights: value})
  }

  getItem = (i) => {
    let src = process.env.REACT_APP_DATA_URI.replace('localhost', window.location.hostname)
    src += '/'  + this.props.viewerType + '/' + this.state.node.path + '/' + i[0]
    src = encodeURI(src)
    return {
      src: src,
      alt: i[3] ? i[3] + '\n' : i[0] + '\n',
      name: i[0]
    }
  }

  addIcon(parent) {
    let texte = parent.innerHTML
    if (!texte.includes('</div>')) {
      let p = document.createElement('div')
      let el = parent.insertBefore(p, parent.firstChild)
      ReactDOM.render(<Fa.FaPen color='#FF6A00'/>, el)
    }
  }

  addTitle(parent) {
    let texte = parent.innerHTML
    if (!texte.includes('</div>')) {
      let p = document.createElement('div')
      let el = parent.insertBefore(p, parent.firstChild)
      ReactDOM.render(<Fa.FaPen color='#FF6A00'/>, el)
    }
  }

  getComment() {
    let texte = 'Aucun texte trouvé'
    let elements = document.getElementsByClassName('react-viewer-attribute')
    if (elements && elements.length > 0) {
      texte = elements[0].innerHTML
      if (texte.includes('<span')) {
        texte = texte.split('<span')[0]
        if (texte.includes('</div>')) {
          texte = texte.split('</div>')[1]
        }
      }
    }
    
    return texte.trim()
  }

  saveComment = () => {
    let image = this.getImage()
    if (image !== '') {
      image = image.replace(/.*\/images/, './images')
      let images = _.cloneDeep(this.state.images)
      images.forEach(i => {
        if (i.src.replace(/.*\/images/, './images') === image)
          i.alt = this.commentRef.current.value + '\n'
      })
      this.setState({images: images})
      
      image = decodeURI(image)
      this.props.setComment(image, this.commentRef.current.value)
    }
    this.closeModal()
  }

  getImage() {
    let image = ''
    let elements = document.getElementsByClassName('react-viewer-image drag react-viewer-image-transition')
    if (elements && elements.length > 0) {
      image = elements[0].src
    }
    
    return image
  }

  showViewer(visible) {
    if (this.state.images.length > 0) {
      this.setState({visible: visible})
      setTimeout(() => {
        let elements = document.getElementsByClassName('react-viewer-attribute')
        if (elements && elements.length > 0) {
          if (visible && this.state.rights && this.state.rights.isAdmin) {
            elements[0].onclick = this.showModal
            this.addIcon(elements[0])
          }
        }
      }, 400)
    }
  }

  closeModal = () => {
    this.setState({showModal: false})
  }

  showModal = () => {
    let texte = this.getComment()
    this.setState({showModal: true, modalText: texte})
  }

  render() {
    return (
      <div className={Style.Viewer} >
        <div className={Style.Gallery} >
          <Gallery photos={this.state.items} onClick={() => this.showViewer(true)} />
        </div>
        <ReactViewer
          visible={this.state.visible}
          zoomSpeed='0.2'
          scalable={false}
          onClose={() => { this.showViewer(false) } }
          onMaskClick={() => { this.showViewer(false) } }
          images={this.state.images}/>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Modification du commentaire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Control as='textarea'
                ref={this.commentRef}
                rows={10}
                defaultValue={this.state.modalText} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={this.saveComment}>
            Enregistrer
            </Button>
            <Button variant='secondary' onClick={this.closeModal}>
            Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ ...state.Viewer })
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...ViewerActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
