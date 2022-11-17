import React, { useState, useEffect } from 'react';
import { v4 as Uuidv4 } from 'uuid';
import WishList from './components/WishList';
import WishInput from './components/WishInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';

/**
 * Main file, to create a HTML web with components.
 * @returns HTML formated with all the components used.
 */
function App() {
  //const [wishes, setWishes] = useLocalStorage("wishes", initialWishes);
  const [wishes, setWishes] = useState([
    { id: Uuidv4(), text: 'Aprender React', done: false },
    { id: Uuidv4(), text: 'Da de alta a los alumnos', done: true },
    { id: Uuidv4(), text: 'Preparar apuntes', done: false },
    { id: Uuidv4(), text: 'Desayunar', done: true },
  ]);

  //On Init, carga los datos almacenados al cargar la pagina.
  useEffect(() => {
    setWishes(JSON.parse(localStorage.getItem('wishes')) || initialWishes);
  }, []);

  //Guarda la lista de deseos cuando se modifica la lista de wishes
  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishes));
  }, [wishes]);


  return (
    <div className="container-fluid">
      <h1>My WishList</h1>
      <WishInput onNewWish={(newwish) => {
        setWishes([...wishes, newwish]);
      }}
      />
      <WishList
        wishes={wishes}
        onUpdateWish={(updateWish) => {
          // Metodo 1 para actualizar wish de la lista
          setWishes(wishes.map(wish =>
            (wish.id == updateWish.id) ? updateWish : wish
          ));

          // Metodo 2 para actualizar wish de la lista
          /*
          const updateWishes = [...wishes];
          const modifyWish = updateWishes.finf(wish => wish.id === updateWish.id);
          modifyWish.done = updateWish.done;
          setWishes(updateWishes);
          */
        }}
        onDeleteWish={(deleteWish) => {
          // Metodo 1 para Borrar un deseo de la lista
          setWishes((prevState) =>
            prevState.filter((wish) => deleteWish.id !== wish.id)
          )

        }} />
    </div>
  );
}

export default App;
