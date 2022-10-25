import React, { useState } from 'react';
import WishList from './components/WishList';
import Wishinput from './components/Wishinput';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';

const initialWishes = [
  { text: 'Aprender React', done: false },
  { text: 'Da de alta a los alumnos', done: true },
  { text: 'Preparar apuntes', done: false },
  { text: 'Desayunar', done: true },
];

function App() {
  const [ wishes, setWishes ] = useState(initialWishes);
  return (
    <div className="container-fluid">
      <h1>My WishList</h1>
      <Wishinput onNewWish={(newwish) => {
        setWishes([...wishes, newwish]);
        console.log('Se ha lanzado el evento'+newwish.text+"  "+newwish.done)
      }}/>
      <WishList wishes={wishes} />
    </div>
  );
}

export default App;
