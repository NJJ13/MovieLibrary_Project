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
    $.get('https://localhost:44325/api/movie/', function(data){
        data.map(function(el){
            if(id === el.movieId){
            $(".editInfo").html(
                "<h3> Update Information</h3>" +
                "<div class='form-group'>" +
                "<label class='col-form-label' for='inputDefault'>Title</label>" +
                "<input type='text' class='form-control' placeholder='Updated Title' id='inputDefault'>"+
                "<button type='button'" + "class='btn btn-primary btn-sm'>" + "Save Changes" + "" + "</button>" +
            "</div>" +
            "<div class='form-group'>" +
                "<label class='col-form-label' for='inputDefault'>Director</label>" +
                "<input type='text' class='form-control' placeholder='Updated Director' id='inputDefault'>"+
                "<button type='button'" + "class='btn btn-primary btn-sm'>" + "Save Changes" + "" + "</button>" +
            "</div>" +
            "<div class='form-group'>" +
                "<label class='col-form-label' for='inputDefault'>Genre</label>" +
                "<input type='text' class='form-control' placeholder='Updated Genre' id='inputDefault'>"+
                "<button type='button'" + "class='btn btn-primary btn-sm'>" + "Save Changes" + "" + "</button>" +
            "</div>" 
            )}
        });
    });
};
