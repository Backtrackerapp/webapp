
'use strict';

angular.module('map').directive('myMarker', function($compile, $timeout, mapboxService, Map, $location) {
    var _colors = {
        navy: '#001f3f',
        blue: '#0074d9',
        aqua: '#7fdbff',
        teal: '#39cccc',
        olive: '#3d9970',
        green: '#2ecc40',
        lime: '#01ff70',
        yellow: '#ffdc00',
        orange: '#ff851b',
        red: '#ff4136',
        fuchsia: '#f012be',
        purple: '#b10dc9',
        maroon: '#85144b',
        white: 'white',
        silver: '#dddddd',
        gray: '#aaaaaa',
        black: '#111111'
    };

    return {
        restrict: 'E',
        require: '^mapbox',
        transclude: true,
        scope: true,
        link: link
    };

    function link(scope, element, attrs, controller, transclude) {
        var _marker, _opts, _style;

        _opts = { draggable: attrs.draggable !== undefined };
        _style = setStyleOptions(attrs);

        controller.getMap().then(function(map) {
            transclude(scope, function(transcludedContent) {
                var popupContentElement;
                if(transcludedContent && attrs.popup) {
                    popupContentElement = document.createElement('span');
                    for(var i = 0; i < transcludedContent.length; i++) {
                        popupContentElement.appendChild(transcludedContent[i]);
                    }
                }

                if(attrs.currentLocation !== undefined) {
                    _style = setStyleOptions(_style, { 'marker-color': '#000', 'marker-symbol': 'star' });
                    _opts.excludeFromClustering = true;

                    map.on('locationfound', function(e) {
                        _marker = addMarker(scope, map, [e.latlng.lat, e.latlng.lng], popupContentElement, _opts, _style);
                    });

                    map.locate();
                } else {
                    _marker = addMarker(scope, map, [attrs.lat, attrs.lng], popupContentElement, _opts, _style, attrs);
                }
            });

            element.bind('$destroy', function() {
                if(mapboxService.markers) {
                    scope.clusterGroup.removeLayer(_marker);
                } else {
                    mapboxService.removeMarker(map, _marker);
                }
            });
        });
    }

    function setStyleOptions(attrs, defaultOpts) {
        var opts = defaultOpts || {};
        if(attrs.size) {
            opts['marker-size'] = attrs.size;
        }
        if(attrs.color) {
            if(attrs.color[0] === '#') {
                opts['marker-color'] = attrs.color;
            } else {
                opts['marker-color'] = _colors[attrs.color] || attrs.color;
            }
        }
        if(attrs.icon) {
            opts['marker-symbol'] = attrs.icon;
        }
        if(attrs.iconUrl) {
            opts['icon-url'] = attrs.iconUrl;
        }
        return opts;
    }

    function addMarker(scope, map, latlng, popupContent, opts, style, attrs) {
        opts = opts || {};

        if(attrs.markerType) {
            if(attrs.image) {
                var marker = L.marker(latlng, {icon: L.divIcon({
                    className: attrs.markerType + '-icon',
                    iconSize: [attrs.markerWidth, attrs.markerHeight],
                    iconAnchor: [attrs.markerOffsetLeft, attrs.markerOffsetTop],
                    html: '<img src="'+attrs.image+'"/>'
                })});
            } else {
                var marker = L.marker(latlng, {icon: L.divIcon({
                    className: attrs.markerType + '-icon',
                    iconSize: [attrs.markerWidth, attrs.markerHeight],
                    iconAnchor: [attrs.markerOffsetLeft, attrs.markerOffsetTop]
                })});
            }
        } else {
            var marker = L.mapbox.marker.style({ properties: style }, latlng);
        }

        var opts = {};
        if(attrs.markerType) {
            if(attrs.markerType == 'myPost' || attrs.markerType == 'post' || attrs.markerType == 'ghost') {
                var opts = {offset: [0,0]};
            } else {
                var opts = {offset: [0,-40]};
            }
        }

        if(popupContent) {
            marker.bindPopup(popupContent, opts);
        }

        if(attrs.markerType) {
            if(attrs.markerType == 'myPost' || attrs.markerType == 'post' || attrs.markerType == 'ghost') {
                marker.on('mouseover', function (e) {
                    this.openPopup();
                });
                marker.on('mouseout', function (e) {
                    this.closePopup();
                });
                if(attrs.markerType != "ghost") {
                    marker.on('click', function(e) {
                        scope.$apply(function(self) {
                            self.clickPost(attrs.post);
                        })
                    });
                }
            } else if(attrs.markerType == 'friend') {
                marker.on('click', function(e) {
                    scope.$apply(function(self) {
                        $location.path('/users/' + scope.$eval(attrs.user).id);
                    })
                });
            } else {
                marker.on('mouseover', function (e) {
                    this.openPopup();
                });
                marker.on('mouseout', function (e) {
                    this.closePopup();
                });
                marker.on('click', function(e) {
                    scope.$apply(function(self) {
                        self.clickHighlight(attrs.highlight);
                    })
                });
            }
        }

        if(mapboxService.getOptionsForMap(map).clusterMarkers && opts.excludeFromClustering !== true) {
            scope.clusterGroup.addLayer(marker);
        } else {
            if(attrs.markerType.indexOf('highlight') != -1) {
                Map.addClusteredMarker(marker);
                // marker.addTo(map);
            } else {
                marker.addTo(map);
            }
        }

        // this needs to come after being added to map because the L.mapbox.marker.style() factory
        // does not let us pass other opts (eg, draggable) in
        if(opts.draggable) {
            marker.dragging.enable();
        }

        if(attrs.markerType.indexOf('highlight') != -1) {

        } else {
            mapboxService.addMarker(marker);
        }

        return marker;
    }
});
