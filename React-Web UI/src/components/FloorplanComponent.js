import React,{Component} from 'react';
import L, { marker } from 'leaflet';
import ReactDOM from 'react-dom';


class Floorplan extends Component {

    constructor(){
        super();
        this.state = {
            datalist :[]
        }
    }

    componentDidMount(){
        console.log("Component has mounted")

        var map =this.map =  L.map(ReactDOM.findDOMNode(this),{
            center: [1.34090,103.96315],
            zoom: 20,
            zoomControl: false,
        });

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
        }).addTo(map);

        //fetch project data and display
        fetch('http://localhost:3001/getSquares')
            .then(function(response){
                response.json()
                    .then(function(data) {
                        // debugger
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
                                .addTo(map);

                                //var marker = L.marker(polygon.getCenter()).addTo(map);
                                //console.log(polygon.getBounds());
                                polygon.on('dragend',function(e){
                                    console.log(e.getLatLngs)
                                    var attri = polygon.getLatLngs();
                                    console.log(attri);
                                })
                                map.on('click',function(e){
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

    }

    render(){
        return (
            <div className = "map">
            </div>
        )
    }

}

    
 export default Floorplan;