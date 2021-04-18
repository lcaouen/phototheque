const initialState = {
  // eslint-disable-next-line no-undef
  viewerType: config.viewerType,
  directories: null,
  images: null,
  rights: null,
  node: null
}

export default function Viewer(state = initialState, action) {
  switch (action.type) {

  case 'DIRECTORIES_CHANGE':
    return {
      ...state,
      directories: action.directories
    }
      
  case 'IMAGES_CHANGE':
    return {
      ...state,
      images: action.images
    }
            
  case 'RIGHTS_CHANGE':
    return {
      ...state,
      rights: action.rights
    }
              
  case 'NODE_CHANGE':
    return {
      ...state,
      node: action.node
    }
            
  default:
    return state
  }
}
