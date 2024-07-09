class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const header = document.createElement('header');
    header.innerHTML = `  
    <img src="logo-notes-app.png" alt="">  
    <h1> Notes App </h1>
    `;

    const style = document.createElement('style');
    style.textContent = `
    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      flax-wrap: wrap;
      align-items: center;
      justify-content: left;
      background: linear-gradient(to right,#c2e59c, #64b3f4);
      color: black;
      padding : 0 3rem 0 3rem;
      margin-bottom: 2rem;
      
    }
    
    header img {
      width : 5%;
    }
    header h1 {
      padding-left: 1rem;
    } `;
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(header);
  }
}

customElements.define('app-bar', AppBar);
