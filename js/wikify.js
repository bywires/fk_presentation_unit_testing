$(function() {
    $.get('/presentations/')
    .success(function(html) {
        var presentations = [];
        $('a[href$=".html"]', html).each(function(index, element) {
            var option = $('<option>')
                .prop('value', element.href)
                .text('/' + element.href.split('/').slice(3).join('/'));
    
            presentations.push(option);
        });

        $('#presentations').append(presentations);
        
    })
    .error(function() {
        console.log('Presentations not found!');
    });

    $('#presentations').change(function() {
        var url = $(this).val();

        if(!url) return;

        $.get(url)
        .success(function() {
            console.log(arguments);
        });
    });
});
