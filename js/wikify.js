$(function() {
    $.get('/presentations/')
    .success(function(html) {
        $('#presentations').append(getPresentationLinks(html));
    })
    .error(function() {
        $('#wiki').text('Error loading presentation list');
    });

    $('#presentations').change(function() {
        var url = $(this).val();

        if(!url) return;

        $.get(url)
        .success(function(html) {
            $('#wiki').html( $('.slides', html).html() );
        })
        .error(function() {
            $('#wiki').text('Error loading presentation');
        });
    });
});

function getPresentationLinks(html) {
    var presentations = [];

    $('a[href$=".html"]', html).each(function(index, element) {
        var option = $('<option>')
            .prop('value', element.href)
            .text('/' + element.href.split('/').slice(3).join('/'));
        
        presentations.push(option);
    });

    return presentations;
}