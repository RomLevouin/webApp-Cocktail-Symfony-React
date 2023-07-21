import React, { useEffect, useState } from 'react';
import {createRoot} from "react-dom/client";
import axios from 'axios';

function Cocktails(props) {
  const [cocktailsAlcool, setCocktailsAlcool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cocktails, setCocktails] = useState([]);
  const [records, setRecords] = useState(cocktails)
  const [recordsAlcool, setRecordsAlcool] = useState(cocktailsAlcool)
  const {baseUrl} = props;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => 
  {
    try 
        {
          const response = await axios.get('/api/cocktails');
          const filteredItems = response.data.filter(items => items.alcool === false);
          const filteredItemsAlcool = response.data.filter(item => item.alcool === true);
          setCocktailsAlcool(filteredItemsAlcool);
          setCocktails(filteredItems);
          setRecords(filteredItems);
          setRecordsAlcool(filteredItemsAlcool);
          setLoading(false);
        } 
        catch (error) 
        {
          console.error(error);
        }
  };

  const Filter = (event) => 
  {
      setRecords(cocktails.filter(f => 
      f.name.toLowerCase().includes(event.target.value) ||
      f.ingredients.toLowerCase().includes(event.target.value)
    ))
      setRecordsAlcool(cocktailsAlcool.filter(f => 
        f.name.toLowerCase().includes(event.target.value) ||
        f.ingredients.toLowerCase().includes(event.target.value)
    ))
  }
  return (
    <>
      {
        !loading && 
        <form>
            <label for="search">Search</label>
            <input  onChange={Filter} id="search" type="search" pattern=".*\S.*" required autocomplete="off"></input>
            <span className="caret"></span>
        </form>
      }
      {
        !loading && !records.length == 0 && 
        <h3 id='h3noalcool'>Sans alcool 🍹 :</h3>
      }
      <div className='flex'>
        { 
          loading && 
          <div className='progress'>
            <div className='color'></div>
          </div>
        }
        {
        !loading && records.map((item) => ( 
          <div className='center'>
            <div className="cocktail">
              <a href={baseUrl.replace('__id__', item.id)}  key={item.id}>
                <img src={item.Image}></img>
                <p id='title'>{item.name}</p>
                <div className='blockdi'>
                  <p id="desc">{item.description}</p>
                  <p id="ing">{item.ingredients}</p>
                </div>
              </a>
            </div>  
          </div>
        ))
        }
      </div>
    {
      !loading && !recordsAlcool.length == 0 && 
      <h3 id='h3alcool'>Avec alcool 🥂:</h3>
    }
    <div className='flex'>
      {
        !loading && recordsAlcool.map((item) => ( 
          <div className='center'>
            <div className='cocktail'>
              <a href={baseUrl.replace('__id__', item.id)}  key={item.id}>
                <img src={item.Image}></img>
                <p id='titlealcool'>{item.name}</p>
                <div className='blockdialcool'>
                  <p id="desc">{item.description}</p>
                  <p id="ing">{item.ingredients}</p>
                </div>
              </a>
            </div>  
          </div>
      ))
      }
      </div>
      <div id='nofound'>
        {
          loading && 
          <p></p>
        }
        {
          !loading && records.length === 0 && recordsAlcool.length === 0 && 
          <div className='item'>
            <h1>Il n'y a aucun cocktail à ce nom.. 😔</h1>
            <img src={"https://media2.giphy.com/media/dWB7fjdK7G7G08A0yM/giphy.gif"}></img>
          </div> 
        }
      </div>
    </>
  );
}


class CocktailsElement extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this)
    const baseUrl = this.dataset.url
    root.render(<Cocktails baseUrl={baseUrl} />)
  }
}

customElements.define('cocktails-component', CocktailsElement)