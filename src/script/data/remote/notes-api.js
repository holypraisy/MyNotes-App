const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static getNotes() {
    return fetch(`${BASE_URL}/notes`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error(`Failed to fetch notes: ${response.status} ${response.statusText}`));
        }
      })
      .then((result) => {
        if (result && result.data && result.data.length > 0) {
          return result.data;
        } else {
          return Promise.reject(new Error(`No notes available`));
        }
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        throw error;
      });
  }

  static createNote(title, body) {
    const data = new URLSearchParams();
    data.append("title", title);
    data.append("body", body);

    return fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to create note: ${response.status} ${response.statusText}`);
        }
      })
      .then((result) => result.data)
      .catch((error) => {
        console.error("Error creating note:", error);
        throw error;
      });
  }

  static deleteNote(noteId) {
    return fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to delete note: ${response.status} ${response.statusText}`);
        }
      })
      .then((result) => {
        console.log("Note deleted successfully:", result);
        return result;
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        throw error;
      });
  }

  static archiveNote(noteId) {
    return fetch(`${BASE_URL}/notes/${noteId}/archive`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to archive note: ${response.status} ${response.statusText}`);
        }
      })
      .then((result) => {
        console.log("Note archived successfully:", result);
        return result;
      })
      .catch((error) => {
        console.error("Error archiving note:", error);
        throw error;
      });
  }

  static getArchivedNotes() {
    return fetch(`${BASE_URL}/notes/archived`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error(`Failed to fetch archived notes: ${response.status} ${response.statusText}`));
        }
      })
      .then((result) => {
        if (result && result.data && result.data.length > 0) {
          return result.data;
        } else {
          return Promise.reject(new Error(`No archived notes available`));
        }
      })
      .catch((error) => {
        console.error("Error fetching archived notes:", error);
        throw error;
      });
  }

  static unarchiveNote(noteId) {
    return fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to unarchive note: ${response.status} ${response.statusText}`);
        }
      })
      .then((result) => {
        console.log("Note unarchived successfully:", result);
        return result;
      })
      .catch((error) => {
        console.error("Error unarchiving note:", error);
        throw error;
      });
  }
}

export default NotesApi;
