
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("info-id").style.display="none";
    window.arr = [];

    window.address_lat_lng = [];
    let map;
    let overlay;
    const json_obj = require('../properties.json');
    let sep_arr = [];
    let oct_arr = [];
    let nov_arr = [];
    let dec_arr = [];
    let jan_arr = [];
    let feb_arr = [];
    let march_arr = [];
    let april_arr = [];
    let may_arr = [];
    let june_arr = [];
    let july_arr = [];
    let aug_arr = [];

    for(let i =0; i<json_obj.properties.length; i++){
        
        
        if (json_obj.properties[i].SALEDATE.startsWith("9/")){
            sep_arr.push(json_obj.properties[i]);
        }
        else if (json_obj.properties[i].SALEDATE.startsWith("10")) {
            oct_arr.push(json_obj.properties[i]);
        }

        else if (json_obj.properties[i].SALEDATE.startsWith("11")) {
            nov_arr.push(json_obj.properties[i]);
        }

        else if (json_obj.properties[i].SALEDATE.startsWith("12")) {
            dec_arr.push(json_obj.properties[i]);
        }

        else if (json_obj.properties[i].SALEDATE.startsWith("1/")) {
            jan_arr.push(json_obj.properties[i]);
        }

        else if (json_obj.properties[i].SALEDATE.startsWith("2/")) {
            feb_arr.push(json_obj.properties[i]);
        }
        else if (json_obj.properties[i].SALEDATE.startsWith("3/")) {
            march_arr.push(json_obj.properties[i]);
        }
        else if (json_obj.properties[i].SALEDATE.startsWith("4/")) {
            april_arr.push(json_obj.properties[i]);
        }

        else if (json_obj.properties[i].SALEDATE.startsWith("5/")) {
            may_arr.push(json_obj.properties[i]);
        }

        else if (json_obj.properties[i].SALEDATE.startsWith("6/")) {
            june_arr.push(json_obj.properties[i]);
        }
        else if (json_obj.properties[i].SALEDATE.startsWith("7/")) {
            july_arr.push(json_obj.properties[i]);
        }

        else if (json_obj.properties[i].SALEDATE.startsWith("8/")) {
            aug_arr.push(json_obj.properties[i]);
        }        
    }
    
    sep_arr = sep_arr.slice(0, 300);
    oct_arr = oct_arr.slice(0, 300);
    nov_arr = nov_arr.slice(0, 300);
    dec_arr = dec_arr.slice(0, 300);
    jan_arr = jan_arr.slice(0, 300);
    feb_arr = feb_arr.slice(0, 300);
    march_arr = march_arr.slice(0, 300);
    april_arr = april_arr.slice(0, 300);
    may_arr = may_arr.slice(0, 300);
    june_arr = june_arr.slice(0, 300);
    july_arr = july_arr.slice(0, 300);
    aug_arr = aug_arr.slice(0, 300)
    let animation = [sep_arr, oct_arr, nov_arr, dec_arr, jan_arr, feb_arr,
        march_arr, april_arr, may_arr, june_arr, july_arr, aug_arr];

    

        map = new window.google.maps.Map(d3.select("#map").node(), {
            zoom: 12,
            center: { lat: 40.730610, lng: -73.935242 },
            //style array taken from https://developers.google.com/maps/documentation/javascript/styling
            styles: [
                { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{ color: '#263c3f' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#6b9a76' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{ color: '#38414e' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#212a37' }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#9ca5b3' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{ color: '#746855' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#1f2835' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#f3d19c' }]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{ color: '#2f3948' }]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{ color: '#17263c' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#515c6d' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#17263c' }]
                }
            ]
        });
        window.map = map;
    var inputValue = null;
    var month = ["Sep'16", "Oct'16", "Nov'16", "Dec'16", "Jan'17", "Feb'17", "Mar'17", "Apr'17", "May'17", "Jun'17", "Jul'17", "Aug'17"];
    d3.select("#timeslide").on("input", function () {
        update(+this.value);
    });
    layers(sep_arr);

    

    
    function update(value) {
        document.getElementById("range").innerHTML = month[value];
        inputValue = month[value];
       
        let arg;
        if (inputValue.startsWith("Sep'16")) {
            arg= sep_arr;
        }
        else if (inputValue.startsWith("Oct'16")) {
           
            arg = oct_arr;
        }
        else if (inputValue.startsWith("Nov'16")) {
            arg = nov_arr;
        }
        else if (inputValue.startsWith("Dec")) {
            arg = dec_arr;
        }
        else if (inputValue.startsWith("Jan")) {
            arg = jan_arr;
        }
        else if (inputValue.startsWith("Feb")) {
            arg = feb_arr;
        }
        else if (inputValue.startsWith("Mar")) {
            arg = march_arr;
        }
        else if (inputValue.startsWith("Apr")) {
            arg = april_arr;
        }
        else if (inputValue.startsWith("May")) {
            arg = may_arr;
        }
        else if (inputValue.startsWith("Jun")) {
            arg = june_arr;
        }
        else if (inputValue.startsWith("Jul")) {
            arg = july_arr;
        }
        else if (inputValue.startsWith("Aug")) {
            arg = aug_arr;
        }
    
        layers(arg);
    }



    
        
    
    function layers(arg){
        
        d3.json('./properties2.json').then(function (error, data) {
            overlay = new google.maps.OverlayView();
            // debugger
            overlay.onAdd = function () {
                // debugger
                d3.select(".stations").remove();
                // debugger
                let layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "stations");
                // debugger
                overlay.draw = function () {
                    const projection = this.getProjection(),
                        padding = 50;

                    let marker = layer.selectAll("svg")
                        .data(d3.entries(arg))
                        .each(transform)
                        .enter()
                        .append("svg")
                        .each(transform)
                        .attr("class", "marker")
                    
                    marker.append("circle")
                        .attr("r", 4.5)
                        .attr("cx", padding)
                        .attr("cy", padding);

                    


                    // marker.append("text")
                    //     .attr("x", padding + 7)
                    //     .attr("y", padding)
                    //     .attr("dy", ".31em")
                
                    //     .text(function (d) {

                    //         return d.key;
                    //     });
                   
                    function transform(d) {

                        let salesPrice = d.value.SALEPRICE;
                        let  address = d.value.ADDRESS;
                        let salesDate = d.value.SALEDATE;
                        d = new google.maps.LatLng(parseFloat(d.value.lat), parseFloat(d.value.long));
                        d = projection.fromLatLngToDivPixel(d);
                        // debugger
                        return d3.select(this)
                            .style("left", (d.x - padding) + "px")
                            .style("top", (d.y - padding) + "px")
                            .on("click", function () {
                                d3.select(".info").selectAll("p").remove(); 
                                document.getElementById("info-id").style.display = "block"
                                d3.select(".info")
                                .append("p").text(`
                                    ${address}`) 
                                .append("p").text(`
                                    Sales Date: ${salesDate}`)
                                .append("p").text(`
                                    Sales Price: $${salesPrice}`)
                                
                            }
                                );
                    }
                }
            }

            overlay.setMap(map);




        });

    }

    
   

    

    
})

























