import React, { useEffect, useState } from 'react';
import {createRoot} from "react-dom/client";
import axios from 'axios';

function CocktailDetail() {
  const [cocktail, setCocktail] = useState({});
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
                <hr class="solid"></hr>
                  <div className="cocktailInfo">
                    <div className="taxe">
                      <p>QTY</p>
                      <p>ITEM</p>
                      <p>AMT</p>
                    </div>
                  <hr class="solid"></hr>
                    <div className="price">
                      <p id='number'>1</p>
                      <p id='nameTicket'>{cocktail.name}</p>
                      <p id='pcocktail'>7.99€</p>
                    </div>
                  <hr class="solid"></hr>
                    <div className="total">
                      <p id='total'>Total</p>
                      <p id='totalprice'>7.99€</p>
                    </div>
                  <hr class="solid"></hr>
                    <div className="prepaDetail">
                      <p id='text-prep'>Préparation :</p>
                      <p id='list-prep'>{cocktail.preparation}</p>
                    </div>
                    <div className="shaker">
                      <p id='shaker'>{cocktail.shaker}</p>
                      <img src={cocktail.shakerimage}></img>
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