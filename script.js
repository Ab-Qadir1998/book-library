// Data Structures 

const myLibrary = [];

const inputTitle = document.getElementById('title')
const inputAuthor = document.getElementById('author')
const inputPages = document.getElementById('numOfPages')
const inputIsRead = document.getElementById('isRead')
const bookForm = document.getElementById('addBook')
const cardContainer = document.getElementById('card-container')
const submitBtn = document.getElementById('submitBtn')

//check if the field values are empty or not
const fieldElements = [inputTitle, inputAuthor, inputPages]
submitBtn.disabled = true

fieldElements.forEach(elem => {
    elem.addEventListener('change', () => {
       if(elem.value == '') {
        submitBtn.disabled = true
       } else {
        submitBtn.disabled = false
       }
    })
})

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead
}

// Save to local Storage
function saveToLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

// Retreive from local Storage
function loadFromLocalStorage() {
    let storedLibrary = localStorage.getItem('myLibrary')

    if (storedLibrary) {
        myLibrary.push(...JSON.parse(storedLibrary))
    }
}

function addBookToLibrary(event) {
    event.preventDefault();

    // do stuff here
    let book = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputIsRead.checked)

    myLibrary.push(book)
    // console.log(myLibrary)


    // Clear the input Values
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputIsRead.checked = false

    // loadFromLocalStorage()
    displayBook()

    //disable submit button
    submitBtn.disabled = true
}

function displayBook() {
    cardContainer.innerHTML = '';

    myLibrary.forEach((item, index) => {
        let card = document.createElement('div');
        card.classList.add('card')
        card.innerHTML = `
         <div class="book__name">${item.title}</div>
         <div class="book__author">${item.author}</div>
         <div class="num__of-pages">${item.pages}</div>
         <div class="is__read">${item.isRead ? 'Read' : 'Not Read'}</div>
         `;

        cardContainer.appendChild(card)
    })
}