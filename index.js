class Book{
    constructor(title, author, pages, readStatus){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}

const myLibrary = [];
const form = document.querySelector('form');
const addBook = document.querySelector('.addBook');
const dialog = document.querySelector('dialog');
const OK = document.querySelector('.OK');
const cancel = document.querySelector('.cancel');

cancel.addEventListener('click',()=> {
    form.reset();
    dialog.close();
});
addBook.addEventListener('click', () => {
    dialog.showModal();
})

function checkFilled(elementVal, errDisplay){
    if(elementVal === ''){
        errDisplay.textContent = 'Kindly enter the value';
        console.log(errDisplay)
        return false;
    }
    else{
        errDisplay.textContent = "";
        return true;
    }
    
}
function validatePages(pages, errorDisplay){
    if(pages < 10){
        errorDisplay.textContent = "Min number : 10";
        return false;
    }else if(pages > 1000){
        errorDisplay.textContent = "Max number : 1000";
        return false;
    }else{
        errorDisplay.textContent = "";
        return true;
    }
}
OK.addEventListener('click', function (e) {
    e.preventDefault();
    const form = document.querySelector('form');
    const title = form.elements.namedItem('title').value;
    const author =  form.elements.namedItem('author').value;
    const pages = form.elements.namedItem('pages').value;
    const readStatus  = form.elements.namedItem('readStatus').checked;
    const errorTitle = document.querySelector('.error-title');
    const errorAuthor = document.querySelector('.error-author');
    const errorPages = document.querySelector('.error-pages');

    const isAllFilled = checkFilled(title, errorTitle) 
    && checkFilled(author, errorAuthor) 
    && checkFilled(pages, errorPages)
    && validatePages(pages,errorPages);
    if(isAllFilled){
        myLibrary.push(new Book(title, author, pages, readStatus));
        form.reset();
        dialog.close();
        addBookToLibrary(myLibrary);
    }
    
})


function addBookToLibrary(myLibrary) {
    const container = document.querySelector('.container');
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    for(let i = 0; i < myLibrary.length; i++){
        const book = document.createElement('div');
        const author = document.createElement('div');
        const title = document.createElement('div');
        const pages = document.createElement('div');
        const readStatus = document.createElement('button');
        const remove = document.createElement('button');

        readStatus.classList.add('readStatus');
        remove.classList.add('remove');

        title.textContent = myLibrary[i].title;
        author.textContent = myLibrary[i].author;
        pages.textContent = `${myLibrary[i].pages } pages`;
        readStatus.textContent = myLibrary[i].readStatus ? 'Read' : 'Not Completed';
        remove.textContent = 'DELETE';

        book.append(title);
        book.append(author);
        book.append(pages);
        book.append(readStatus);
        book.append(remove);
        book.setAttribute('data-index', i);
        container.append(book);

        readStatus.addEventListener('click', (e)=>{
            let index = e.target.parentElement.dataset.index;
            const book = myLibrary[+index];
            book.readStatus = !book.readStatus;
            e.target.textContent = book.readStatus ? 'Read' : 'Not Completed';
        })

        remove.addEventListener('click', (e)=>{
            let index = e.target.parentElement.dataset.index;
            myLibrary.splice(+index, 1);
            // This is maintain data persistence, otherwise UI and myLibrary will have
            //different number of books.
            addBookToLibrary(myLibrary);
        })
    }
}

