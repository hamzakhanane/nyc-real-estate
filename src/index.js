import { callbackify } from "util";

window.arr = [];
window.address_arr = [];
window.address_lat_lng = [];


d3.csv("./src/assets/output2.csv").then(function (data) {

    data.forEach((row) => {

        let new_obj = {}
        new_obj["ADDRESS"] = row["ADDRESS"];
        new_obj["SALE DATE"] = row["SALE DATE"];
        new_obj["SALE PRICE"] = row["SALE PRICE"];
        new_obj["lat"] = row["lat"];
        new_obj["long"] = row["long"];

        window.arr.push(new_obj);
    })
    for(let i =0; i<window.arr.length; i++){
        window.address_arr.push(Object.values(window.arr[i])[0])

    }
    window.uniq = [...new Set(window.address_arr)];

    




});



window.initMap = () => {
    
    var map = new google.maps.Map(d3.select("#map").node(), {
        zoom: 12,
        center: { lat: 40.730610, lng: -73.935242 },

    });

    window.map = map;

}




