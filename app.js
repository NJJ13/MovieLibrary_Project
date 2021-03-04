"use strict"
$(document).ready(function(){
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: "json",
        type: "get",
        success: function(data){
            $(".movieData").html('');
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    })
    .then(function(data){
        $(".tableHead").append(
            "<th scope='col'>Title</th>" , 
            "<th scope='col'></th>"
        )
        $.each(data, function(index, value){
            $(".movieData").append(
                "<tr>" + 
                    "<td>" + value.title + "</td>" +
                    "<td>" + "<button type='button'" + "onclick='movieDetails(" + value.movieId + ");'" + "class='btn btn-primary btn-lg'>" + "Details" + "" + "</button>" +
                "</tr>"
            );
        });
    });
});

function movieDetails(id){
    $(".tableHead").html(
        "<th scope='col'>Title</th>" + 
        "<th scope='col'>Director</th>"+ 
        "<th scope='col'>Genre</th>"
    )
    $.get('https://localhost:44325/api/movie/', function(data){
        data.map(function(el){
            if(id === el.movieId){
            $(".movieData").html(
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
        <button type='button' onclick='processChange();' class='btn btn-primary btn-sm'>Save Changes</button>` 
        )}
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
            type: 'post',
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