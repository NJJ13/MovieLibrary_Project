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
                    "<td>" + value.movieId + "</td>" +
                    "<td>" + value.title + "</td>" +
                    "<td>" + value.director + "</td>" +
                    "<td>" + value.genre + "</td>" +
                    "<td>" + "<button type='button'" + "class='btn btn-primary btn-lg'>" + "Edit" + "" + "</button>" +
                "</tr>"
            );
        });
    });
});