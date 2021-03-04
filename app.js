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
        $.each(data, function(index, value){
            $(".movieData").append(
                "<tr>" + 
                    "<td>" + value.title + "</td>" +
                    "<td>" + value.director + "</td>" +
                    "<td>" + value.genre + "</td>" +
                    "<td>" + "<button type='button'" + "onclick='movieDetails(" + value.movieId + ");'" + "class='btn btn-primary btn-lg'>" + "Details" + "" + "</button>" +
                "</tr>"
            );
        });
    });
});
<<<<<<< HEAD

function movieDetails(id){
    $.get('https://localhost:44325/api/movie/', function(data){
        data.map(function(el){
            if(id === el.movieId){
            $(".movieData").html(
            "<tr>" + 
                "<td>" + el.title + "</td>" +
                "<td>" + el.director + "</td>" +
                "<td>" + el.genre + "</td>" +
                "<td>" + "<button type='button'" + "class='btn btn-primary btn-lg'>" + "Edit" + "" + "</button>" +
            "</tr>")}
        })
        

    })
}
=======
>>>>>>> 5569103921ef3d7e0e7ad07bc915fc78b120d75e
