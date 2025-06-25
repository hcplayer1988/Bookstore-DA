
function getBookCardTemplate(i) {
    return `    <div class="layout_body">
                    <h5 id="book_name">${books[i].name}</h5>
                    <img src="./assets/img/books.jpg" id="book_header_img" class="img_top">

                    <div class="seperation"><hr></div>

                    <div class="book_price_and_likes">
                        <h3 class="h3_style" id="book_price">${books[i].price + "€"}</h3>

                        <div class="likes">
                            <img id="heartUnlike${i}" class="icon_like d_none" onclick="likesCounter(${i})" src="./assets/icons/heart_empty.png">
                            <img id="heartLike${i}" class="icon_like" onclick="likesCounter(${i})" src="./assets/icons/heart_full.png">

                            <h3 class="h3_style" id="likesCount${i}">${books[i].likes}</h3>
                        </div>
                    </div>

                    <div class="info_book_table">
                        <table class="input_informations">
                            <tr>
                                <td>Autor:</td>
                                <td id="author_book">${books[i].author}</td>
                            </tr>
                            <tr>
                                <td>Datum:</td>
                                <td id="date_book">${books[i].publishedYear}</td>
                            </tr>
                            <tr>
                                <td>Genre:</td>
                                <td id="genre_book">${books[i].genre}</td>
                            </tr>
                        </table>

                        <div id="commentsContainer${i}" class="comments_container">
                        <h3>Kommentare</h3>
                        
                            ${getBookComments(i)}
                            
                        </div>
                        <div class="seperation"><hr></div>
                        <div class="input_comments_button">
                            <input id="send_comments${i}" type="text" placeholder="Bitte schreib ein Kommentar...">
                            <img onclick="addComments(${i})" class="comment_btn" src="./assets/icons/send_message.png">
                        </div>
                    </div>
                </div>`;
}


function getBookCommentsTemplate(i ,j) {
    return `        <table class="comments_table">
                        <tr>
                            <td id="bookUserComments">${books[i].comments[j].name}</td>
                            <td id ="bookComments">${books[i].comments[j].comment}</td>
                        </tr>
                    </table>`;
}