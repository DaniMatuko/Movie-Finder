// Asign variabls
const searchValue = $('#searchValue');
const searchBtn = $('#searchBtn');

// Event listeners

searchBtn.click(function(e) {
    showMovies();
    e.preventDefault();
})



function showMovies() {
    // Get the user input
    let value = searchValue.val();
    // Make a Get request
    $.get(`http://www.omdbapi.com/?apikey=f1f0bada&s=${value}`, function(data) {
        const movies = data['Search'];
        //  Create element for each movie
        let output = '';
        $(movies).each(function(index) {
                output +=
                    `<div class = "col-md-4 col-lg-3 text-center">
                            <div class = "movie rounded m-2">
                                <img class = "img-thumbnail" src = ${movies[index]['Poster']}>
                                <span>${movies[index]['Title']}</span> <br>
                                <button class = "btn btn-info" onclick="getMovieID('${movies[index]['imdbID']}')"> Details</button> 
                            </div> 
                     </div>`;
            })
            // insert into html
        $('.row').html(output);
    });
}



function getMovieID(movieId) {
    sessionStorage.setItem('mId', movieId);
    window.location = 'movie.html';


}

function showDetails() {
    let id = sessionStorage.getItem('mId');

    const movie = $.get(`http://www.omdbapi.com/?apikey=f1f0bada&i=${id}`, function(data) {
        console.log(movie.responseJSON);
        let output =
            ` <div class="row">
                <div = col-md-4>
                    <img class="thumbnail" src="${movie.responseJSON.Poster}">
                </div>
                <div class="details col-md-8 align-self-center">
                <h2> ${movie.responseJSON.Title} </h2>
                  <ul class="list-group">
                    <li class="list-group-item"> Actors: ${movie.responseJSON.Actors} </li>
                    <li class="list-group-item"> Director: ${movie.responseJSON.Director} </li>
                    <li class="list-group-item"> Production: ${movie.responseJSON.Production} </li>
                    <li class="list-group-item"> Released: ${movie.responseJSON.Released} </li>
                    <li class="list-group-item"> Genre: ${movie.responseJSON.Genre} </li>
                    <li class="list-group-item"> Ratings: ${movie.responseJSON.Ratings} </li>
               </ul>
                </div>
            </div>

            <div class="row">
                <div class= "well">
                    <h3> Plot </h3>
                    <p class = "align-self-end">${movie.responseJSON.Plot}</p>
                </div>
            </div>`

        // Insert HTML
        $('.container').html(output);
    })
}

/*
        let output =
            `<div class=" data d-flex align-items-center justify-content-around">
            <img class="poster " src="${movie.responseJSON.Poster}">
            <div class="details ">
              <ul class="list-group">
                 <li class="list-group-item"> Actors: ${movie.responseJSON.Actors} </li>
                 <li class="list-group-item"> Director: ${movie.responseJSON.Director} </li>
                 <li class="list-group-item"> Production: ${movie.responseJSON.Production} </li>
                 <li class="list-group-item"> Released: ${movie.responseJSON.Released} </li>
                 <li class="list-group-item"> Genre: ${movie.responseJSON.Genre} </li>
                 <li class="list-group-item"> Ratings: ${movie.responseJSON.Ratings} </li>
              </ul>
            </div>
         </div>`
         */