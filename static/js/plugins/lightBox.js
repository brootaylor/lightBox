
////////////////////////////////////
// LIGHTBOX SOLUTION PLUGIN 
////////////////////////////////////

jQuery(function() {

    /////////////////////////////////////
    // Global lightbox variables
    /////////////////////////////////////

    var lightBoxExist = jQuery('.lb-wrap').length > 0;

    // Beginning part of the lightbox structure...
    var lightBoxStrucBeg = 

    '<div class="lb-back"></div>' + // Background overlay element

    '<div class="lb-wrap" tabindex="-1">' + // Lightbox wrapper & child elements
        '<div class="lb-wrap-in">' +
            '<div class="lb-container">' +
                '<div class="lb-content" aria-live="polite" aria-atomic="true">' + // Change aria-live attribute (eg. "assertive") depending on context if needed
                    // This is where the content will be inserted (iframed) / ajax'd into.
                '</div>' +
            '</div>';

    // End part of the lightbox structure...
    var lightBoxStrucEnd =

        '</div>' +
    '</div>';

    // Generic lightbox content is loading message...
    var loadContMessage = '<div class="lb-preloader">Loading content&hellip;</div>';
    // 'Prompt' reloading page message...
    var loadPageReloadMessage = '<div class="lb-preloader">Reloading this page&hellip;</div>';

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // Create HTML markup for lightbox window & background (colour) overlay & content loading message
    var lightBoxCreate = lightBoxStrucBeg + loadContMessage + lightBoxStrucEnd;

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // Create HTML markup for page refresh background (colour) overlay and page reloading message
    var pageRefresh = lightBoxStrucBeg + loadPageReloadMessage + lightBoxStrucEnd;

    // Container to receive content...
    var mdlContExist = '.lb-content';


    //////////////////////////
    // When Ajax is needed...
    //////////////////////////

    // Get current URL...
    var currenturl = window.location.pathname;

    // Origin (ie. domain)...
    // var originPart = window.location.origin + "/";  // e.g. http://blah.website.com/

    // Split URL up into parts...
    var urlParts = currenturl.split("/");
        var Part1 = urlParts[1] + "/";              // e.g. foo/
        var Part2 = urlParts[2] + "/";              // e.g. en_foo/

    // Piece the split pathname together...
    // var urlCombine = originPart + Part1 + Part2;
    var urlCombine = "/" + Part1 + Part2;
    
    //if(originPart!==undefined) {
    //  urlCombine = originPart + urlCombine; 
    //}

    // Don't cache ajax calls...
    jQuery.ajaxSetup ({
        cache: false
    });


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////
    // Generic lightbox link that's manually clicked...
    //////////////////////////////////////////////////////


    // Change to .on() method...

    jQuery('body').delegate('.lb-trig', 'click', function(event) {

        // Prevent default action (hyperlink)
        event.preventDefault();


        // If lightbox exists
        if (lightBoxExist) {
 
            // Insert some sort of content / make Ajax call etc.
            jQuery(mdlContExist).html('<h1>We have content</h1>');
             
            // Show lightbox window - maybe use a transition here  eg. .show('fast')
            // jQuery('.mdl-lb-wrap').fadeIn('slow');
        }

        // Else if lightbox does not exist 
        else {
                 
            // Insert lightbox HTML into DOM
            jQuery('body').append(lightBoxCreate);
        }


    });

    // Remove lightbox elements from the DOM entirely...
    jQuery('.lb-close').live('click', function(event) {

        // Prevent default action (hyperlink)
        event.preventDefault();

        jQuery('.lb-back, .lb-wrap').remove();
    });


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////
    // Actual ajax content example...
    /////////////////////////////////////

    // Change to .on() method...

    jQuery('body').delegate('.lb-content-example', 'click', function(event) {

        // Prevent default action (hyperlink)
        event.preventDefault();

        // Local prompt content ...
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var loadPromptCont = urlCombine + "ajax-content/ajax-content-snippet01.html"; // test local
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var promptMessIdent = 'lb-content-example-container';
        var promptMessExist = '.lb-content-example-container';

        jQuery(mdlContExist).addClass(promptMessIdent);

        // If specific container in place then load relevant content...
        jQuery(promptMessExist).load(loadPromptCont, function() {

        });

    });

    // Specific page reload message for the prompt user journey...
    jQuery('.lb-content .lb-close').live('click', function(event) {

        // Prevent default action (hyperlink)
        event.preventDefault();

    });


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////////////////
    // Automatically open modal for any of this particular link class...
    jQuery('.lb-content-example').trigger('click');


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


}); // end: doc ready

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////










