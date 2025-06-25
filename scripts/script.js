
function init() {
    renderBooks();
    getFromLocalStorage();
    
}


function renderBooks() {
    let contentRef = document.getElementById('content');    // hier wird die variable contentRef erstellt und speichert es in dem Teil des html welches die ID content hat
    contentRef.innerHTML = "";                              // leert das Elemment damit beim nächsten Anzeigen keine alten Daten mehr vorhanden sind.

    for (let i = 0; i < books.length; i++) {            // die schleife welche durch alle Bücher in dem Array books läuf (iterieren)
        contentRef.innerHTML += getBookCardTemplate(i);     // dem leeren Inner Html wird das bookTemmplate zugewiesen und eingefügt
    }
    checkLikedContent();
}


// Kommmentare
function getBookComments(i) {                               // Die Funktion soll die Kommentare für das Buch mit dem Index (i) sammeln und zurückgeben
    let commentsRef = "";                                   // hier wird eine Variable commentsRef erzeugt und auf einen leeren string gesetzt damit sie befüllt werden kann
    for (let j = 0; j < books[i].comments.length; j++) {   // der Beginn der schleife bei j=0 läuft durch die Bücher und greift dort auf comments zu welche wieder in dem Arra gesammelt werden da es ein JSON ist. Wird bei jedem durchlauf um eins erhöht bis er durch alle comments durch ist
        commentsRef = getBookCommentsTemplate(i ,j);       // hier wird der leere string von: "commentsRef" mit dem Array befüllt, welches in der vorherigen Zeile gesammelt wurde. Dies wird an die indizierten stellen im template eingefügt
    }
    return commentsRef;                                     // dies gibt den gesammelten Strin zurück welcher das Template mit allen Kommentaren enthält
}


function addComments(i) {                                   //dient dazu Kommmentare zu einem Buch hinzuzufügen
    let commentInpuRef = document.getElementById(`send_comments${i}`); // hier wird die Variable "commentInpuRef" erstellt welche auf das Inputfeld mit der id send_commments zugreift
    let commentInput = commentInpuRef.value;                // hier  wwird die var commentInput erstellt und mit dem commentInpuRef.value befüllt. Das .value gibt an das die eingabe vom Inputfeld genommen werden soll

    books[i].comments.push({                                // hier soll ein Kommentar in die Bücher und da in das Objekt commments hinzugefügt(gepusht) werden. Bei push wird immer ans Ende des Arrays hinzugefügt
        "name": "Falko",                                    // hier wird in dem Objekt commments ein neuer name hinzugefügt welcher hier mit Falko deklariert ist
        "comment": commentInput                             // hier wird in dem Objekt commments ein neuer Kommentar hinzugefügt welcher von der var "commentInput"(3 Zeilen darüber) stammt
    });
    commentInpuRef.value = "";                              // nach der Eingabe des Kommentares wird das Inputfeld hier wieder geleert
    saveToLocalStorage();                                   // das Kommmentar wird in dem localStorage gespeichert
    updateNewComments(i);                                   // hier wird die function aufgerufen welche den commmentsContainer befüllt
}


function updateNewComments(i) {                             // Diese Funktion aktualisiert den Kommentarbereich eines bestimmten Buches, indem sie den aktuellen Kommentar-HTML-Code in den Container mit der passenden ID einfügt
    let updateComments = document.getElementById(`commentsContainer${i}`);  // var ubdateComments wird erstellt = hier wird das html Element mmit der passenden id gesucht
    updateComments.innerHTML = getBookComments(i);          // hier wird der Inhalt von updateComments geändert, mit innerhtml und der function getBookComments(i) mit demm index i zugewiesen
}


// Likes

