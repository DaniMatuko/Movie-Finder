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
                                <button class = "btn btn-info" onclick="showDetails('${movies[index]['imdbID']}')"> Details</button> 
                            </div> 
                     </div>`;
            })
            // insert into html
        $('.row').html(output);
    });
}



function showDetails(movieId) {
    const movie = $.get(`http://www.omdbapi.com/?apikey=f1f0bada&i=${movieId}`, function(data) {
        console.log(movie.responseText);

    })
}