// Selecting element
const titleContainer = document.getElementById("title-container");
const dateContainer = document.getElementById("date-container");
const contentContainer = document.getElementById("content-container");
const saveBtn = document.getElementById("save-btn");
const editBtn = document.getElementById("edit-btn");

let titleText = "";
let dateText = "";
let contentText = "";
let notes = [];
titleContainer.addEventListener("change", function (event) {
  titleText = event.target.value;
});

dateContainer.addEventListener("change", function (event) {
  dateText = event.target.value;
});

contentContainer.addEventListener("change", function (event) {
  contentText = event.target.value;
});

saveBtn.addEventListener("click", function (event) {
  const note = {
    id: new Date().getMilliseconds(),
    title: titleText.trim(),
    date: dateText,
    content: contentText.trim(),
  };

  if (
    titleContainer.value !== "" &&
    dateContainer.value !== "" &&
    contentContainer.value !== ""
  ) {
    console.log(notes);
    notes.push(note);
    titleContainer.value = "";
    dateContainer.value = "";
    contentContainer.value = "";
  }
  getNotes();
});

function getNotes() {
  let result = "";
  notes.forEach(function (value) {
    result += `<div class="notes-left">
                <div class="note-title">
                  <span>Title:-</span>
                  <span id="title__container">${value.title}</span>
                </div>
                <div class="note-date">
                  <span>Date:-</span>
                  <span id="date__container">${value.date}</span>
                </div>
                <div class="note-content" id="content__container">
                  <p>${value.content}</p>
                  </div>
                  <button id="edit-btn" onclick="editButton(event,${value.id})">Edit</button>
            </div>`;
  });
  document.getElementById("notes-container").innerHTML = result;
}

function editButton(event, id) {
  notes.find(function (note) {
    if (note.id === id) {
      const titleEditField = document.createElement("input");
      titleEditField.type = "text";
      titleEditField.value = note.title;

      const dateEditField = document.createElement("input");
      dateEditField.type = "date";
      dateEditField.value = note.date;

      const contentEditField = document.createElement("textarea");
      // contentEditField.type = "text";
      contentEditField.value = note.content;

      const mytitleSpan =
        document.querySelectorAll("#title__container")[notes.indexOf(note)];

      const myDateSpan =
        document.querySelectorAll("#date__container")[notes.indexOf(note)];

      const mycontentSpan = document.querySelectorAll("#content__container")[
        notes.indexOf(note)
      ];

      event.target.innerText = "Save";

      mytitleSpan.replaceChildren(titleEditField);
      myDateSpan.replaceChildren(dateEditField);
      mycontentSpan.replaceChildren(contentEditField);

      titleEditField.addEventListener("change", function (event) {
        note.title = event.target.value;
        mytitleSpan.replaceChildren(note.title);
        // getNotes();
      });

      dateEditField.addEventListener("change", function (event) {
        note.date = event.target.value;
        myDateSpan.replaceChildren(note.date);
        // getNotes();
      });

      contentEditField.addEventListener("change", function (event) {
        note.content = event.target.value;
        mycontentSpan.replaceChildren(note.content);
        getNotes();
      });
    }
  });
}
