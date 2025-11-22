const myLibrary = [];

const submitButton = document.getElementById('submitBook');
const addBookButton = document.getElementById('addNewBook');
const cancelBookButton = document.getElementById('cancelBookAdd');
const removeDialog = document.getElementById('removeDialog');
const removeBookButton = document.getElementById('removeBook');
const cancelBookRemove = document.getElementById('cancelBookRemove');
const bookDialog = document.getElementById('bookDialog');
const tableBody = document.getElementById('tableBody');
const toggleFormButton = document.getElementById('toggleFormBtn');
const bookForm = document.getElementById('bookForm');
const confirmRemove = document.getElementById('confirmRemove');

function Book(author, title, pages, status){
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    let author = document.getElementById('author').value;
    let title = document.getElementById('title').value;
    let pages = document.getElementById('pages').value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let book = new Book(author, title, pages, status);

    myLibrary.push(book);
    renderTable();
    console.table(myLibrary);
}

function removeBookFromLibrary() {
    let id = document.getElementById('id').value;
    let findBook = myLibrary.find(book => book.id == id);

    console.log(findBook);

    if(myLibrary.includes(findBook)){
        let index = myLibrary.indexOf(findBook);
        myLibrary.splice(index, 1);
        deleteRow(index);
    } else {
        console.log(myLibrary.includes(findBook));
        console.log(id);
    }
}

function deleteRow(i) {
    tableBody.deleteRow(i);
}

function renderTable() {
    tableBody.innerHTML = '';
    
    myLibrary.forEach(book => {
        const row = document.createElement('tr');
        
        const idCell = document.createElement('td');
        idCell.textContent = book.id;
        row.appendChild(idCell);

        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        row.appendChild(authorCell);

        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;
        row.appendChild(titleCell);

        const pagesCell = document.createElement('td');
        pagesCell.textContent = book.pages;
        row.appendChild(pagesCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = book.status;
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    });
}

function deleteAfterButtonPressed() {
    document.querySelectorAll("input[type=text], input[type=number]").forEach(input => {
        input.value = '';
    })
    document.querySelectorAll("input[type=radio]").forEach(radio => {
        radio.checked = false;
    })
}

addBookButton.addEventListener("click", () => {
    bookDialog.showModal();
})

removeBookButton.addEventListener("click", () => {
    removeDialog.showModal();
})

cancelBookRemove.addEventListener("click", () => {
    removeDialog.close();
    deleteAfterButtonPressed();
})

cancelBookButton.addEventListener("click", () => {
    bookDialog.close();
    deleteAfterButtonPressed();
})

submitButton.addEventListener ("click", () =>{
    addBookToLibrary();
    deleteAfterButtonPressed();
})

confirmRemove.addEventListener ("click", () => {
    removeBookFromLibrary();
    deleteAfterButtonPressed();
})