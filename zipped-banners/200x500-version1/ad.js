function setImages(){var e=[];for(var t in imageAssignments)document.getElementById(t).style.background="url("+imageAssignments[t]+")",e.push(imageAssignments[t]);imgpreload(e,onImagesLoaded)}function imgpreload(e,t){var n=0,i=[];e="[object Array]"===Object.prototype.toString.apply(e)?e:[e];for(var a=function(){n+=1,n===e.length&&t&&t(i)},o=0;o<e.length;o++)i[o]=new Image,i[o].onabort=a,i[o].onerror=a,i[o].onload=a,i[o].src=e[o]}function removeCover(){document.getElementById("covering-div").className="hide"}function onVisible(){isVisible=!0,isImagesLoaded&&!isAnimated&&(removeCover(),animate())}function onImagesLoaded(){isImagesLoaded=!0,isVisible&&!isAnimated&&(removeCover(),animate())}function animate(){TweenLite.to(document.getElementById("frame1"),.4,{delay:5,ease:"easeInOut",opacity:0}),TweenLite.to(document.getElementById("frame2"),.4,{delay:5,ease:"easeInOut",opacity:1}),TweenLite.to(document.getElementById("frame2"),.4,{delay:10,ease:"easeInOut",opacity:0}),TweenLite.to(document.getElementById("frame3"),.4,{delay:10,ease:"easeInOut",opacity:1})}function politeInit(){setTimeout(function(){exitHandler(),setImages()},500),setTimeout(function(){removeCover(),animate()},1e3)}function exitHandler(){var e=getContent(),t=document.getElementById("bg-exit"),n=t.parentNode,i=document.createElement("a");n.replaceChild(i,t),i.appendChild(t),t.addEventListener("click",function(){""===clickTag&&(clickTag=e.exit.Url),i.setAttribute("target","_blank"),i.setAttribute("href",clickTag)})}function initialize(){document.addEventListener?document.addEventListener("DOMContentLoaded",politeInit):politeInit()}function getContent(){var e={};return e.GDN=[{main_image:{Url:"img/red.jpg"},image_url_1:{Url:"img/blue.jpg"},image_url_2:{Url:"img/green.jpg"},image_url_3:{Url:"img/orange.jpg"},exit:{Url:"http://www.google.com"}}],e.GDN[0]}window.onload=initialize();var adContent=getContent(),isVisible=!1,isImagesLoaded=!1,isAnimated=!1,imageAssignments={banner:adContent.main_image.Url,frame1:adContent.image_url_1.Url,frame2:adContent.image_url_2.Url,frame3:adContent.image_url_3.Url},clickTag="";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzdGF0aWMuanMiLCJpbWFnZS1wYXRocy5qcyJdLCJuYW1lcyI6WyJzZXRJbWFnZXMiLCJpbWFnZXMiLCJpbWFnZSIsImltYWdlQXNzaWdubWVudHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwicHVzaCIsImltZ3ByZWxvYWQiLCJvbkltYWdlc0xvYWRlZCIsImltZ3MiLCJjYWxsYmFjayIsImxvYWRlZCIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiYXBwbHkiLCJpbmMiLCJsZW5ndGgiLCJpIiwiSW1hZ2UiLCJvbmFib3J0Iiwib25lcnJvciIsIm9ubG9hZCIsInNyYyIsInJlbW92ZUNvdmVyIiwiY2xhc3NOYW1lIiwib25WaXNpYmxlIiwiaXNWaXNpYmxlIiwiaXNJbWFnZXNMb2FkZWQiLCJpc0FuaW1hdGVkIiwiYW5pbWF0ZSIsIlR3ZWVuTGl0ZSIsInRvIiwiZGVsYXkiLCJlYXNlIiwib3BhY2l0eSIsInBvbGl0ZUluaXQiLCJzZXRUaW1lb3V0IiwiZXhpdEhhbmRsZXIiLCJkeW5hbWljQ29udGVudCIsImdldENvbnRlbnQiLCJiZ0V4aXQiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwiYW5jaG9yIiwiY3JlYXRlRWxlbWVudCIsInJlcGxhY2VDaGlsZCIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsaWNrVGFnIiwiZXhpdCIsIlVybCIsInNldEF0dHJpYnV0ZSIsImluaXRpYWxpemUiLCJkZXZEeW5hbWljQ29udGVudCIsIkdETiIsIm1haW5faW1hZ2UiLCJpbWFnZV91cmxfMSIsImltYWdlX3VybF8yIiwiaW1hZ2VfdXJsXzMiLCJ3aW5kb3ciLCJhZENvbnRlbnQiLCJiYW5uZXIiLCJmcmFtZTEiLCJmcmFtZTIiLCJmcmFtZTMiXSwibWFwcGluZ3MiOiJBQVdBLFFBQUFBLGFBQ0EsR0FBQUMsS0FFQSxLQUFBLEdBQUFDLEtBQUFDLGtCQUNBQyxTQUFBQyxlQUFBSCxHQUFBSSxNQUFBQyxXQUFBLE9BQUFKLGlCQUFBRCxHQUFBLElBQ0FELEVBQUFPLEtBQUFMLGlCQUFBRCxHQUVBTyxZQUFBUixFQUFBUyxnQkFJQSxRQUFBRCxZQUFBRSxFQUFBQyxHQUNBLEdBQUFDLEdBQUEsRUFDQVosSUFDQVUsR0FBQSxtQkFBQUcsT0FBQUMsVUFBQUMsU0FBQUMsTUFBQU4sR0FBQUEsR0FBQUEsRUFRQSxLQUFBLEdBTkFPLEdBQUEsV0FDQUwsR0FBQSxFQUNBQSxJQUFBRixFQUFBUSxRQUFBUCxHQUNBQSxFQUFBWCxJQUdBbUIsRUFBQSxFQUFBQSxFQUFBVCxFQUFBUSxPQUFBQyxJQUNBbkIsRUFBQW1CLEdBQUEsR0FBQUMsT0FDQXBCLEVBQUFtQixHQUFBRSxRQUFBSixFQUNBakIsRUFBQW1CLEdBQUFHLFFBQUFMLEVBQ0FqQixFQUFBbUIsR0FBQUksT0FBQU4sRUFDQWpCLEVBQUFtQixHQUFBSyxJQUFBZCxFQUFBUyxHQUtBLFFBQUFNLGVBQ0F0QixTQUFBQyxlQUFBLGdCQUFBc0IsVUFBQSxPQUlBLFFBQUFDLGFBQ0FDLFdBQUEsRUFDQUMsaUJBQUFDLGFBQ0FMLGNBQ0FNLFdBS0EsUUFBQXRCLGtCQUNBb0IsZ0JBQUEsRUFDQUQsWUFBQUUsYUFDQUwsY0FDQU0sV0FpQkEsUUFBQUEsV0FFQUMsVUFBQUMsR0FBQTlCLFNBQUFDLGVBQUEsVUFBQSxJQUFBOEIsTUFBQSxFQUFBQyxLQUFBLFlBQUFDLFFBQUEsSUFFQUosVUFBQUMsR0FBQTlCLFNBQUFDLGVBQUEsVUFBQSxJQUFBOEIsTUFBQSxFQUFBQyxLQUFBLFlBQUFDLFFBQUEsSUFFQUosVUFBQUMsR0FBQTlCLFNBQUFDLGVBQUEsVUFBQSxJQUFBOEIsTUFBQSxHQUFBQyxLQUFBLFlBQUFDLFFBQUEsSUFDQUosVUFBQUMsR0FBQTlCLFNBQUFDLGVBQUEsVUFBQSxJQUFBOEIsTUFBQSxHQUFBQyxLQUFBLFlBQUFDLFFBQUEsSUNqRkEsUUFBQUMsY0FDQUMsV0FBQSxXQUNBQyxjQUNBeEMsYUFDQSxLQUNBdUMsV0FBQSxXQUNBYixjQUNBTSxXQUNBLEtBSUEsUUFBQVEsZUFDQSxHQUFBQyxHQUFBQyxhQUNBQyxFQUFBdkMsU0FBQUMsZUFBQSxXQUNBdUMsRUFBQUQsRUFBQUUsV0FDQUMsRUFBQTFDLFNBQUEyQyxjQUFBLElBQ0FILEdBQUFJLGFBQUFGLEVBQUFILEdBQ0FHLEVBQUFHLFlBQUFOLEdBRUFBLEVBQUFPLGlCQUFBLFFBQUEsV0FDQSxLQUFBQyxXQUNBQSxTQUFBVixFQUFBVyxLQUFBQyxLQUVBUCxFQUFBUSxhQUFBLFNBQUEsVUFDQVIsRUFBQVEsYUFBQSxPQUFBSCxZQUtBLFFBQUFJLGNBQ0FuRCxTQUFBOEMsaUJBQ0E5QyxTQUFBOEMsaUJBQUEsbUJBQUFaLFlBRUFBLGFDdENBLFFBQUFJLGNBRUEsR0FBQWMsS0FrQkEsT0FqQkFBLEdBQUFDLE1BQ0FDLFlBQ0FMLElBQUEsZUFFQU0sYUFDQU4sSUFBQSxnQkFFQU8sYUFDQVAsSUFBQSxpQkFFQVEsYUFDQVIsSUFBQSxrQkFFQUQsTUFDQUMsSUFBQSwyQkFHQUcsRUFBQUMsSUFBQSxHRnBCQUssT0FBQXRDLE9BQUErQixZQUdBLElBQUFRLFdBQUFyQixhQUdBYixXQUFBLEVBQ0FDLGdCQUFBLEVBQ0FDLFlBQUEsRUE4REE1QixrQkFDQTZELE9BQUFELFVBQUFMLFdBQUFMLElBQ0FZLE9BQUFGLFVBQUFKLFlBQUFOLElBQ0FhLE9BQUFILFVBQUFILFlBQUFQLElBQ0FjLE9BQUFKLFVBQUFGLFlBQUFSLEtDekVBRixTQUFBIiwiZmlsZSI6ImFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lm9ubG9hZCA9IGluaXRpYWxpemUoKTtcblxuLy8gU2V0IHRoZSBjb250ZW50IG5lZWRlZCB0byBjcmVhdGUgdGhlIGJhbm5lclxudmFyIGFkQ29udGVudCA9IGdldENvbnRlbnQoKTtcblxuLy8gVGhlc2UgdmFyaWFibGVzIHdpbGwgbGF0ZXIgYmUgY2hlY2tlZCB0byBzZWUgaWYgYW5pbWF0aW9uIGNhbiBiZWdpbi5cbnZhciBpc1Zpc2libGUgPSBmYWxzZTtcbnZhciBpc0ltYWdlc0xvYWRlZCA9IGZhbHNlO1xudmFyIGlzQW5pbWF0ZWQgPSBmYWxzZTtcblxuLy8gU2V0IHRoZSBiYWNrZ3JvdW5kIGltYWdlcyBpbiBpbmRleC5odG1sIHRvIHRob3NlIGluIGFkQ29udGVudFxuZnVuY3Rpb24gc2V0SW1hZ2VzKCkge1xuICB2YXIgaW1hZ2VzID0gW107XG5cbiAgZm9yICh2YXIgaW1hZ2UgaW4gaW1hZ2VBc3NpZ25tZW50cykge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGltYWdlKS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgaW1hZ2VBc3NpZ25tZW50c1tpbWFnZV0gKyAnKSc7XG4gICAgaW1hZ2VzLnB1c2goaW1hZ2VBc3NpZ25tZW50c1tpbWFnZV0pO1xuICB9XG4gIGltZ3ByZWxvYWQoaW1hZ2VzLCBvbkltYWdlc0xvYWRlZCk7IFxufVxuXG4vLyBFbnN1cmUgdGhhdCBhbGwgaW1hZ2VzIGhhdmUgYmVlbiBkb3dubG9hZGVkIGJlZm9yZSB0aGUgYW5pbWF0aW9uIGJlZ2luc1xuZnVuY3Rpb24gaW1ncHJlbG9hZChpbWdzLCBjYWxsYmFjaykge1xuICB2YXIgbG9hZGVkID0gMDtcbiAgdmFyIGltYWdlcyA9IFtdO1xuICBpbWdzID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseSggaW1ncyApID09PSAnW29iamVjdCBBcnJheV0nID8gaW1ncyA6IFtpbWdzXTtcblxuICB2YXIgaW5jID0gZnVuY3Rpb24oKSB7XG4gICAgbG9hZGVkICs9IDE7XG4gICAgaWYgKCBsb2FkZWQgPT09IGltZ3MubGVuZ3RoICYmIGNhbGxiYWNrICkge1xuICAgICAgY2FsbGJhY2soIGltYWdlcyApO1xuICAgIH1cbiAgfTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKyApIHtcbiAgICBpbWFnZXNbaV0gPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZXNbaV0ub25hYm9ydCA9IGluYztcbiAgICBpbWFnZXNbaV0ub25lcnJvciA9IGluYztcbiAgICBpbWFnZXNbaV0ub25sb2FkID0gaW5jO1xuICAgIGltYWdlc1tpXS5zcmMgPSBpbWdzW2ldO1xuICB9XG59XG5cbi8vIFJlbW9iZSBjb3ZlcmluZyBkaXYgdG8gcmV2ZWFsIGFkIChjYWxsZWQgd2hlbiByZWFkeSB0byBhbmltYXRlKVxuZnVuY3Rpb24gcmVtb3ZlQ292ZXIoKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3ZlcmluZy1kaXYnKS5jbGFzc05hbWUgPSAnaGlkZSc7XG59XG5cbi8vIENhbGxlZCB3aGVuIHRoZSBhZCBpcyB2aXNpYmlsZSBpbiB0aGUgYnJvd3NlclxuZnVuY3Rpb24gb25WaXNpYmxlKCkge1xuICBpc1Zpc2libGUgPSB0cnVlO1xuICBpZiAoaXNJbWFnZXNMb2FkZWQgJiYgIWlzQW5pbWF0ZWQpIHtcbiAgICByZW1vdmVDb3ZlcigpO1xuICAgIGFuaW1hdGUoKTtcbiAgfVxufVxuXG4vLyBDYWxsZWQgd2hlbiBhbGwgaW1hZ2VzIGhhdmUgYmVlbiBkb3dubG9hZGVkXG5mdW5jdGlvbiBvbkltYWdlc0xvYWRlZCgpIHtcbiAgaXNJbWFnZXNMb2FkZWQgPSB0cnVlO1xuICBpZiAoaXNWaXNpYmxlICYmICFpc0FuaW1hdGVkKSB7XG4gICAgcmVtb3ZlQ292ZXIoKTtcbiAgICBhbmltYXRlKCk7XG4gIH1cbn1cblxuLy8vXG4vLy8qIE9OTFkgVEhFIEJFTE9XIENPREUgU0hPVUxEIE5FRUQgRURJVElORyAqLy8vXG4vLy9cblxuLy8gQXNzaWduIGltYWdlcyB0byBhbGwgZWxlbWVudHMgd2hpY2ggcmVxdWlyZSB0aGVtXG52YXIgaW1hZ2VBc3NpZ25tZW50cyA9IHtcbiAgJ2Jhbm5lcicgOiBhZENvbnRlbnQubWFpbl9pbWFnZS5VcmwsXG4gICdmcmFtZTEnIDogYWRDb250ZW50LmltYWdlX3VybF8xLlVybCxcbiAgJ2ZyYW1lMicgOiBhZENvbnRlbnQuaW1hZ2VfdXJsXzIuVXJsLFxuICAnZnJhbWUzJyA6IGFkQ29udGVudC5pbWFnZV91cmxfMy5Vcmxcbn07XG5cbi8qIFBsYWNlIGFsbCBjb2RlIHRvIGNyZWF0ZSBhZCBhbmltYXRpb25zIGluIGhlcmUgKi9cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIC8vIEZvciA1IHNlY29uZHMsIHNob3cgZnJhbWUgMVxuICBUd2VlbkxpdGUudG8oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZyYW1lMScpLCAwLjQsIHsgZGVsYXk6IDUsIGVhc2U6ICdlYXNlSW5PdXQnLCBvcGFjaXR5OiAwIH0pO1xuICAvLyBBZnRlciA1IHNlY29uZHMsIHNob3cgZnJhbWUgMlxuICBUd2VlbkxpdGUudG8oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZyYW1lMicpLCAwLjQsIHsgZGVsYXk6IDUsIGVhc2U6ICdlYXNlSW5PdXQnLCBvcGFjaXR5OiAxIH0pO1xuICAvLyBBZnRlciA1IHNlY29uZHMsIGhpZGUgZnJhbWUgMiBhbmQgc2hvdyBmcmFtZSAzXG4gIFR3ZWVuTGl0ZS50byhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnJhbWUyJyksIDAuNCwgeyBkZWxheTogMTAsIGVhc2U6ICdlYXNlSW5PdXQnLCBvcGFjaXR5OiAwIH0pO1xuICBUd2VlbkxpdGUudG8oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZyYW1lMycpLCAwLjQsIHsgZGVsYXk6IDEwLCBlYXNlOiAnZWFzZUluT3V0Jywgb3BhY2l0eTogMSB9KTtcbn0iLCIvLyBJbml0aWFsaXNlIHZhcmlhYmxlc1xudmFyIGNsaWNrVGFnID0gXCJcIjtcblxuLy8gQmVnaW4gYW5pbWF0aW9uIGFmdGVyIGEgdGltZSBkZWxheSB0byBhbGxvdyBmb3IgbG9hZGluZ1xuZnVuY3Rpb24gcG9saXRlSW5pdCgpIHtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgXG4gICAgZXhpdEhhbmRsZXIoKTtcbiAgICBzZXRJbWFnZXMoKTtcbiAgfSwgNTAwKTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgXG4gICAgcmVtb3ZlQ292ZXIoKTtcbiAgICBhbmltYXRlKCk7XG4gIH0sIDEwMDApO1xufVxuXG4vLyBBdHRhY2ggZXhpdCB1cmwgdG8gYmctZXhpdCBlbGVtZW50XG5mdW5jdGlvbiBleGl0SGFuZGxlcigpIHtcbiAgdmFyIGR5bmFtaWNDb250ZW50ID0gZ2V0Q29udGVudCgpO1xuICB2YXIgYmdFeGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JnLWV4aXQnKTtcbiAgdmFyIHBhcmVudCA9IGJnRXhpdC5wYXJlbnROb2RlO1xuICB2YXIgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBwYXJlbnQucmVwbGFjZUNoaWxkKGFuY2hvciwgYmdFeGl0KTtcbiAgYW5jaG9yLmFwcGVuZENoaWxkKGJnRXhpdCk7XG5cbiAgYmdFeGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKGNsaWNrVGFnID09PSBcIlwiKSB7XG4gICAgICBjbGlja1RhZyA9IGR5bmFtaWNDb250ZW50LmV4aXQuVXJsO1xuICAgIH1cbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG4gICAgYW5jaG9yLnNldEF0dHJpYnV0ZSgnaHJlZicsIGNsaWNrVGFnKTtcbiAgfSk7XG59XG5cbi8vIFdhaXQgZm9yIHRoZSBET00gdG8gbG9hZCBiZWZvcmUgaW5pdGlhbGlzaW5nIGJhbm5lciBsb2FkXG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICBpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikgey8vIEZvciBhbGwgbWFqb3IgYnJvd3NlcnMsIGV4Y2VwdCBJRSA4IGFuZCBlYXJsaWVyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgcG9saXRlSW5pdCk7XG4gIH0gZWxzZSB7XG4gICAgcG9saXRlSW5pdCgpO1xuICB9XG59XG4iLCJmdW5jdGlvbiBnZXRDb250ZW50KCkge1xuICAvKiBDcmVhdGUgeW91ciBvd24gdmVyc2lvbiBvZiB0aGUgYmVsb3cgb2JqZWN0IHdpdGggbG9jYWwgcmVmZXJlbmNlcyAqL1xuICB2YXIgZGV2RHluYW1pY0NvbnRlbnQgPSB7fTtcbiAgZGV2RHluYW1pY0NvbnRlbnQuR0ROID0gW3tcbiAgICBtYWluX2ltYWdlIDoge1xuICAgICAgVXJsIDogXCJpbWcvcmVkLmpwZ1wiXG4gICAgfSxcbiAgICBpbWFnZV91cmxfMSA6IHtcbiAgICAgIFVybCA6IFwiaW1nL2JsdWUuanBnXCJcbiAgICB9LFxuICAgIGltYWdlX3VybF8yIDoge1xuICAgICAgVXJsIDogXCJpbWcvZ3JlZW4uanBnXCJcbiAgICB9LFxuICAgIGltYWdlX3VybF8zIDoge1xuICAgICAgVXJsIDogXCJpbWcvb3JhbmdlLmpwZ1wiXG4gICAgfSxcbiAgICBleGl0IDoge1xuICAgICAgVXJsIDogXCJodHRwOi8vd3d3Lmdvb2dsZS5jb21cIlxuICAgIH1cbiAgfV07XG4gIHJldHVybiBkZXZEeW5hbWljQ29udGVudC5HRE5bMF07XG59XG5cbi8vIFRPRE86IFJlZmFjdG9yIHRoZSBhYm92ZSB0byByZXRhaW4gc3RydWN0dXJlIGJ1dCBhZGQgc2ltcGxpY2l0eS4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
