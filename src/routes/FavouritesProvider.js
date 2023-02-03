import { createContext, useState } from "react";

export const FavouritesContext = createContext()

export function FavouritesProvider({children}) {
    const [favourites, setFavourites] = useState([])

    function addFavourites(name){
        setFavourites([...favourites,name])
      }
      function removeFavourites(name){
        setFavourites(favourites.filter(favourite =>{
          return name !=favourite
        }))
      }

    return (
        <FavouritesContext.Provider
        value={{favourites, addFavourites,removeFavourites}}>
            {children}
        </FavouritesContext.Provider>
    )
}
  
