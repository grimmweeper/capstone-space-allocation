import React,{Component} from 'react';
import L from 'leaflet';
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

        L.tileLayer('https://api.mapbox.com/styles/v1/pluying/ck84heeuz6eij1is0i361ued0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGx1eWluZyIsImEiOiJjazgycHJ2aWEwb3VkM2VxcTE1dmJ4cHJsIn0.4TzOMB_v_aekafcxXa9-tg',{
            minZoom:0,
            maxZoom:22,
            noWrap: true,
            continuousWorld:false,
        }).addTo(L1_map);

        fetch('http://localhost:3001/getSquares')
            .then(function(response){
                response.json()
                .then(function(data) {
                    for (let i = 0; i < data.length; i++){
                        // debugger
                        var polydetail = "Project Name: " + data[i].project_name
                                    // +"Type of Prototype: " + JSON.parse(data[i].st_asgeojson)
                        
                        // new L.Polygon(JSON.parse(data[i].st_asgeojson),{
                        //     draggable: 'true',
                        //     color: 'red',
                        // })

                        L.geoJSON(JSON.parse(data[i].st_asgeojson))
                        .bindPopup(polydetail)
                        .addTo(L1_map)
                    }
                })
            })
        L1_map.on('click',function(e){
            console.log('click',e);
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