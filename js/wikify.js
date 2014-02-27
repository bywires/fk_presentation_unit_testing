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
    var slides = $('.slides', html);

    // remove whitespace between elements
    slides.htmlClean();

    var map = [
        ["h1",     "=",   "=\n\n"],
        ["h2",     "==",  "==\n\n"],
        ["h3",     "===", "===\n\n"],
        ["ul, ol", "",    "\n"],
        ["ul li",  "* ",  "\n"],
        ["ol li",  "+ ",  "\n"],
        ["p",      "",    "\n"],
        ["em",     "''",  "''"],

        ["pre code.js", "&lt;syntaxhighlight lang=\"javascript\"&gt;\n", "\n&lt;/syntaxhighlight&gt;\n\n"],
        ["pre code.php", "&lt;syntaxhighlight lang=\"php\"&gt;\n", "\n&lt;/syntaxhighlight&gt;\n\n"],
        ["pre code.python", "&lt;syntaxhighlight lang=\"python\"&gt;\n", "\n&lt;/syntaxhighlight&gt;\n\n"],
        ["pre:not(:has(>code))", "&lt;pre&gt;\n", "\n&lt;/pre&gt;\n\n"],
    ];

    $.each(map, function(index, args) {
        var target = $(args[0], slides);
        $('<div>').text(args[1]).insertBefore(target);
        $('<div>').text(args[2]).insertAfter(target);
    });

    slides.find('a[href]').replaceWith(function() {
        var target = $(this);
        return '[' + target.prop('href') + ' ' + target.text() + ']';
    });

    slides.find('img[src]').replaceWith(function() {
        var target = $(this);
        return '[[File:' + target.prop('src') + ']]';
    });

    return slides.text();
}

// http://stackoverflow.com/a/3103269
jQuery.fn.htmlClean = function() {
    this.contents().filter(function() {
        if (this.nodeType != 3) {
            $(this).htmlClean();
            return false;
        }
        else {
            this.textContent = $.trim(this.textContent);
            return !/\S/.test(this.nodeValue);
        }
    }).remove();
    return this;
};
