class NoteForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .form-container {
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 2;
          height: 100%;
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
        }

        form {
          position: absolute;
          top: 0;
          left: 15%;
          z-index: 3;
          max-width: 40rem;
          width: 50%;
          justify-content: center;
          transform: translate(15%, 10%);
          padding: 2rem 3rem 2rem 2rem;
          background: white;
          border-radius: .5rem;
        }

        .judul-form {
          display: flex;
          justify-content: space-between;
        }

        .judul-form p {
          color: black;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        label {
          display: block;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        input,
        textarea {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          border: 0;
          padding: 10px 16px;
          background-color: #64b3f4;
          color: white;
          cursor: pointer;
          border-radius:2rem;
        }

        button:hover {
          background-color:white ;
          color: #64b3f4;
          font-weight:700;

          box-shadow: 0 0 1rem #64b3f4;

        }

        button:active {
          background-color: #64b3f4;
          color:white;
        }

        .confirmation-popup {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .confirmation-popup p {
          margin: 0;
        }

        .confirmation-popup button {
          margin-top: 10px;
        }

        .create-note {
          color: #64b3f4;
        }

        #loadingIndicator {
          display: none;
          color: #64b3f4;
          font-size: 16px;
          margin-top: 10px;
        }

        .loading-indicator {
          display: none;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .loading-indicator::after {
          content: '';
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 4px solid #64b3f4;
          border-top: 4px solid transparent;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="form-container" style="display: none;">
        <form id="noteForm" class="note-form">
          <div class="judul-form">
            <h3 class="create-note">CREATE NOTE</h3>
            <p class="exit-btn"> x </p>
          </div>
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" required />
          </div>

          <div class="form-group">
            <label for="body">Note Body</label>
            <textarea id="body" name="body" rows="6" required></textarea>
          </div>

          <!-- Loading Indicator -->
          <div id="loadingIndicator" class="loading-indicator"></div>

          <button type="submit">Add Note</button>
        </form>
      </div>

      <div id="confirmationPopup" class="confirmation-popup">
        <p>Note added successfully!</p>
        <button id="confirmButton">OK</button>
      </div>
    `;

    this._formElement = this._shadowRoot.querySelector("#noteForm");
    this._confirmationPopup =
      this._shadowRoot.querySelector("#confirmationPopup");
    this._confirmButton = this._shadowRoot.querySelector("#confirmButton");
    this._loadingIndicator =
      this._shadowRoot.querySelector("#loadingIndicator");
    this._exitButton = this._shadowRoot.querySelector(".exit-btn");
  }

  connectedCallback() {
    this._formElement.addEventListener("submit", this._onSubmit.bind(this));
    this._confirmButton.addEventListener(
      "click",
      this._closeConfirmation.bind(this)
    );
    this._exitButton.addEventListener("click", this._closeForm.bind(this));
    document.querySelector("#createNoteButton").addEventListener("click", this._showForm.bind(this));
  }

  disconnectedCallback() {
    this._formElement.removeEventListener(
      "submit",
      this._onSubmit.bind(this)
    );
    this._confirmButton.removeEventListener(
      "click",
      this._closeConfirmation.bind(this)
    );
    this._exitButton.removeEventListener("click", this._closeForm.bind(this));
    document.querySelector("#createNoteButton").removeEventListener("click", this._showForm.bind(this));
  }

  _onSubmit(event) {
    event.preventDefault();

    const titleInput = this._shadowRoot.querySelector("#title");
    const bodyInput = this._shadowRoot.querySelector("#body");

    if (!titleInput.value || !bodyInput.value) {
      alert("Both title and body must be filled!");
      return;
    }

    const eventDetail = {
      title: titleInput.value,
      body: bodyInput.value,
    };

    this._loadingIndicator.style.display = "block";
    this.dispatchEvent(new CustomEvent("submit", { detail: eventDetail }));

    setTimeout(() => {
      this._loadingIndicator.style.display = "none";
    }, 1000);

    titleInput.value = "";
    bodyInput.value = "";
  }

  _showConfirmation() {
    this._confirmationPopup.style.display = "block";
  }

  _closeConfirmation() {
    this._confirmationPopup.style.display = "none";
  }

  _closeForm() {
    this._shadowRoot.querySelector(".form-container").style.display = "none";
  }

  _showForm() {
    this._shadowRoot.querySelector(".form-container").style.display = "block";
  }
}

customElements.define("note-form", NoteForm);

