import NotesApi from "../data/remote/notes-api";

class NotearchivedItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 1rem;
        padding: 1rem;
      }


      .notearchived-info {
        padding: 1rem 1.5rem;
      }

      .notearchived-info__title h2 {
        font-weight: 600;
      }

      .notearchived-description p {
        font-weight: 400;
        display: -webkit-box;
        margin-top: .5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }

      .notearchived-info__description p {
        font-weight:300;
        text-align:right;
      }

      .unarchive-button {
          background-color: #4b7cff;
          color: white;
          padding: 8px;
          cursor: pointer;
          border: none;
          border-radius: 4px;
          margin-top: 10px;
      }

      .archive-button:hover {
        background-color: #3259a8;
      }
    `;
  }

  _addUnarchiveButton() {
    const unarchiveButton = document.createElement("button");
    unarchiveButton.classList.add("unarchive-button");
    unarchiveButton.textContent = "Unarchive";
    unarchiveButton.addEventListener("click", () =>
      this._unarchiveButtonClicked(),
    );
    this._shadowRoot
      .querySelector(".notearchived-info")
      .appendChild(unarchiveButton);
  }

  _unarchiveButtonClicked() {
    const confirmation = confirm(
      "Are you sure you want to unarchive this note?",
    );
    if (confirmation) {
      NotesApi.unarchiveNote(this._note.id)
        .then(() => {
          this.remove();
        })
        .catch((error) => {
          console.error("Error unarchiving note:", error);
          alert("Failed to unarchive note. Please try again.");
        });
    }
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="card">
        <div class="notearchived-info">
          <div class="notearchived-info__title">
            <h2>${this._note.title}</h2>
          </div>
          <div class="notearchived-description">
            <p>${this._note.body}</p>
          </div>
          <div class ="notearchived-info__description" >
            <p>${this._note.createdAt}</p>
            <p>${this._note.archived}</p>
          </div>
        </div>
      </div>
    `;

    this._addUnarchiveButton();
  }
}

customElements.define("notearchived-item", NotearchivedItem);
