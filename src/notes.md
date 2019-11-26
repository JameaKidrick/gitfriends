`npm i`

`npx create-react-app gitfriends`

`npm i react-router-dom react-redux redux redux-thunk react-dom`

### _index.js_
```
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'react-redux';
import { reducer } from './reducers/reducer';
```