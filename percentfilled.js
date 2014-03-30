var width = 1280,
    height = 480,
    data = [{
        value: 500,
        //continent: Europe,
        name: "France"
    }, {
        value: 2000,
        //continent: NAmer,
        name: "Canada"
    }, {
        value: 300,
        //continent: NAmer,
        name: "USA"
    }, {
        value: 30000,
        //continent: Europe,
        name: "Finland"
    }, {
        value: 1600,
        //continent: SAmer,
        name: "Colombia"
    }, {
        value: 1250,
        //continent: Asia,
        name: "China"
    }, {
        value: 12500,
        //continent: Asia,
        name: "Japan"
    }, {
        value: 100,
        //continent: Africa,
        name: "Kenya"
    }, {
        value: 1050,
        //continent: Oceania,
        name: "Australia"
    }, {
        value: 1700,
        //continent: Asia,
        name: "India"
    }, ],
    kVals = [],
    rVals = [],
    hVals = [];

// calculate r of each item so that area scales to value
function rCalculation() {
    var i, r;

    for (i = 0; i < data.length; i += 1) {
        rVals.push(Math.sqrt(data[i].value / Math.PI) * 2);
    }
}

function drawGraph() {
    
    //create chart
    var chart = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    //create force layout
    var force = d3.layout.force()
        .nodes(data)
        .size([width, height])
        .linkDistance(10)
        .charge(function (d, i) {
            return rVals[i] * (-10);
        })
        .on("tick", tick)
        .start();

    var node = chart.selectAll(".node")
        .data(force.nodes())
        .attr("class", "node")
        .enter()
        .append("g")
        .call(force.drag);



    // blue circle
    node.append("circle")
        .attr("r", function (d, i) {
            return rVals[i];
        })
        .style("fill", "lavender")
//        .style("fill", "#80dabe")
        .style("stroke", "#1a4876");

    var labels = node.append("svg:text")
        .attr("x", 10)
        .attr("dy", ".31em")
        .text(function(d) {return d.name;});

 

    function tick() {
        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    }
    
}

//kCalculation();
rCalculation();
drawGraph();