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
    $.get(`http://www.omdbapi.com/?apikey=yourAPIkey&s=${value}`, function(data) {
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

    const movie = $.get(`http://www.omdbapi.com/?apikey=yourAPIkey&i=${id}`, function(data) {
        console.log(movie.responseJSON);
        let output =
            ` <div class="row justify-content-between my-4 ">
                <div = col-md-4>
                    <img class="card-img" src="${movie.responseJSON.Poster}">
                </div>
                <div class="details col-md-8 ">
                <h2 class = "p-1"> ${movie.responseJSON.Title} </h2>
                  <ul class="list-group">
                    <li class="list-group-item"> Actors: ${movie.responseJSON.Actors} </li>
                    <li class="list-group-item"> Director: ${movie.responseJSON.Director} </li>
                    <li class="list-group-item"> Production: ${movie.responseJSON.Production} </li>
                    <li class="list-group-item"> Released: ${movie.responseJSON.Released} </li>
                    <li class="list-group-item"> Genre: ${movie.responseJSON.Genre} </li>
                    <li class="list-group-item"> Rating: ${movie.responseJSON.imdbRating} </li>
                    <li class="list-group-item"> Language: ${movie.responseJSON.Language} </li>
               </ul>
                </div>
            </div>

            <div class="row ">
                <div class= "rounded bg-dark p-4 col-12">
                    <h3> Plot </h3> 
                    <hr>
                    <p class = "align-self-end">${movie.responseJSON.Plot}</p>
                </div>
            </div>

            <div class="row justify-content-center ">
            <a class="btn btn-primary mt-3" href= "index.html">Back To Search</a>
            </div>`

        // Insert HTML
        $('.container').html(output);
    })
}