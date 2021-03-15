const reviewList= document.querySelector('#review-list');
const form = document.querySelector('#add-review-form');

function renderReview(doc)
{
    let li = document.createElement('li');
    let movieName = document.createElement('span');
    let releaseDate = document.createElement('span');
    let Genre = document.createElement('span');
    let Review = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    movieName.textContent = doc.data().movieName;
    releaseDate.textContent = doc.data().releaseDate;
    Genre.textContent = doc.data().Genre;
    Review.textContent = doc.data().Review;

    li.appendChild(movieName);
    li.appendChild(releaseDate);
    li.appendChild(Genre);
    li.appendChild(Review);

    reviewList.appendChild(li);
}

//getting data
db.collection('reviews').get().then((snapshot) => {
    //console.log(snapshot.docs)
    snapshot.docs.forEach(doc => {
        renderReview(doc); 
    })
})

//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('reviews').add({
        Genre: form.Genre.value,
        Review: form.Review.value,
        movieName: form.movieName.value, 
        releaseDate: form.releaseDate.value
        
        
    });
})
