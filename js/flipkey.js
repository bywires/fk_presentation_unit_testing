Reveal.initialize({
    center: true,
    transition: 'linear',
    overview: true,
    progress: true,
    rollingLinks: false,
    width: 1100,
//    height: 1000,

    dependencies: [
        // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
        { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },

        // Syntax highlight for <code> elements
        { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },

        // Zoom in and out with Alt+click
        { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },

        // Speaker notes
        { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
    ]
});
