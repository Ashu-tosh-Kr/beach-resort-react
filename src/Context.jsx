import React, { useState, useEffect } from 'react'
import items from './data.js'

const RoomContext = React.createContext();

function RoomProvider({ children }) {

  const [data, setData] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true
  });

  useEffect(()=> {
    let rooms = formatData(items);
    let featuredRooms = rooms.filter(room => room.featured);
    setData({
      rooms: rooms,
      featuredRooms: featuredRooms,
      sortedRooms:rooms,
      loading: false
    })
  },[])

  function formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(img => img.fields.file.url);
      let room = {...item.fields, images:images, id};
      return room;
    })
    return tempItems;
  }

  function getRoom(slug) {
    const tempRooms = [...data.rooms];
    const room = tempRooms.find(room => room.slug===slug);
    return room;
  }

  return (
    <RoomContext.Provider value={{...data,getRoom:getRoom}}>
      {children}
    </RoomContext.Provider>
  )
}

export { RoomContext, RoomProvider };