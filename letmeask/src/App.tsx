
import {BrowserRouter, Route, Switch }from 'react-router-dom'

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/home";
import { Room } from "./pages/Room"


import{ AuthContextProvider} from './contexts/AuthContext';


function App() {
  

  return (
    <BrowserRouter>
      < AuthContextProvider>
        <Switch>
          <Route path ="/" exact component ={Home}></Route>
          <Route path ="/rooms/new" component ={NewRoom}></Route>
          <Route path ="/rooms/:id" component ={Room}></Route>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
