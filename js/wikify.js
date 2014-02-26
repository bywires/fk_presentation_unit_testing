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
            $('#wiki').html( wikify(html) );
        })
        .error(function() {
            $('#wiki').text('Error loading presentation');
        });
    });

    $('#wiki').click(function() {
        if(!this.firstChild) return;

        var range = document.createRange();
        range.selectNode(this);
        window.getSelection().addRange(range);
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

function wikify(html) {
    var slides = $('.slides', html)

    // replace elements so they can be styled with CSS

    // img's can't use :before and :after, so replace with div
    slides.find('img').replaceWith(function() {
        var div = $('<div>')
            .addClass('img')
            .attr('data-src', this.src);

        return div;
    });

    // handle whitespace that will be preformatted
    slides.find('code').html(function(index, html) {
        return "\n" + $.trim(html) + "\n";
    });

    // pre's that don't wrap code elements
    slides.find('pre:not(:has(>code))').addClass('pre');

    // add breaks for readability
    slides.find('h1, h2, h3, ul, ol, p, pre').after('<br>');

    return slides.html();
}