import React, { useEffect, useState } from 'react';
import {createRoot} from "react-dom/client";
import axios from 'axios';

function CocktailDetail() {
  const [cocktail, setCocktail] = useState({});
  // const [resultPersonne, setResultPersonne] = useState(1);
  // const [resultDosage, setResultDosage] = useState(1);
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

  // const handleClickPlus = () => {
  //   const multipliedValue = (resultPersonne + 1); 
  //   setResultPersonne(multipliedValue);
  // };
  // const handleClickMoins = () => {
  //   const multipliedValue = (resultPersonne - 1); 
  //   setResultPersonne(multipliedValue);
  // };
  // const newDosage = () => {
  //   const multipliedDosage = (resultPersonne * 2);
  //   setResultDosage(multipliedDosage)
  // };
  return (
    <>
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
                      <div id='quantité'>
                        {/* <button onClick={handleClickPlus}>Plus</button>
                        <p>Quantité par personne : {resultPersonne}</p>
                        <button onClick={handleClickMoins}>Moins</button>
                        <p>Dosage : {resultDosage}</p> */}
                      </div>
                      <div className="all-prep">
                        <p>Valeur CLS</p>
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