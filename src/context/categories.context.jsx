import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from '../shop-data.js';
// import { addCollectionAndDocuments } from '../utils/firebase/firebase';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase';

export const CategoriesContext = createContext({
  categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {

  const [categoriesMap, setCategoriesMap] = useState({})

  /* in order to pass the data in the file 'shop-data.js' to firebase firestore, the useEffect() below is used. However it is commented out because everytime it run it will create new values in the firestore database hence the useEffect() below is used once then commentted out */
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);


  useEffect(() => {

    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    }

    getCategoriesMap();
  }, []);


  const value = { categoriesMap }

  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  )
}