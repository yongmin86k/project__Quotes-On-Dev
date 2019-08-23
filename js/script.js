(function($){

    $(function(){

        let lastPage = '';

        // 1. Get request for wp/v2/posts
        $('#new-quote-button').on('click', function (event) {
            event.preventDefault();

            lastPage = document.URL;

            $.ajax({
                method: 'get',
                url: qod_api.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
            })
            .fail(function (err) {  
                console.log(err);
            })
            .done(function (data) {  
                const post = data[0];
                const slug = data[0].slug;
                const url = `${qod_api.home_url}/${slug}/`;
                history.pushState(null, null, url);

                const $element = $('.entry-content');
                const $content = post.content.rendered;
                const $title = $('.entry-title');
                const $author = post.title.rendered;
                let $source, $sourceUrl;
            
                $element.html( $content );

                if ( post._qod_quote_source && 
                    post._qod_quote_source_url ){
                        $source = post._qod_quote_source;
                        $sourceUrl = post._qod_quote_source_url;
                        
                        $title.html( `
                        — <span class="author">${$author}</span>, 
                        <span class="source">
                            <a href="${$sourceUrl}">
                            ${$source}
                            </a>
                        </span>` );
                    } else if( post._qod_quote_source ){
                        $source = post._qod_quote_source;
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
            });
        });

    
        // 2. Post request for wp/v2/posts
        $('#quote-submission-form').on('submit', function(event){
            event.preventDefault();

            let $valAuthor = $('#quote-author').val().trim().length < 1 ? null:$('#quote-author').val(),
                $valContent = $('#quote-content').val().trim().length < 1 ? null:$('#quote-content').val(),
                $valSource = $('#quote-source').val().trim().length < 1 ? null:$('#quote-source').val(),
                $valUrl = $('#quote-source-url').val().trim().length < 1 ? null:$('#quote-source-url').val();

            $.ajax({
                method: 'post',
                url: qod_api.rest_url + 'wp/v2/posts',
                data: {
                    'status': 'publish',
                    'title': $valAuthor,
                    'content': $valContent,
                    '_qod_quote_source':$valSource,
                    '_qod_quote_source_url':$valUrl
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader( 'X-WP-Nonce', qod_api.wpapi_nonce );
                }
            })
            .fail(function(err){
                console.log(err);
            })
            .done(function(){
                $('#quote-submission-form').slideUp(400, function(){
                    $('.quote-submission-wrapper').html('Thanks, your quote submission was received!');

                })
            });
        });

        $(window).on('popstate', function(){
            window.location.replace(lastPage);
        });
    });

})(jQuery);