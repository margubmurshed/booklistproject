//Selecting Elements
let form = document.querySelector("#book-form");
let bookList = document.querySelector("#book-list");

//Adding Event Listeners
form.addEventListener("submit", newBook);
bookList.addEventListener("click", removeItem);
// document.addEventListener("DOMContentLoaded", LocalStorage.display());


//Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    static addToBookList(book) {
        let list = document.querySelector("#book-list");
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = "# class = "delete"> x </a></td>
        `
        list.appendChild(row);
    }

    static clearFields() {
        let title = document.querySelector("#title").value = '';
        let author = document.querySelector("#author").value = '';
        let isbn = document.querySelector("#isbn").value = '';
    }

    static showAlert(message, className) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(message));
        div.className = `alert ${className}`;
        let container = document.querySelector(".container");
        container.insertBefore(div, form)

        setTimeout(() => {
            div.remove();
        }, 4000)
    }

    static remove(parent) {
        let tableRow = parent.parentElement;
        if (confirm("Are you sure?")) {
            tableRow.remove();
            let isbn = parent.previousElementSibling.textContent.trim();
            console.log(isbn);
            LocalStorage.removeBook(isbn);
            UI.showAlert("Item Removed!", "removed");
        }
    }
}

class LocalStorage {
    static validate() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book) {
        let getBooks = LocalStorage.validate();
        getBooks.push(book);
        localStorage.setItem("books", JSON.stringify(getBooks));
    }

    // static display() {
    //     let Books = LocalStorage.validate();
    //     Books.forEach(book => {
    //         UI.addToBookList(book);
    //     });
    // }

    static removeBook(isbn) {
        let getBooks = LocalStorage.validate();
        getBooks.forEach((value, index) => {
            if (value.isbn === isbn) {
                getBooks.splice(index, 1);
            }

        })
        localStorage.setItem("books", JSON.stringify(getBooks));
    }
}

//Defining Functions
function newBook(e) {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let isbn = document.querySelector("#isbn").value;

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert("Please Fill All The Field", "error");
    } else {
        let book = new Book(title, author, isbn);
        UI.addToBookList(book);
        LocalStorage.addBook(book);
        UI.clearFields();
        UI.showAlert("Action Success!", "success");
    }
    e.preventDefault();
}

function removeItem(e) {
    if (e.target.hasAttribute("href")) {
        UI.remove(e.target.parentElement);
    }
}