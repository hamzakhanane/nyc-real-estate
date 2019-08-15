
document.addEventListener("DOMContentLoaded", ()=>{
    window.arr = [];

    window.address_lat_lng = [];
    let map;
    let overlay;


    d3.csv("./src/assets/output2.csv").then(function (data) {

        data.forEach((row) => {

            let new_obj = {}
            new_obj["ADDRESS"] = row["ADDRESS"];
            new_obj["SALEDATE"] = row["SALE DATE"];
            new_obj["SALEPRICE"] = row["SALE PRICE"];
            new_obj["lat"] = row["lat"];
            new_obj["long"] = row["long"];

            window.arr.push(new_obj);

        })

        for (let i = 0; i < 100; i++) {
            window.address_lat_lng.push(window.arr[i]);


        }
    });









    // });


    // window.initMap = () => {

    // let bound = new google.maps.LatLngBounds();
    // for (d in window.address_lat_lng ){
    //     long = +window.address_lat_lng[d].long;
    //     lat = +window.address_lat_lng[d].lat;
    //     // bound.extend(new google.maps.LatLngBounds(lat,long));


    // }


        map = new window.google.maps.Map(d3.select("#map").node(), {
            zoom: 12,
            center: { lat: 40.730610, lng: -73.935242 },
        });
        window.map = map;
        
    // }
    //   map.fitBounds(bound);
    // window.initMap();

    d3.json('./properties2.json').then(function (error,data) {
        overlay = new google.maps.OverlayView();
        // debugger
        overlay.onAdd = function () {
            // debugger
            let layer = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "stations");
            // debugger
            overlay.draw = function () {
                const projection = this.getProjection(),
                    padding = 50;

                // debugger
                let marker = layer.selectAll("svg")
                    .data(d3.entries(window.address_lat_lng))
                    .each(transform)
                    .enter()
                    .append("svg")
                    .each(transform)
                    .attr("class", "marker")
                // debugger

                marker.append("circle")
                    .attr("r", 4.5)
                    .attr("cx", padding)
                    .attr("cy", padding);

                marker.append("text")
                    .attr("x", padding + 7)
                    .attr("y", padding)
                    .attr("dy", ".31em")
                
                    .text(function (d) { 
                        
                        return d.key; });
                
                function transform(d) {
                    // debugger
                    d = new google.maps.LatLng(parseFloat(d.value.lat), parseFloat(d.value.long));
                    d = projection.fromLatLngToDivPixel(d);
                    // debugger
                    return d3.select(this)
                        .style("left", (d.x - padding) + "px")
                        .style("top", (d.y - padding) + "px");
                }
            }
            // debugger
        }
        // debugger
        overlay.setMap(map);

        
        

    });

})

























