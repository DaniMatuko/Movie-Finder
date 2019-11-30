// Asign variabls
const searchValue = $('#searchValue');
const searchBtn = $('#searchBtn');

// Add event listener

searchBtn.click(function(e) {
    let value = searchValue.val();
    $.get(`http://www.omdbapi.com/?apikey=yourAPIkeyHere&s=${value}`, function(data) {
        const movies = data['Search'];
        console.log(movies[0]);
        let output = '';
        $(movies).each(function(index) {
                output +=
                    `<div class = "col-md-4 col-lg-3 text-center">
                            <div class = "movie rounded m-2">
                                <img class = "img-thumbnail" src = ${movies[index]['Poster']}>
                                <span>${movies[index]['Title']}</span> <br>
                                <button class = "btn btn-info"> Details</button> 
                            </div> 
                     </div>`;

            })
            //  console.log(output);

        $('.row').html(output);

    });
    e.preventDefault();
})