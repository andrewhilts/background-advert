//Constructor function
function BackgroundAd(elem, contentContainer, marginThreshold, linkUrl, backgroundSrc, backgroundColour){
  this.elem = elem;
  this.contentContainer = contentContainer;
  this.marginThreshold = marginThreshold;
  this.linkUrl = linkUrl;
  this.backgroundSrc = "url("+backgroundSrc+")";
  this.backgroundColour = backgroundColour;
  this.positionCriteria = 'no-repeat 50% 0% fixed';
  this.backgroundAdStyle = this.backgroundColour+" "+this.backgroundSrc+" "+this.positionCriteria;
  this.init();
}

//Bind functions to mousemove and body.onclick
BackgroundAd.prototype.init = function(){
  this.contentContainerWidth = this.contentContainer.offsetWidth;
  this.elem.style.background=this.backgroundAdStyle;
  var that = this;
  document.onmousemove = function(event){
    mouseX = that.getMouseX(event);
    if(that.verifyMouseX(mouseX)){
      document.body.style.cursor = 'pointer';
    }
    else{
      document.body.style.cursor = 'auto';
    }
    };
  this.elem.onclick = function(){
    mouseX = that.getMouseX(event);
    if(that.verifyMouseX(mouseX)){
      that.goToDestination();
    }
  };
};

//Take user to destination URL
BackgroundAd.prototype.goToDestination = function(){
  window.location = this.linkUrl;
};

//Ensure that the mouse's position is not over top of the content element (plus margin)
BackgroundAd.prototype.verifyMouseX = function (mouseX){
  leftLimit = this.findPos(this.contentContainer).left-this.marginThreshold;
  rightLimit = (this.findPos(this.contentContainer).left)+this.contentContainerWidth+this.marginThreshold;
  if(mouseX<=leftLimit || mouseX>=rightLimit){
    return true;
  }
  else{
    return false;
  }
};

//Get the mouse position
BackgroundAd.prototype.getMouseX = function (event){
var e = event || window.event;
return e.screenX;
};

//Get an element's absolute position relative to the document. 
//See: www.quirksmode.org/js/findpos.html
BackgroundAd.prototype.findPos = function (obj) {
  var curleft, curtop;
  curleft = curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
  return {left:curleft,right:curtop};
  }
};

//Instantiate the object on document.ready
$(document).ready(function(){
  var params = {};
  params.bodyElement = document.getElementsByTagName("body")[0];
  params.contentContainer = document.getElementById("heading");
  params.destinationURL = 'http://houseandhome.com';
  params.backgroundSrc = 'http://aka-cdn-ns.adtechus.com/apps/464/Ad2739664St3Sz16Sq21274055V1Id7/TheStar_70k.jpg';
  testAd = new BackgroundAd( params.bodyElement, params.contentContainer, 10,   params.destinationURL, params.backgroundSrc, 'rgb(235, 123, 40)' );
});