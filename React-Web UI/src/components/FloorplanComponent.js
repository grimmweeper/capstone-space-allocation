import React,{Component} from 'react';
import L from 'leaflet';
import ReactDOM from 'react-dom';
import Sidebar from './SidebarComponent';


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
        fetch('http://localhost:3000/api/project-data')
            .then(function(response){
                response.json()
                    .then(function(data) {
                        that.setState({
                            datalist: data 
                        })
                        console.log(data);
                        console.log("datalist",that.state.datalist[0]);

                        for (var i =0; i < that.state.datalist.length;i++){
                            var polydata = [
                                [that.state.datalist[i].p1.x,that.state.datalist[i].p1.y],
                                [that.state.datalist[i].p2.x,that.state.datalist[i].p2.y],
                                [that.state.datalist[i].p3.x,that.state.datalist[i].p3.y],
                                [that.state.datalist[i].p4.x,that.state.datalist[i].p4.y],
                            ]

                            var polydetail = "Project Nmae: "+JSON.stringify(that.state.datalist[i].project_name)
                                            +"Type of Prototype: " +JSON.stringify(that.state.datalist[i].type_of_prototype);


                            new L.Polygon(polydata,{
                                draggable: 'true',
                                color: 'red',
                            })
                            .bindPopup(polydetail)
                            .addTo(map);
                        }

                    })
            })


        map.on('click',function(e){
            console.log('click',e);
        })


    }

    render(){
        return (
            <div>
                <Sidebar/>
                <div className = 'map'>      
            </div>
            </div>    


        )
    }

}

    
 export default Floorplan;