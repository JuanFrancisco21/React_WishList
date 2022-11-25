import React, { useState, useEffect } from 'react';
import { v4 as Uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';
import WishList from './components/WishList';
import WishInput from './components/Wishinput';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';
import Navbar from './components/Navbar';

/**
 * Main file, to create a HTML web with components.
 * @returns HTML formated with all the components used.
 */
function App() {
  // Main list to storage all wishes used.
  const [wishes, setWishes] = useState([
    { id: Uuidv4(), text: 'Aprender React', done: false },
    { id: Uuidv4(), text: 'Da de alta a los alumnos', done: true },
    { id: Uuidv4(), text: 'Preparar apuntes', done: false },
    { id: Uuidv4(), text: 'Desayunar', done: true },
  ]);

  // On Init, save list into navigatos localstorage.
  useEffect(() => {
    setWishes(JSON.parse(localStorage.getItem('wishes')) || wishes);
  }, []);

  // If the list wishes changes, it save in localstorage.
  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishes));
  }, [wishes]);

  // value for filtered list by user text.
  const [searchWishes, setsearchWishes] = useState([]);

  // Function to reorder the selected wish in the specified list.
  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // Function to refresh the page when some wish is updated.
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="container-fluid">
      {/* Header for web. With Navbar Where are placed Logo png and
       routes buttons for the diferents sections */}
      <header>
        <Navbar />
      </header>

      {/* Section were is placed de main body web content,
        there are wishlist with a searchbar and create button  */}
      <section>
        {/* Input for search wishes by text and create button */}
        <WishInput
          oncreateNewWish={(newwish) => {
            setWishes([...wishes, newwish]);
          }}
          onSearchWish={(searchData) => {
            if (searchData.text.length > 0) {
              const result = Object.values(wishes)
                .filter((wish) => wish.text.toLowerCase().includes(searchData.text.toLowerCase()));

              setsearchWishes(result);

              if (result.length <= 0) {
                setsearchWishes([
                  { id: Uuidv4(), text: 'Wish not found...', done: false },
                ]);
              }
            } else {
              setsearchWishes((prevWishes) => prevWishes.filter(() => false));
            }
          }}
        />

        {/* Whislist embebed into a drag and drop context to reorder the wishes */}
        <DragDropContext
          onDragEnd={(result) => {
            const { source, destination } = result;
            if (
              !destination
              || (source.index === destination.index
                && source.droppableId === destination.droppableId)
            ) {
              return;
            }

            setWishes((prevWishes) => reorder(prevWishes, source.index, destination.index));
          }}
        >
          <WishList
            wishes={searchWishes.length > 0 ? searchWishes : wishes}
            onUpdateWish={(updateWish) => {
              // Method 1 to update de wishlist
              setWishes(
                wishes.map((wish) => (wish.id === updateWish.id ? updateWish : wish)),
              );
              refreshPage();

              // Method 2 to update de wishlist
              /*
                const updateWishes = [...wishes];
                const modifyWish = updateWishes.finf(wish => wish.id === updateWish.id);
                modifyWish.done = updateWish.done;
                setWishes(updateWishes);
              */
            }}
            onDeleteWish={(deleteWish) => {
              // Method to delete a wish from the wishlist
              setWishes((prevWishes) => prevWishes.filter((wish) => deleteWish.id !== wish.id));
            }}
          />
        </DragDropContext>
      </section>
    </div>
  );
}

export default App;
