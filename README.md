# Phototheque

Image gallery viewer in React. You can find a demo here : [Bibliothèque numérique](https://tyarcaouen.synology.me/bibliotheque/).
Comments ca be added to the photos when using phototheque mode. Comments need a MySql database.

## Source code description
* src : contains react source code for the viewer
* api : contains php backend source code. The curl sub directory contains api call examples

## Available Scripts

In the project directory, you can run:

### `npm run preBuild {mode}`

Change de source code to use phototheque (admin can add comments to the photos) ou bibliotheque mode (only photos)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
