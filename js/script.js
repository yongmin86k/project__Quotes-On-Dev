(function($){
    const Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};


    $(function(){

        const timeAnimate = 300;
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
                const slug = post.slug;
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
                    
                $(window).on('popstate', function(){
                    window.location.replace(lastPage);
                });
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
                $('#quote-submission-form').slideUp(timeAnimate, function(){
                    $('.quote-submission-wrapper').html('There is something wrong. Please try again.');
                    $('.quote-submission-wrapper').append(`<pre>${err}</pre>`)
                })
            })
            .done(function(){
                $('#quote-submission-form').slideUp(timeAnimate, function(){
                    $('.quote-submission-wrapper').html('Thanks, your quote submission was received!');
                })
            });
        });

        // 3. Create a new account
        $('.create-new-account').on('click', function(){
            $('#form-new-account').slideDown(timeAnimate);
            $('.quote-submission').slideUp(timeAnimate);
        });

        $('#form-new-account').on('submit', function(event){
            event.preventDefault();
            
            let $newAccName = $('#newAccName').val().trim().length < 1 ? null:$('#newAccName').val(),
                $newAccEmail = $('#newAccEmail').val().trim().length < 1 ? null:$('#newAccEmail').val(),
                $newAccPw = $('#newAccPw').val().trim().length < 1 ? null:$('#newAccPw').val(),
                $confirmNewPw = $('#confirmNewPw').val().trim().length < 1 ? null:$('#confirmNewPw').val();

            // Print the warning message when passwords are not match
            if ( $newAccPw !== $confirmNewPw ){
                alert('Passwords are not match.\nPlease check again.');
                return
            }

            // Post request for wp/v2/users
            $.ajax({
                method: 'post',
                url: qod_api.rest_url + 'wp/v2/users',
                data: {
                    'username': $newAccName,
                    'email': $newAccEmail,
                    'password':$newAccPw
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader( 'Authorization', 'Basic ' + Base64.encode( 'admin:qweasd' ))
                }
            })
            .fail(function(err){
                $('#quote-submission-form').slideUp(timeAnimate, function(){
                    $('#form-new-account').html('There is something wrong. Please try again.');
                    $('#form-new-account').append(`<pre>${err}</pre>`)
                })
            })
            .done(function(){
                alert('New user is successfully created.\nPlease log-in.');
               $('#form-new-account').slideUp(timeAnimate);
               $('.quote-submission').slideDown(timeAnimate);
            });

        })

    }); // end of document ready

})(jQuery);