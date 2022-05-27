// Book Class : Represents A Book

    class Book {
        constructor(title,author,isbn){
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }
    }
// UI Class : Handles UI Tasks

    class UI{
        static displayBooks(){
                    const books = Store.getBooks();
                    books.forEach(book=>{
                        UI.addBookToList(book);
                        console.log(book);
                    })
                }
        static addBookToList(book){
            const list = document.querySelector('#book-list');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a class="btn btn-danger btn-sm delete">X</a></td>
            `;
            list.appendChild(row);
        }
        static deleteBook(el){
            if(el.classList.contains('delete')){
                el.parentElement.parentElement.remove(); 
            }
        }
        static showAlert(msg,className){
            const div = document.createElement('div');
            div.className = `alert alert-${className}`;
            div.appendChild(document.createTextNode(msg));
            const container = document.querySelector('.container');
            const bookform = document.querySelector('#book-form');
            container.insertBefore(div,form);
            setTimeout(()=>{
                document.querySelector('.alert').remove();
            },2000);
        }
        static clearFeilds = ()=>{
            document.querySelector('#title').value = '';
            document.querySelector('#author').value = '';
            document.querySelector('#isbn').value = '';
        }
    }


// Store Class : Handles The Storage

    class Store {
        static getBooks(){
                let books;
                if(localStorage.getItem('books') === null){
                    books = [];
                }else{
                    books = JSON.parse(localStorage.getItem('books'));
                }
                    return books;
        }
        static addBook(book){
                const books = Store.getBooks();
                books.push(book);
                localStorage.setItem('books',JSON.stringify(books));
        }
        static removeBook(isbn){
            const books = Store.getBooks();
            books.forEach((book,index)=>{
                if(book.isbn === isbn){
                    books.splice(index,1);
                }
            })
            localStorage.setItem('books',JSON.stringify(books));
        }
    }


// Event : Displays Book
    document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event : Add A Book
    const form = document.getElementById('book-form');
    // console.log(typeof(form));
        form.addEventListener('submit',(e)=>{
        e.preventDefault();
        //  Get form values
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;
        //  validate 
        if(title === '' || author === '' || isbn === ''){
            // console.log('fuck youbitch ');
            UI.showAlert('Please Provide Proper Values','danger');
        }else{
            // Insstatiate Book
            const book = new Book(title,author,isbn);
            // console.log(book);
            //  add book to list 
            UI.addBookToList(book);
            // Add book to store
            Store.addBook(book);
            // show success Message
            UI.showAlert('Book Has been Added','success');
            // clear the feilds
            UI.clearFeilds();
        }
    })
// Event : Remove a Book
    document.querySelector('#book-list').addEventListener('click',(e)=>{
        UI.deleteBook(e.target);
        // remove book from store
        // console.log(e.target.parentElement.previousElementSibling.textContent);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        // show remove message
        UI.showAlert('Book Has been Removed','warning');
    })