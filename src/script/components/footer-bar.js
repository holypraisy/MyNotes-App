class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const footer = document.createElement('footer');
    footer.innerHTML = `
    <div class="footerText">
      <p>Copyright &copy; 2024 by Holly Praisy Lapian | All Rights Reserved </p>
    </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      footer .footerText {
        background-color: #64b3f4;
        color: black;
        width: 100%;
        padding: 0.5rem;
      }
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(footer);
  }
}


customElements.define('footer-bar', AppFooter);
