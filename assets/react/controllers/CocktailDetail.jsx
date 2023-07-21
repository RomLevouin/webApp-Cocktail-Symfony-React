import React, { useEffect, useState } from 'react';
import {createRoot} from "react-dom/client";
import axios from 'axios';

function CocktailDetail() {
  const [cocktail, setCocktail] = useState(null);
  const [dosage, setDosage] = useState(1);
  const id = window.location.pathname.split('/').pop();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/cocktail/${id}`);
      setCocktail(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleMultiply = () => {
    setDosage(dosage + 1);
    if (cocktail) {
      // Create a new array with the updated values
      const multipliedArray = cocktail.cls.map((obj) => ({
        ...obj,
        value: obj.value * dosage 
      }));
    }
  };

  const handleDiviser = () => {
    if (dosage > 1){
      setDosage(dosage - 1);
      if (cocktail) {
        // Create a new array with the updated values
        const diviserdArray = cocktail.cls.map((obj) => ({
          ...obj,
          value: obj.value / dosage 
        }));
      }
    }
  };

  return (
    <>
      <div>
      {cocktail ? (
        <div className='container'>
        <div className='block'>
          <div className="content">
          <div className='img-cocktail'>
              <img src={"https://zupimages.net/up/23/27/etg4.png"}></img>
            </div>
            <div className='titleDetail'>
              <p>{cocktail.name}</p>
            </div>
            <div className='ticket'>
              <div className="restauInfo">
                <p id='receipt'>Receipt of Sale</p>
                <p id='restauName'>Le Romi Romo</p>
                <p id='adresse'>5 allées des Saules</p>
              </div>
              <hr className="solid"></hr>
              <div className="cocktailInfo">
                <div className="taxe">
                  <p>QTY</p>
                  <p>ITEM</p>
                  <p>AMT</p>
                </div>
              <hr className="solid"></hr>
                <div className="price">
                  <p id='number'>1</p>
                  <p id='nameTicket'>{cocktail.name}</p>
                  <p id='pcocktail'>7.99€</p>
                </div>
              <hr className="solid"></hr>
                <div className="total">
                  <p id='total'>Total</p>
                  <p id='totalprice'>7.99€</p>
                </div>
              <hr className="solid"></hr>
                <div className="prepaDetail">
                  <p id='text-prep'>Préparation :</p>
                  <div className='quantité'>
                    <div id='handle'>
                      <button onClick={handleDiviser}>-</button>
                      <p>{dosage} personne(s)</p>
                      <button onClick={handleMultiply}>+</button>
                    </div>
                  <div>
                </div>
                  </div>
                  <div className="all-prep">
                    <div>
                    {cocktail.cls.map((cl) => (
                      <>
                      <p id='clvalue' key={cl.id}>{cl.value * dosage }</p>
                      </>
                    ))}
                    </div>
                    <p id='list-prep'>{cocktail.preparation}</p>
                  </div>
                </div>
                <div className="shaker">
                  {cocktail.shaker === true && <div>
                  <p id='shaker'>Avec Shaker</p>  
                  <img src={cocktail.shakerimage}></img>
                  </div>}
                  {cocktail.shaker === false && <div>
                  <p id='shaker'>Sans Shaker</p>  
                  <img src={cocktail.shakerimage}></img>
                  </div>}
                </div>
            </div>
            </div>
          </div>
        </div>
    </div>
      ) : (
        <p>Loading...</p>
      )}
    </div> 
    </>
  );
}



class CocktailDetailElement extends HTMLElement {
    connectedCallback() {
      const root = createRoot(this)
      root.render(<CocktailDetail />)
    }
  }
  
  customElements.define('cocktaildetail-component', CocktailDetailElement)