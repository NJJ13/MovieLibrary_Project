"use strict"
$(document).ready(function(){
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: "json",
        type: "get",
        success: function(data){
            $('.movieData').html('');
            createTables(data);
            assignHandler();
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    })
});

function movieDetails(id){
    $(".tableHead").html(
        "<th scope='col'>Title</th>" + 
        "<th scope='col'>Director</th>"+ 
        "<th scope='col'>Genre</th>"
    )
    $("#header").html("<h1>Details</h1>");
    $.get('https://localhost:44325/api/movie/', function(data){
        data.map(function(el){
            if(id === el.movieId){
            $('.movieData').html(
            "<tr>" + 
                "<td>" + el.title + "</td>" +
                "<td>" + el.director + "</td>" +
                "<td>" + el.genre + "</td>" +
            "</tr>")}
        });
    });
    $.get('https://localhost:44325/api/movie/'+id, function(data){
        $(".editInfo").html(
        `<h3> Update Information</h3>
        <div id='updateForm'>
            <div class='form-group'>
                <label class='col-form-label' for='title'>Title</label>
                <input type='text' class='form-control' value='${data.title}' id='title'>
            </div>
            <div class='form-group'>
                <label class='col-form-label' for='director'>Director</label>
                <input type='text' class='form-control' value='${data.director}' id='director'>
            </div>
            <div class='form-group'>
                <label class='col-form-label' for='genre'>Genre</label>
                <input type='text' class='form-control' value='${data.genre}' id='genre'>
            </div>
        </div>
        <button type='button' onclick='processChange($('#updateForm'));' class='btn btn-primary btn-sm'>Save Changes</button> <br>` 
        )}
    );
    $("#response").append(
        `<button type='button' onclick='returnToHome();' class='btn btn-primary btn-large'>Return to Library</button>`
    );
};

function processChange($){
    function processForm( e ){
        var dict = {
            Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function(data){
                $('#response pre').html( data );
            },
            error: function(errorThrown ){
                console.log( errorThrown );
            }
        });
        e.preventDefault();
    }
        $(".editInfo").submit( processForm );
}(jQuery);

function createTables(data){
    $("#header").append(
    `<label>
        Title:<input type="text" id="title">
        Director:<input type="text" id="director">
        Genre:<input type="text" id="genre">
    </label>
    <button class='btn btn-primary' type='submit'  id="add">Add</button>`
    )
    $(".tableHead").append(
        "<th scope='col'>Title</th>" , 
        "<th scope='col'></th>"
    )
    $.each(data, function(index, value){
        $('.movieData').append(
            "<tr>" + 
                "<td>" + value.title + "</td>" +
                "<td>" + "<button type='button'" + "onclick='movieDetails(" + value.movieId + ");'" + "class='btn btn-primary btn-lg'>" + "Details" + "" + "</button>" +
            "</tr>"
        );
    });
};

function assignHandler(){
    $('#add').on('click', function(){
        var newMovie = {
            title : $('#title').val(),
            director : $('#director').val(),
            genre : $('#genre').val(),
        };
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType : 'json',
            type : 'post',
            contentType : 'application/json',
            data: JSON.stringify(newMovie),
            success: function(movie){
                $('.movieData').append('<tr><td>' + movie.title + '</td>' + `<td><button type='button' onclick='movieDetails(${movie.movieId});' class='btn btn-primary btn-lg'>Details</button>` + '</td></tr>'); 
            },
            error: function(errorThrown ){
                console.log( errorThrown );
            }
        });
    });
}

function returnToHome(){
    $("#header").html("<h1> Movie Library </h1>");
    $(".editInfo").html("");
    $("#response").html("");
    $(".tableHead").html("");
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: "json",
        type: "get",
        success: function(data){
            $('.movieData').html('');
            createTables(data);
            assignHandler();
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    })
}
