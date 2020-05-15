import React from 'react';

const ReservationForm = ({state, handleChange, handleBlur, handleSubmit}) => (
    <form onSubmit={handleSubmit}>
      <label>
        Is going:
        <input
          name="isGoing"
          type="checkbox"
          checked={state.isGoing}
          onChange={handleChange} 
          onBlur={handleBlur}/>
      </label>
      <br />
      <label>
        Number of guests:
        <input
          name="numberOfGuests"
          type="number"
          value={state.numberOfGuests}
          onChange={handleChange}
          onBlur={handleBlur}/>
      </label>
      <button>Submit</button>
      <pre>{JSON.stringify(state)}</pre>
    </form> 
  )

  export default ReservationForm;