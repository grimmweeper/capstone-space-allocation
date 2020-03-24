import React,{Component} from 'react';
import L from 'leaflet';
//import {Map,Popup, Marker, TileLayer,Polygon} from 'react-leaflet';
import ReactDOM from 'react-dom';


var myIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [22, 94],
    popupAnchor: [-10, -90],

})

const mymarker = [1.34095,103.96305]

var polygon =[
    [1.34095,103.96305],
    [1.34095,103.96300],
    [1.34090,103.96300],
    [1.34090,103.96305],
]




class Floorplan extends Component {
    
    componentDidMount(){
        var map = this.map = L.map(ReactDOM.findDOMNode(this),{
            center: [1.34090,103.96300],
            zoom: 19,
            zoomControl: false,
        });

        L.tileLayer('https://api.mapbox.com/styles/v1/pluying/ck84heeuz6eij1is0i361ued0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGx1eWluZyIsImEiOiJjazgycHJ2aWEwb3VkM2VxcTE1dmJ4cHJsIn0.4TzOMB_v_aekafcxXa9-tg',{
            minZoom:0,
            maxZoom:22,
            noWrap: true,
            continuousWorld:false,

        }).addTo(this.map);

        //marker
        var marker = L.marker(mymarker,{
            icon: myIcon,
            draggable: true
        }).addTo(this.map)
        marker.bindPopup('<b>here is popup (1,1)</b>')

        // Circle Movement
        var circle = L.circle([1.34090,103.96300], 10).addTo(map);

        circle.on({
            mousedown: function () {
              map.on('mousemove',function (e) {
                circle.setLatLng(e.latlng);
              });
            }
        }); 

        map.on('mouseup',function(e){
            map.removeEventListener('mousemove');
        })

        //polygon Movement

        var poly = L.polygon(polygon,{
            color: 'red',
        }).addTo(this.map);

        poly.on({
            mousedown: function () {
              poly.on('mousemove', function (e) {

                var point0 = L.point([e.latlng.lat,e.latlng.lng]);
                point0 = point0.add([-0.000025,0.000025]);
                var point1 = L.point([e.latlng.lat,e.latlng.lng]);
                point1 = point1.add([0.000025,0.000025]);
                var point2 = L.point([e.latlng.lat,e.latlng.lng]);
                point2 = point2.add([0.000025,-0.000025]);
                var point3 = L.point([e.latlng.lat,e.latlng.lng]);
                point3 = point3.add([-0.000025,-0.000025]);
                
                    
                var newpoly = [
                    [point0.x,point0.y],
                    [point1.x,point1.y],
                    [point2.x,point2.y],
                    [point3.x,point3.y],
                ]

                poly.setLatLngs(newpoly);
                
              });
            }
        });

        poly.on('mouseup',function(e){
           poly.removeEventListener('mousemove');
        })


    }

    render(){
        return <div className='webmap'></div>
    }

}

export default Floorplan;