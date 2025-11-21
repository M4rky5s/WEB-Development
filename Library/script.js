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
    console.log(myLibrary);
}

function removeBookFromLibrary() {
    let id = document.getElementById('id').value;

    if(id == myLibrary.includes(id)){
        let index = myLibrary.indexOf(id);                  // Klaida cia, reik kazka daryt sitoj vietoj
        deleteRow(index);
    } else {
        console.log(myLibrary.includes(id));
        console.log(id);
    }
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    tableBody.body.deleteRow(i);
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

addBookButton.addEventListener("click", () => {
    bookDialog.showModal();
})

removeBookButton.addEventListener("click", () => {
    removeDialog.showModal();
})

cancelBookRemove.addEventListener("click", () => {
    removeDialog.close();
})

cancelBookButton.addEventListener("click", () => {
    bookDialog.close();
})

submitButton.addEventListener ("click", () =>{
    addBookToLibrary();
})

confirmRemove.addEventListener ("click", () => {
    removeBookFromLibrary();
})