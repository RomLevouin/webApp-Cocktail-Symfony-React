import React, {Component} from "react"
import {createRoot} from 'react-dom/client'


export default class Music extends Component {
  componentDidMount() {
    document.getElementById("backgroundMusic").play().catch((error) => {
      document.addEventListener('click', () => {
        document.getElementById("backgroundMusic").play()
      }, { once: true } ) } )
  }
  render() {
    return (
      <audio id="backgroundMusic">
      <source src={"https://audio.jukehost.co.uk/KRVoUBtAbTi27SZmnBSLoOP1bgLNC1Hs"} type="audio/mpeg" />
      Your browser does not support the audio element.
      </audio>
    )
  }
}
class MusicElement extends HTMLElement {
    connectedCallback() {
      const root = createRoot(this)
      root.render(<Music/>)
    }
  }
  
  customElements.define('music-component', MusicElement)