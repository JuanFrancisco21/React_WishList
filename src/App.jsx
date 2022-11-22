import React, { useState, useEffect } from 'react';
import { v4 as Uuidv4 } from 'uuid';
import WishList from './components/WishList';
import WishInput from './components/WishInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';
import Navbar from './components/Navbar';

/**
 * Main file, to create a HTML web with components.
 * @returns HTML formated with all the components used.
 */
function App() {
  //Main list to storage all wishes used.
  const [wishes, setWishes] = useState([
    { id: Uuidv4(), text: 'Aprender React', done: false },
    { id: Uuidv4(), text: 'Da de alta a los alumnos', done: true },
    { id: Uuidv4(), text: 'Preparar apuntes', done: false },
    { id: Uuidv4(), text: 'Desayunar', done: true },
  ]);
  //value for filtered list by user text.
  const [searchWishes, setsearchWishes] = useState([]);

  //Var to change between two list, the main list and the search list.
  //const [searchMode, setSearchMode] = React.useState(false);

  //On Init, save list into navigatos localstorage.
  useEffect(() => {
    setWishes(JSON.parse(localStorage.getItem('wishes')) || wishes);
  }, []);

  //If the list wishes changes, it save in localstorage.
  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishes));
  }, [wishes]);


  return (
    <div className="container-fluid">

      <Navbar />

      <section>
        <WishInput
          oncreateNewWish={(newwish) => {
            setWishes([...wishes, newwish]);
          }}
          onSearchWish={(searchData) => {
            //Conditional where if is introduce text to search filter the list.
            if (searchData.text.length > 0) {
              const result = Object.values(wishes).filter((wish) => wish.text.toLowerCase()
                .includes(searchData.text.toLowerCase()));

              setsearchWishes(result);

              if (result.length <= 0) {
                setsearchWishes([{ id: Uuidv4(), text: 'Wish not found...', done: false }]);
              }
            } else {
              setsearchWishes((prevState) =>
                prevState.filter(() => false)
              );
            }
          }}
        />

        <WishList
          wishes={(searchWishes.length > 0) ? searchWishes : wishes}
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

      </section>
    </div>
  );
}

export default App;
