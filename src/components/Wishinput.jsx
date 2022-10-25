import React from 'react';

function Wishinput({onNewWish}) {
  let newWishText='';
  return (
    <fieldset className='form-group'>
      <legend>New Wish</legend>
      <input className='form-control' type="text" placeholder='Introduce tu deseo'
        onKeyUp={(event) => {
          if (event.key === 'Enter' && event.target.value.length > 0) {
            newWishText = event.target.value;
            console.log(newWishText);
            onNewWish({text: event.target.value, done: false})
          }
        }}
      />
    </fieldset>
  );
}


export default Wishinput;
