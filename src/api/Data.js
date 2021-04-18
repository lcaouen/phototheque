import axios from 'axios'
import cookie from 'react-cookies'

/* eslint-disable no-console */
export default {
  async getDirectories(root) {
    return await this.request('get', process.env.REACT_APP_DATA_URI.replace('localhost', window.location.hostname), '/api/phototheque/getSubDirs.php', {
      root: root
    })
  },

  async getImages(root, dir) {
    return await this.request('get', process.env.REACT_APP_DATA_URI.replace('localhost', window.location.hostname), '/api/phototheque/getFiles.php', {
      root: root,
      dir: dir
    })
  },

  async getRights() {
    return await this.request('get', process.env.REACT_APP_DATA_URI.replace('localhost', window.location.hostname), '/api/phototheque/getRights.php', cookie.loadAll())
  },

  async setComment(imageName, description) {
    return await this.request('post', process.env.REACT_APP_DATA_URI.replace('localhost', window.location.hostname), '/api/phototheque/setComment.php', {imageName: imageName, description: description})
  },

  async request(method, baseUri, uri, data){
    console.log(`${method.toUpperCase()} ${baseUri}${uri}`, data)

    if (method === 'get') {
      data = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        params: data
      }
    }
    
    let start = Date.now()
    return await axios[method](`${baseUri}${uri}`, data)
      .then(response => {
        let end = Date.now()
        console.log('duree', end - start)
        //console.log('=>', response)
        return response.data
      })
      .catch(error => console.log(error))
  },
}