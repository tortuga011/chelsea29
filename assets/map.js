function startMap() {
  var poiLoader = (function () {
    var self = {
      map: null,
      markers: [],
      infoWindow: null
    };

    function clearMarkers() {
      for (var i = 0; i < self.markers.length; i++) {
        self.markers[i].setMap(null);
      }
      self.markers = [];
    }

    function set(data, type) {
      clearMarkers();
      var building = '../assets/img/building.png';
      var buildingMarker = new google.maps.Marker({
        position: { lat: 40.746500, lng: -74.001374 },
        map: map,
        icon: building
      });

      for (var i = 0; i < data.length; i++) {
        var image = '../assets/img/icon.png';
        var marker = new google.maps.Marker({
          position: { lat: parseFloat(data[i].latitude), lng: parseFloat(data[i].longitude) },
          map: map,
          icon: image
        });

        (function (marker, data) {
          marker.addListener('click', function () {

            self.infoWindow.setContent('' +

              '<div id="iw-container">' +
              '<div class="iw-title">' +
              data.name +
              '</div>' +
              '</div>'

              //'<div class="infoWindow-holder">' +
              //'<h3 class="location-name">' +
              //data.name +
              //'</h3>' +
              //'</div>'
            );
            self.infoWindow.open(map, marker);


            // *
            // START INFOWINDOW CUSTOMIZE.
            // The google.maps.event.addListener() event expects
            // the creation of the infowindow HTML structure 'domready'
            // and before the opening of the infowindow, defined styles are applied.
            // *
            google.maps.event.addListener(self.infoWindow, 'domready', function () {

              // Reference to the DIV that wraps the bottom of infowindow
              var iwOuter = $('.gm-style-iw');

              /* Since this div is in a position prior to .gm-div style-iw.
               * We use jQuery and create a iwBackground variable,
               * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
               */
              var iwBackground = iwOuter.prev();

              // Removes background shadow DIV
              iwBackground.children(':nth-child(2)').css({ 'display': 'none' });

              // Removes white background DIV
              iwBackground.children(':nth-child(4)').css({ 'display': 'none' });

              //// Moves the infowindow 115px to the right.
              //iwOuter.parent().parent().css({left: '115px'});
              //
              //// Moves the shadow of the arrow 76px to the left margin.
              //iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
              //
              //// Moves the arrow 76px to the left margin.
              //iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

              // Changes the desired tail shadow color.
              iwBackground.children(':nth-child(3)').find('div').children().css({ 'background-color': '#FDC70C', 'box-shadow': 'rgba(0, 0, 0, 0.6) 0px 1px 6px', 'z-index': '1' });

              // Reference to the div that groups the close button elements.
              var iwCloseBtn = iwOuter.next();

              // Apply the desired effect to the close button
              iwCloseBtn.css({ opacity: '0', display: 'none', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9' });



              // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
              iwCloseBtn.mouseout(function () {
                $(this).css({ opacity: '1' });
              });
            });

          });
        })(marker, data[i]);

        self.markers.push(marker);
      }
    }

    var constructor = function PoiLoader(map) {
      if (map === undefined) {
        throw new Error('Google map object must be passed as first parameter.')
      }
      self.infoWindow = new google.maps.InfoWindow({});
      // Fixes the problem when zoom doesn't change after map.fitBounds is set
      google.maps.event.addListenerOnce(map, 'zoom_changed', function () {
        map.setZoom(map.getZoom());
      });
      // Closes infoWindow when user clicks somewhere on the map
      google.maps.event.addListener(map, "click", function (event) {
        self.infoWindow.close();
      });
    };

    constructor.prototype.set = set;

    return constructor;
  })();

  var styles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#f4ece0"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#555555"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f4ecdf"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#818181"
        },
        {
          "visibility": "on"
        },
        {
          "weight": 0.5
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#12031b"
        },
        {
          "visibility": "off"
        },
        {
          "weight": 1
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f4ecdf"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#818181"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#818181"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#818181"
        },
        {
          "visibility": "on"
        },
        {
          "weight": 0.5
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#818181"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f4ecdf"
        },
        {
          "visibility": "on"
        },
        {
          "weight": 3.5
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#909090"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#545454"
        }
      ]
    }
  ];

  var center = new google.maps.LatLng(40.746500, -74.001374);

  function initialize() {
    if (document.getElementById('map')) {
      window.map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 16,
        mapTypeControl: false,
        scrollwheel: false,
        panControl: false
      });

      map.setOptions({
        styles: styles
      });

      pl = new poiLoader(map);

      $.ajax({
        url: '/dashboard/get-filter-objects',
        success: function (res) {
          pl.set(res);
        }
      });

      $('.js-filter').click(function (event) {
        var id = $(this).data('id');
        $.ajax({
          url: '/dashboard/get-filter-objects/' + id,
          success: function (res) {
            pl.set(res);
          }
        });
      });

      var buildingImage = '../assets/img/building.png'; // url of building star
      var buildingLatLng = center;
      var buildingMarker = new google.maps.Marker({
        position: buildingLatLng,
        map: map,
        icon: buildingImage
      });
    }
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  google.maps.event.addDomListener(window, 'resize', function () {
    map.setCenter(center);
  });

  return initialize();
}

startMap();
