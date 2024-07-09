import Utils from "../utils.js";
import NotesApi from "../data/remote/notes-api.js";

const home = () => {
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteQueryWaitingElement = noteListContainerElement.querySelector(".query-waiting");
  const noteLoadingElement = noteListContainerElement.querySelector(".search-loading");
  const noteListElement = noteListContainerElement.querySelector("note-list");

  const noteArchivedListContainerElement = document.querySelector("#noteArchivedListContainer");
  const notearchivedListElement = noteArchivedListContainerElement.querySelector("notearchived-list");


  const showNoteForm = () => {
    const addNoteForm = document.querySelector(".add-note-form");
    addNoteForm.style.display = "block";
  };


  
  document.querySelector("#createNoteButton").addEventListener("click", showNoteForm);


  const onAddNoteHandler = (event) => {
    const { title, body } = event.detail;

    const newNote = {
      title,
      body,
    };

    

    NotesApi.createNote(newNote.title, newNote.body)
      .then((createdNote) => {
        alert("Note created successfully:", createdNote);
        showNote();
      })
      .catch((error) => {
        alert("Error creating note:", error);
      });
  };

  document.querySelector("note-form").addEventListener("submit", onAddNoteHandler);

  const showNote = () => {
    showLoading();
    NotesApi.getNotes()
      .then((result) => {
        displayResult(result);
        showNoteList();
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  const showNotearchivedNotes = () => {
    showLoading();
    NotesApi.getArchivedNotes()
      .then((result) => {
        if (result && result.length > 0) {
          displayNotearchivedResult(result);
          showNotearchivedList();
        } else {
          console.log("No archived notes available");
          Utils.showElement(notearchivedListElement); 
        }
      })
      .catch((error) => {
        console.error("Error fetching notearchived notes:", error);
      });
  };

  const onDeleteNoteHandler = (event) => {
    const noteId = event.detail.noteId;
    NotesApi.deleteNote(noteId)
      .then(() => {
        const noteItem = document.querySelector(`note-item[data-id="${noteId}"]`);
        const notearchivedItem = document.querySelector(`notearchived-item[data-id="${noteId}"]`);

        if (noteItem) {
          noteItem.remove();
        }

        if (notearchivedItem) {
          notearchivedItem.remove();
        }
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        alert("Failed to delete note. Please try again.");
      });
  };

  const onUnarchiveNoteHandler = (event) => {
    const noteId = event.detail.noteId;
    NotesApi.unarchiveNote(noteId)
      .then(() => {
        const notearchivedItem = document.querySelector(`notearchived-item[data-id="${noteId}"]`);
        if (notearchivedItem) {
          notearchivedItem.remove();
          showNotearchivedNotes();
        }
      })
      .catch((error) => {
        console.error("Error unarchiving note:", error);
        alert("Failed to unarchive note. Please try again.");
      });
  };

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      noteItemElement.addEventListener("deleteNote", onDeleteNoteHandler);

      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  const displayNotearchivedResult = (notearchivedNotes) => {
    const notearchivedItemElements = notearchivedNotes.map((notearchivedNote) => {
      const notearchivedItemElement = document.createElement("notearchived-item");
      notearchivedItemElement.note = notearchivedNote;
      notearchivedItemElement.addEventListener("unarchiveNote", onUnarchiveNoteHandler);

      return notearchivedItemElement;
    });

    Utils.emptyElement(notearchivedListElement);
    notearchivedListElement.append(...notearchivedItemElements);
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  const showNotearchivedList = () => {
    Array.from(noteArchivedListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(notearchivedListElement);
  };

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };

  const showQueryWaiting = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteQueryWaitingElement);
  };

  showQueryWaiting();
  showNotearchivedNotes();
  showNote();
};

export default home;
