let arr = [];
// d3.csv("./src/assets/output.csv", function (data) {
//         new_obj = {}
//         new_obj["ADDRESS"] = data["ADDRESS"];
//         new_obj["SALE DATE"] = data["SALE DATE"];
//         new_obj["SALE PRICE"] = data["SALE PRICE"];
//         new_obj["ZIP CODE"] = data["ZIP CODE"];
//         arr.push(new_obj);
// })

d3.csv("./src/assets/output.csv").then(function (data) {

    data.forEach((row) => {

        new_obj = {}
        new_obj["ADDRESS"] = row["ADDRESS"];
        new_obj["SALE DATE"] = row["SALE DATE"];
        new_obj["SALE PRICE"] = row["SALE PRICE"];
        new_obj["ZIP CODE"] = row["ZIP CODE"];
        arr.push(new_obj);
    })

    


});




