// Titel der verschiedenen Bücher anzeigen lassen. getElementByid('book_name').innerHTML = 
// icon
// preis und like/dislike funktion
//  autor:
//  erscheinungsjahr:
//  genre:
// Kommentare:
// Kommentare müssen angezeigt werden
//   -> [Autor] : [Kommentar]
// Kommentare hinzufügen

function init() {
    getFromLocalStorage();
    renderBooks();
}


function renderBooks() {
    let contentRef = dokument.getElementById('content');    // hier wird die variable contentRef erstellt und speichert es in dem Teil des html welches die ID content hat
    contentRef.innerHTML = "";                              // leert das Elemment damit beim nächsten Anzeigen keine alten Daten mehr vorhanden sind.

    for (let index = 0; i < books.length; i++) {            // die schleife welche durch alle Bücher in dem Array books läuf (iterieren)
        contentRef.innerHTML += getBookCardTemplate[i];     // dem leeren Inner Html wird das bookTemmplate zugewiesen und eingefügt
    }
    checkLikedContent();
}


// Kommmentare
function getBookComments(i) {                               // Die Funktion soll die Kommentare für das Buch mit dem Index (i) sammeln und zurückgeben
    let commentsRef = "";                                   // hier wird eine Variable commentsRef erzeugt und auf einen leeren string gesetzt damit sie befüllt werden kann
    for (let j = 0; j < books[i].commments.length; j++) {   // der Beginn der schleife bei j=0 läuft durch die Bücher und greift dort auf comments zu welche wieder in dem Arra gesammelt werden da es ein JSON ist. Wird bei jedem durchlauf um eins erhöht bis er durch alle comments durch ist
        commentsRef = getBookCommmentsTemplate(i, j);       // hier wird der leere string von: "commentsRef" mit dem Array befüllt, welches in der vorherigen Zeile gesammelt wurde. Dies wird an die indizierten stellen im template eingefügt
    }
    return commentsRef;                                     // dies gibt den gesammelten Strin zurück welcher das Template mit allen Kommentaren enthält
}


function addComments(i) {                                   //dient dazu Kommmentare zu einem Buch hinzuzufügen
    let commentInpuRef = document.getElementById(`send_commments${i}`); // hier wird die Variable "commentInpuRef" erstellt welche auf das Inputfeld mit der id send_commments zugreift
    let commentInput = commentInpuRef.value;                // hier  wwird die var commentInput erstellt und mit dem commentInpuRef.value befüllt. Das .value gibt an das die eingabe vom Inputfeld genommen werden soll

    books[i].comments.push({                                // hier soll ein Kommentar in die Bücher und da in das Objekt commments hinzugefügt(gepusht) werden. Bei push wird immer ans Ende des Arrays hinzugefügt
        "name": "Falko",                                    // hier wird in dem Objekt commments ein neuer name hinzugefügt welcher hier mit Falko deklariert ist
        "comment": commentInput                             // hier wird in dem Objekt commments ein neuer Kommentar hinzugefügt welcher von der var "commentInput"(3 Zeilen darüber) stammt
    });
    commentInpuRef.value = "";                              // nach der Eingabe des Kommentares wird das Inputfeld hier wieder geleert
    saveToLocalStorage();                                   // das Kommmentar wird in dem localStorage gespeichert
    updateNewComments(i);                                   // hier wird die function aufgerufen welche den commmentsContainer befüllt
}


function updateNewComments(i) {                             // Diese Funktion aktualisiert den Kommentarbereich eines bestimmten Buches (oder Elements), indem sie den aktuellen Kommentar-HTML-Code in den Container mit der passenden ID einfügt
    let updateComments = document.getElementById(`commentsContainer${i}`);  //
    updateComments.innerHTML =getBookComments(i);           //
}


// locale speicherung
getFromLocalStorage()  {
    let savedBooks = 
} 