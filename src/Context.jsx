import React, { useState, useEffect } from "react";
//import items from './data.js';
import Client from "./Contentful";

const RoomContext = React.createContext();

function RoomProvider({ children }) {
  const [data, setData] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    pets: false,
    breakfast: false,
  });

  async function getData() {
    try {
      let res = await Client.getEntries({
        content_type: "beachResortRoom",
        order: "fields.price",
      });

      let rooms = formatData(res.items);
      let featuredRooms = rooms.filter((room) => room.featured);
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));

      setData({
        ...data,
        rooms: rooms,
        featuredRooms: featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice: maxPrice,
        maxSize: maxSize,
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // let rooms = formatData(items);
    // let featuredRooms = rooms.filter(room => room.featured);
    // let maxPrice = Math.max(...rooms.map(item => item.price));
    // let maxSize = Math.max(...rooms.map(item => item.size));

    // setData(prev=>({
    //   ...prev,
    //   rooms: rooms,
    //   featuredRooms: featuredRooms,
    //   sortedRooms: rooms,
    //   loading: false,
    //   price: maxPrice,
    //   maxPrice: maxPrice,
    //   maxSize: maxSize,
    // }));
    getData();
  }, []);

  function formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((img) => img.fields.file.url);
      let room = { ...item.fields, images: images, id };
      return room;
    });
    return tempItems;
  }

  function getRoom(slug) {
    const tempRooms = [...data.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  }

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    filterRooms();
  }, [
    data.type,
    data.capacity,
    data.price,
    data.minSize,
    data.maxSize,
    data.breakfast,
    data.pets,
  ]);

  function filterRooms() {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      pets,
      breakfast,
    } = data;

    //Making a mutable copy
    let tempRooms = [...rooms];
    //Changing capacity to num
    capacity = +capacity;
    //Changing price to num
    price = +price;

    //Filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    //Filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    //Filter by price
    if (price !== 0) {
      tempRooms = tempRooms.filter((room) => room.price <= price);
    }

    //Filter by size
    if (minSize !== 0 && maxSize !== 0) {
      tempRooms = tempRooms.filter(
        (room) => room.size >= minSize && room.size <= maxSize
      );
    }

    //Filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    //Filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    setData((prev) => ({
      ...prev,
      sortedRooms: tempRooms,
    }));
  }

  return (
    <RoomContext.Provider value={{ ...data, getRoom: getRoom, handleChange }}>
      {children}
    </RoomContext.Provider>
  );
}

export { RoomContext, RoomProvider };
