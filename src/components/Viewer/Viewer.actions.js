import Api from '../../api'
import {notify} from 'react-notify-toast'

export const fetchDirectories = (root) => (dispatch) => {
  Api.Data.getDirectories(root).then(data => {
    if (data) {
      dispatch({ type: 'DIRECTORIES_CHANGE', directories: data})
    }
  })
}

export const fetchImages = (root, dir) => (dispatch) => {
  Api.Data.getImages(root, dir).then(data => {
    if (data) {
      dispatch({ type: 'IMAGES_CHANGE', images: data})
    }
  })
}

export const fetchRights = () => (dispatch) => {
  Api.Data.getRights().then(data => {
    if (data) {
      dispatch({ type: 'RIGHTS_CHANGE', rights: data})
    }
  })
}

export const setComment = (imageName, description) => (/*dispatch*/) => {
  Api.Data.setComment(imageName, description).then(data => {
    notify.show(data ? 'Sauvegardé' : 'Erreur lors de la sauvegarde', data ? 'success' : 'error' , 5000)
  })
}

export const setNode = (node) => (dispatch) => {
  if (node) {
    dispatch({ type: 'NODE_CHANGE', node: node})
  }
}
