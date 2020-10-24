var notes;
var count = 0;

$(document).ready(function() {
    notes = $("#notes");

    var storedNotes = localStorage.getItem("notes");

    if (storedNotes) {
        var notesArray = JSON.parse(storedNotes);
        count = notesArray.length;
    }

    for (var i = 0; i < count; i++) {
        var storedNote = notesArray[i];
        addNewNote(storedNote.Color, storedNote.Title, storedNote.Content);
    }

    $("#btnNew").click(function() {
        addNewNote();
    });

    $("#btnSave").click(function() {
        var notesArray = new Array();

        notes.find("li > div").each(function (i, e) {
            var color = $(e).attr("class");
            var title = $(e).find("textarea.note-title");
            var content = $(e).find("textarea.note-content");

            notesArray.push({ Index: i, Title: title.val(), Content: content.val(), Color: color});
        });

        var jsonStr = JSON.stringify(notesArray);

        localStorage.setItem("notes", jsonStr);

        alert("Notes saved");
    });
});

function addNewNote(color, title, content){
    if (!color) {
        color = "colour" + Math.ceil(Math.random() * 3);
    }

    notes.append("<li><div class='" + color + "'>" +
        "<textarea class='note-title' placeholder='Untitled' maxlength='10'></textarea><br />" +
        "<input type='checkbox' style='display: inline-block'>" +
        "<textarea class='whatever' placeholder='good' maxlength='15' rows='1' cols='10' style='max-height:25px; display: inline-block'></textarea>" +
        "" +
        "<img class='hide' src='images/delete.png' width='28' height='28' />" +
        "</div></li>");

    var newNote = notes.find("li:last");

    newNote.find("img").click(function() {
        newNote.remove();
    });

    addNewNoteEvent(newNote);

    if (title) {
        newNote.find("textarea.note-title").val(title);
    }

    if (content) {
        newNote.find("textarea.note-content").val(content);
    }
}

function addNewNoteEvent(noteNode) {
    noteNode.focus(function() {
        $(this).find("img").removeClass("hide");
    }).hover(function() {
        $(this).find("img").removeClass("hide");
    }, function() {
        $(this).find("img").addClass("hide");
    });
}