
import{createContext, useState} from 'react'
import {BrowserRouter, Route }from 'react-router-dom'

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/home";

export const TestContext = createContext({} as any);

function App() {
  const [value, setValue] = useState('teste')

  return (
    <BrowserRouter>
      <TestContext.Provider value ={{ value, setValue }}>
        <Route path ="/" exact component ={Home}></Route>
        <Route path ="/rooms/new" component ={NewRoom}></Route>
      </TestContext.Provider>
    </BrowserRouter>
  );
}

export default App;
