
import React,{Component} from 'react';
import L from 'leaflet';
//import {Map,Popup, Marker, TileLayer,Polygon} from 'react-leaflet';
import ReactDOM from 'react-dom';


var myIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 40],
    popupAnchor: [-10, -90],

})

const mymarker = [1.34095,103.96305]

var polygon =[
    [1.34095,103.96305],
    [1.34095,103.96300],
    [1.34090,103.96300],
    [1.34090,103.96305],
]

var polygon1 = [
    [
        [1.34095,103.96305],
        [1.34095,103.96300],
        [1.34090,103.96300],
        [1.34090,103.96305],
    ],
    [
        [1.34105,103.96305],
        [1.34105,103.96300],
        [1.34100,103.96300],
        [1.34100,103.96305],
    ],
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
        var circle = L.circle([1.34090,103.96300], {
            radius: 10,
            draggable: true,
        }).addTo(map);

        //polygon Movement
        var poly = new L.Polygon(polygon,{
            draggable: 'true',
            color: 'red',
        }).addTo(this.map);


        map.on('click',function(e){
            console.log('click',e);
           //map.removeEventListener('mousemove');
        })


    }

    render(){
        return <div className='webmap'></div>
    }

}

    
 export default Floorplan;