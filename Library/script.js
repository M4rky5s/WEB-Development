const myLibrary = [];

const button = document.getElementById('createBtn');
const tableBody = document.getElementById('tableBody');

function Book(author, name, year){
    this.id = crypto.randomUUID();
    this.author = author;
    this.name = name;
    this.year = year;
}

function addBookToLibrary() {
    let author = document.getElementById('author').value;
    let name = document.getElementById('name').value;
    let year = document.getElementById('year').value;

    let book = new Book(author, name, year);

    myLibrary.push(book);
    renderTable();
    console.log(myLibrary);
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

        const nameCell = document.createElement('td');
        nameCell.textContent = book.name;
        row.appendChild(nameCell);

        const yearCell = document.createElement('td');
        yearCell.textContent = book.year;
        row.appendChild(yearCell);

        tableBody.appendChild(row);
    });
}

button.addEventListener ('click', () =>{
    addBookToLibrary();
})