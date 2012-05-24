//Constructor function
function BackgroundAd(params){
  try{
    this.elem = params.elem;
    this.contentContainer = params.contentContainer;
    this.marginThreshold = params.marginThreshold;
    this.linkUrl = params.linkUrl;
    this.backgroundSrc = "url("+params.backgroundSrc+")";
    this.backgroundColour = params.backgroundColour;
    this.positionCriteria = params.backgroundPosition;
    this.backgroundAdStyle = this.backgroundColour+" "+this.backgroundSrc+" "+this.positionCriteria;
    this.init();
  }
  catch(e){
    window.console.log("Parameters missing or incorrect.\nError: "+e);
  }
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
  return (typeof e.pageX !== "undefined") ? e.pageX : (e.clientX+document.body.scrollLeft);
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