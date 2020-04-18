import React,{Component} from 'react';
import L from 'leaflet';
import ReactDOM from 'react-dom';




/*var dataeg = [
    [
        [
            [1.34095,103.96305],
            [1.34095,103.96300],
            [1.34090,103.96300],
            [1.34090,103.96305],
        ],
        'This is polygon 1',
    ],
    [
        [
            [1.34105,103.96305],
            [1.34105,103.96300],
            [1.34100,103.96300],
            [1.34100,103.96305],
        ],
        'This is polygon 2',
    ],
];*/


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

        L.tileLayer('https://api.mapbox.com/styles/v1/pluying/ck84heeuz6eij1is0i361ued0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGx1eWluZyIsImEiOiJjazgycHJ2aWEwb3VkM2VxcTE1dmJ4cHJsIn0.4TzOMB_v_aekafcxXa9-tg',{
            minZoom:0,
            maxZoom:22,
            noWrap: true,
            continuousWorld:false,
        }).addTo(map);

        var that = this;
        fetch('http://localhost:3001/getSquares')
            .then(function(response){
                response.json()
                    .then(function(data) {
                        // debugger
                        // that.setState({
                        //     datalist: data 
                        // })
                        // console.log(data);
                        // console.log("datalist",that.state.datalist[0]);

                        // for (var i =0; i < that.state.datalist.length;i++){
                        //     var polydata = [
                        //         [that.state.datalist[i].p1.x,that.state.datalist[i].p1.y],
                        //         [that.state.datalist[i].p2.x,that.state.datalist[i].p2.y],
                        //         [that.state.datalist[i].p3.x,that.state.datalist[i].p3.y],
                        //         [that.state.datalist[i].p4.x,that.state.datalist[i].p4.y],
                        //     ]

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
                                .addTo(map)
                                // debugger
                            }

                    })
            })


        map.on('click',function(e){
            console.log('click',e);
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