function likesCounter(i) {                                          // diese Function verwaltet die Likes auf der Website mit dem Pararmeter i der für ein bestimmtes Buch steht
    let unlikedHeart = document.getElementById(`heartUnlike${i}`);  // var unlikedHeart wird erstellt, sucht die id heartUnlike${i} und setzt diese dem inhalt der id gleich
    let likedHeart = document.getElementById(`heartLike${i}`);      // var likedHeart wird erstellt, sucht die id heartLike${i} und setzt diese dem inhalt der id gleich
    let likesCount = document.getElementById(`likesCount${i}`);     // var likesCount wird erstellt, sucht die id likesCount${i} und setzt diese dem inhalt der id gleich

    if (unlikedHeart.classList.contains("d_none")) {                // hier wird der aktuelle zustand der id durch contains geprüft -> in dem Fall ob die klasse d_none enthalten ist, also das gefällt mir nicht icon nicht Sichtbar ist
        unlikedHeart.classList.remove("d_none");                    // wenn unliked nicht sichtbar ist wird die klasse hier entfernt
        likedHeart.classList.add("d_none");                         // und hier wird die classe dem like icon hinzugefügt -> also ist das ausgefüllte Herz nicht sichtbar
        books[i].likes--;                                           // hier wird die Anzahl der Likes im Buch mit dem index i umm eins verringert weil der user einen like entfernt hat
        books[i].liked = false;                                     // danach wird das liked atribut im entsprechenden Buch wird hier auf false gesetzt
    } else {                                                        // wenn das gefällt mir Icon nicht sichtbar ist also unliked sichtab ist dann ...
        unlikedHeart.classList.add("d_none");                       // függe ich hier die klasse d_none dem Element unlikedHeart die klasse d_non hinzu und es wird unsichtbar...
        likedHeart.classList.remove("d_none");                      // dann wird hiermit dem Elemment likedHeart die klasse d_none entfernt, also es sichjtbar gemacht
        books[i].likes++;                                           // hier wird der like counter umm eins erhöht da der user ein like hinzugeügt hat
        books[i].liked = true;                                      // zumm schluss wird hier bei dem Buch mit dem Index i das liked Attribut auf true gesetzt
    }
    likesCount.innerHTML = books[i].likes;                          // setzt den like counter des Buches mit dem inndex i auf den aktuellen Wert
    saveToLocalStorage();                                           // ruft die Function auf welche die Like-Anzahl imm Local Storage speichert
}


function checkLikedContent() {                                                   // diese Funktion wird aufgerufen um den aktuellen like-Status der Bücher zu prüfen  

    for (let i = 0; i < books.length; i++) {                            // die schleife läuft durch das Array in dem alle Bücher enthalten sind wobei der index nach jedem durchlauf um eins erhöht wird bis die länge des Arrays kleiner als i ist
        let unlikedHeart = document.getElementById(`heartUnlike${i}`);  // siehe --> function likesCounter ;)
        let likedHeart = document.getElementById(`heartLike${i}`);      // siehe --> function likesCounter ;)
        
        if (books[i].liked) {                                           // Es wird geprüft ob das Buch mit dem index i bei liked den wert true hat. Wenn ja wird der if Block ausgeführt
            unlikedHeart.classList.add("d_none");                       // hiermit wird dem Element unlikedHeart wird die klasse d_none hinzugefügt
            likedHeart.classList.remove("d_none");                      // hiermit wird dem Element likedHeart wird die klasse d_none entfernt
        } else {                                                        // wwenn der liked status des Buches mit dem index i false ist wird dieser else Block ausgeführt
            unlikedHeart.classList.remove("d_none");                    // hier passiert dass gegennteil wie in dem if Block
            likedHeart.classList.add("d_none");                         // hier passiert dass gegennteil wie in dem if Block
        }
    }
}


// locale speicherung

function saveToLocalStorage() {                                              // diese function solll Daten im localStorage speichern und wird in der function addComments(i) aufgerufen um die Kommentare zu speicherr
    localStorage.setItem("books", JSON.stringify(books));           // localStorage.setItem speichert ein schlüssel-wert-Paar im localStorage "books" ist der Key unter dem die daten gespeichert werden, JSON.stringify wandelt das Array in einen String, da nur strings im localStorage gespeichert werden
}


function getFromLocalStorage() {                                            // diese funktion soll die daten aus dem Local Storage laden und wird in der init function verwendet um die gespeicherten Daten beim Seitenload oder -reload abzurufen
    let savedBooks = JSON.parse(localStorage.getItem("books"));     // hier wird die var savedBokks erstellt = da Daten im localStorage mmeist als string gespeichert werden ändert (parsed) dieser Befehl die Daten wieder zu einem JSON Array und speichert das Array in savedBooks
    if(savedBooks) {                                                // diese Zeile prüft ob savedBooks einen Wert hat, also nicht null oder undefined ist, falls keine Daten vorhanden sind wird der if-Block ausgeführt
        books = savedBooks;                                         // hier wird der die var books der var safedBoooks gleich gesetzt, alsoo die Daten gespeichert
    }
}