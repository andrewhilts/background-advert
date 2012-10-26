background-advert
=================

Use JavaScript to embed a clickable background image to a web page

    //Instantiate the object on document.ready
    $(document).ready(function(){
        var params = {
            elem : document.getElementsByTagName("body")[0],
            contentContainer : document.getElementById("heading"),
            marginThreshold : 10,
            linkUrl : 'http://houseandhome.com',
            backgroundSrc : 'http://aka-cdn-ns.adtechus.com/apps/464/Ad2739664St3Sz16Sq21274055V1Id7/TheStar_70k.jpg',
            backgroundPosition : 'no-repeat 50% 0% fixed',
            backgroundColour : "rgb(235, 123, 40)"
        };
        testAd = new BackgroundAd(params);
    });

###Parameters
* elem: the element that will have the background image applied to it (in the above case, the body)
* contentContainer: the element that contains all the content in it, or at the very least, is the same width as the content area. The width and position of this element is used to determine what parts of the page are clickable (non-*  content areas to the left and right of the content), and what are not (content area in the centre).
*  marginThreshold: an invisible threshold around the content container to provide a forgiving buffer between the non-clickable area, and the clickable background.
*  linkUrl: the destination user is taken to on click
*  backgroundSrc: where the bg image file is located
*  backgroundPosition, backgroundColor: css attributes to apply to the background element.
