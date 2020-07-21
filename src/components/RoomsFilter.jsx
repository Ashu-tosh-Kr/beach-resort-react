import React, { useContext } from 'react'
import { RoomContext } from '../Context'
import Title from './Title';

const getUnique = (items, value) => {
  return [...new Set(items?.map(item => item[value]))];
}

export default function RoomsFilter() {
  const context = useContext(RoomContext);
  //Here we don't have to use conditional rendering to avoid type error beacause we handled that in
  //In the parent component RoomContainer
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
    rooms
  } = context;

  let types = getUnique(rooms, 'type');
  types = ['all', ...types];
  types = types.map((type, index) => <option key={index} value={type}>{type}</option>);
  let capacities = getUnique(rooms, 'capacity');
  capacities = capacities.map((capacity, index) => <option key={index} value={capacity}>{capacity}</option>);


  return (
    <section className='filter-container'>
      <Title title={'search rooms'} />
      <form className='filter-form'>
        {/* By category */}
        <div className="form-group">
          <label htmlFor="type">Room Type</label>
          <select
            name="type"
            id="type"
            value={type}
            className='form-control'
            onChange={handleChange}>
            {types}
          </select>
        </div>
        {/* By capacity */}
        <div className="form-group">
          <label htmlFor="capacity">Room capacity</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className='form-control'
            onChange={handleChange}>
            {capacities}
          </select>
        </div>
        {/* By price */}
        <div className="form-group">
          <label htmlFor="price">Room price: ${price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id='price'
            value={price}
            onChange={handleChange}
            className='form-control' />
        </div>
        {/* Size */}
        <div className="form-group">
          <label htmlFor="size">Room Size</label>
          <div className="size-inputs">
            <input 
              type="number" 
              name="minSize" 
              id="size" 
              value={minSize} 
              className='size-input' 
              onChange={handleChange} />
            <input 
              type="number" 
              name="maxSize" 
              id="size" 
              value={maxSize} 
              className='size-input' 
              onChange={handleChange} />
          </div>
        </div>
        {/* Extras */}
        <div className="form-group">
          <div className="single-extra">
            <input 
            type="checkbox" 
            name="breakfast" 
            id="breakfast"
            checked={breakfast}
            onChange={handleChange}/>
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="single-extra">
            <input 
            type="checkbox" 
            name="pets" 
            id="pets"
            checked={pets}
            onChange={handleChange}/>
            <label htmlFor="pets">Pets</label>
          </div>
        </div>
      </form>
    </section>
  )
}
