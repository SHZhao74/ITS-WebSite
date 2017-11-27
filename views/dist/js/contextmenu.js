var globe_caurrentLatLng;
function getCanvasXY(caurrentLatLng){
      var scale = Math.pow(2, map.getZoom());
     var nw = new google.maps.LatLng(
         map.getBounds().getNorthEast().lat(),
         map.getBounds().getSouthWest().lng()
     );
     var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
     var worldCoordinate = map.getProjection().fromLatLngToPoint(caurrentLatLng);
     var caurrentLatLngOffset = new google.maps.Point(
         Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
         Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
     );
     return caurrentLatLngOffset;
}
function setMenuXY(caurrentLatLng){
    var mapWidth = $('#map').width();
    var mapHeight = $('#map').height();
    var menuWidth = $('.contextmenu').width();
    var menuHeight = $('.contextmenu').height();
    var clickedPosition = getCanvasXY(caurrentLatLng);
    var x = clickedPosition.x ;
    var y = clickedPosition.y ;

    if((mapWidth - x ) < menuWidth)
         x = x - menuWidth;
    if((mapHeight - y ) < menuHeight)
        y = y - menuHeight;

    $('.contextmenu').css('left',x  );
    $('.contextmenu').css('top',y );
    };
function showContextMenu(caurrentLatLng) {
    var projection;
    var contextmenuDir;
    globe_caurrentLatLng=caurrentLatLng
    projection = map.getProjection() ;
    $('.contextmenu').remove();
    contextmenuDir = document.createElement("div");
    contextmenuDir.className  = 'contextmenu';
    contextmenuDir.innerHTML = "<a id='menu1' href='javascript:void(0);' onclick='ShowOld();'><div class=context>取得地址<\/div><\/a><a id='menu2'><div class=context>電子圍籬<\/div><\/a>";
    $(map.getDiv()).append(contextmenuDir);
    setMenuXY(caurrentLatLng);
    contextmenuDir.style.visibility = "visible";
}
function ShowOld(){
    var temp="latlng="+globe_caurrentLatLng.lat()+","+globe_caurrentLatLng.lng();
    var latlng=globe_caurrentLatLng.lat()+","+globe_caurrentLatLng.lng();
    var key="AIzaSyC3bc62C0Kt3a6qhalwL_axQUPzrJhjqHs";
    var language="zh-TW";
    var location_type="ROOFTOP";
    var result_type="street_address";
    console.log(temp);
    $('.contextmenu').remove();
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json", { latlng:latlng, key:key, language:language, location_type:location_type , result_type:result_type}, function(json){
        alert(json.results[0].formatted_address);
      });
    //https://maps.googleapis.com/maps/api/geocode/json?latlng=25.03665509924524,121.52194261550903&key=AIzaSyC3bc62C0Kt3a6qhalwL_axQUPzrJhjqHs&language=zh-TW&location_type=ROOFTOP&result_type=street_address
}