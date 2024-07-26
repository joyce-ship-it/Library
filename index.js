function createBook(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${read ? "yes" : "not read yet" }.`;
    }
}

const theHobbit = new createBook('The Hobbit', "JRR Tolkien", 295, false);
console.log(theHobbit.info());