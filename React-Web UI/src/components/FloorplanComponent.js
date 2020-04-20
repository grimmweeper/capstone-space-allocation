import React,{Component} from 'react';
import L, { marker } from 'leaflet';
import ReactDOM from 'react-dom';
import 'leaflet.sync';


class Floorplan extends Component {

    constructor(){
        super();
        this.state = {
            datalist :[]
        }
    }

    componentDidMount(){
        console.log("Component has mounted")

        var L1_map = this.L1_map = new L.map('L1_map').setView([1.34090,103.96315], 20)

        // generate random color
        function getColor(){
            var color = '#';
            var letter = '0123456789ABCDEF';
            for (var i =0; i < 6;i++){
                color += letter[Math.floor(Math.random()*16)];
            }
            return color;
        }
        
        //create tilelayer for the map
        L.tileLayer('https://api.mapbox.com/styles/v1/pluying/ck84heeuz6eij1is0i361ued0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGx1eWluZyIsImEiOiJjazgycHJ2aWEwb3VkM2VxcTE1dmJ4cHJsIn0.4TzOMB_v_aekafcxXa9-tg',{
            minZoom:0,
            maxZoom:22,
            noWrap: true,
            continuousWorld:false,
        }).addTo(L1_map);


        //fetch project data and display

        fetch('http://localhost:3001/getSquares')
            .then(function(response){
                response.json()
                .then(function(data) {
                    for (let i = 0; i < data.length; i++){
                        // debugger
                        var polydetail = "Project Name: " + data[i].project_name
                        var geojson = JSON.parse(data[i].st_asgeojson);
                        //console.log(geojson.coordinates)
                        //transform to LatLng
                        var coors = geojson.coordinates[0];
                        //console.log(coors);
                        var latlng = [];
                        for (var j=0; j<coors.length;j++){
                            var temp = [coors[j][1],coors[j][0]]
                            latlng.push(temp);
                        }
                        //console.log(latlng);

                        /*const geojsonFeature = {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Polygon',
                                coordinates: geojson.coordinates,
                            }
                        };*/
                        

                        var polygon = L.polygon(latlng,{
                            draggable: 'true',
                            color: getColor(),
                        })
                        .bindPopup(polydetail)
                        .addTo(L1_map);

                        //var marker = L.marker(polygon.getCenter()).addTo(map);
                        //console.log(polygon.getBounds());
                        // trying to retrive polygon data 
                        /*polygon.on('dragend',function(e){
                            console.log(e.getLatLngs)
                            var attri = polygon.getLatLngs();
                            console.log(attri);
                        })*/
                        L1_map.on('click',function(e){
                            console.log('click'+e.latlng);
                        })

                        /*L.geoJSON(JSON.parse(data[i].st_asgeojson),{
                            style: function(feature){
                                return{
                                    color: getColor(),
                                    
                                }
                            }, 
                            onEachFeature: function(feature,layer){
                                layer.on('mousedown',function(){
                                    //feature.dragging.disable();
                                    map.on('mousemove',function(e){
                                        //layer.
                                    })
                                    console.log("map disable")
                                })
                            }
                        })
                        .bindPopup(polydetail)
                        .addTo(map)*/


                    }
            })
        })


        var L2_map = this.L2_map = new L.map('L2_map').setView([1.34090,103.96315], 20)

        L.tileLayer('https://api.mapbox.com/styles/v1/pluying/ck84heeuz6eij1is0i361ued0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGx1eWluZyIsImEiOiJjazgycHJ2aWEwb3VkM2VxcTE1dmJ4cHJsIn0.4TzOMB_v_aekafcxXa9-tg',{
            minZoom:0,
            maxZoom:22,
            noWrap: true,
            continuousWorld:false,
        }).addTo(L2_map);

        L1_map.sync(L2_map);
        L2_map.sync(L1_map);


    }


    render(){
        return (
            <div className = "map">
                <div id = "L1_map"></div>
                <div id = "space"></div>
                <div id = "L2_map"></div>
            </div>
        )
    }

}

    
 export default Floorplan;