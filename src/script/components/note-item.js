import NotesApi from "../data/remote/notes-api.js";

class NoteItem extends HTMLElement {
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

      .note-info {
        padding: 1rem 1.5rem;
      }

      .note-info__title h2 {
        font-weight: 600;
      }

      .note-description p {
        font-weight: 400;
        display: -webkit-box;
        margin-top: .5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }

      .note-info_description{
        font-weight:300;
        text-align:right;
      }

      .delete-button {
        background-color: #ff4b4b;
        color: white;
        padding: .5rem;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        margin-top: .6rem;
        margin-right: .5rem;
      }

      .delete-button:hover {
        background-color: #e64040;
      }

      .archive-button {
        background-color: #4b7cff;
        color: white;
        padding: .5rem;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        margin-top: .6rem;
      }

      .archive-button:hover {
        background-color: #3259a8;
      }
    `;
  }

  _addDeleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => this._deleteButtonClicked());
    this._shadowRoot.querySelector(".note-info").appendChild(deleteButton);
  }

  _deleteButtonClicked() {
    const confirmation = confirm("Are you sure you want to delete this note?");

    if (confirmation) {
      NotesApi.deleteNote(this._note.id)
        .then(() => {
          this.remove();
        })
        .catch((error) => {
          console.error("Error deleting note:", error);
          alert("Failed to delete note. Please try again.");
        });
    }
  }

  _addArchiveButton() {
    if (!this._note.archived) {
      const archiveButton = document.createElement("button");
      archiveButton.classList.add("archive-button");
      archiveButton.textContent = "Archive";
      archiveButton.addEventListener("click", () =>
        this._archiveButtonClicked(),
      );
      this._shadowRoot.querySelector(".note-info").appendChild(archiveButton);
    }
  }

  _archiveButtonClicked() {
    const confirmation = confirm("Are you sure you want to archive this note?");

    if (confirmation) {
      NotesApi.archiveNote(this._note.id)
        .then(() => {
          this.remove();
        })
        .catch((error) => {
          console.error("Error archiving note:", error);
          alert("Failed to archive note. Please try again.");
        });
    }
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="card">
        <div class="note-info">
          <div class="note-info__title">
            <h2>${this._note.title}</h2>
          </div>
          <div class="note-description">
            <p>${this._note.body}</p>
            </div>
          <div class="note-info_description">
            <p>${this._note.createdAt}</p>
            <p>${this._note.archived}</p>

        </div>
      </div>
    `;

    this._addDeleteButton();
    this._addArchiveButton();
  }
}

customElements.define("note-item", NoteItem);
