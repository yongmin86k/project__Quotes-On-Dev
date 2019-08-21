(function($){

    $(function(){
        // console.log(qod_api);

        // TODO :

        // 1. Get request for wp/v2/posts
        $('#new-quote-button').on('click', function (event) {
            event.preventDefault();

            $.ajax({
                method: 'get',
                url: qod_api.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
            })
            .done(function (data) {  
                const $element = $('.entry-content');
                const $content = data[0].content.rendered;
                const $title = $('.entry-title');
                const $author = data[0].title.rendered;
                let $source, $source_url;

                $element.html( $content );

                if ( data[0]._qod_quote_source && 
                     data[0]._qod_quote_source_url ){
                        $source = data[0]._qod_quote_source;
                        $source_url = data[0]._qod_quote_source_url;
                        
                        $title.html( `
                        — <span class="author">${$author}</span>, 
                        <span class="source">
                            <a href="${$source_url}">
                            ${$source}
                            </a>
                        </span>` );
                    } else if( data[0]._qod_quote_source ){
                        $source = data[0]._qod_quote_source;
                        $title.html(`
                            — <span class="author">${$author}</span>, 
                            <span class="source">
                            ${$source}
                            </span>
                        `);
                    } else {
                        $title.html(`
                            — <span class="author">${$author}</span>
                        `);
                    }
            })
            .fail(function (err) {  
                console.log(err);
            });
        });

        

        // 2. Post request for wp/v2/posts
    });

})(jQuery);