var width = 800,
    height = 400,
    data = [{
        value: 500,
        pctFull: 0.20,
        name: "20%"
    }, {
        value: 200,
        pctFull: 0.20,
        name: "20%"
    }, {
        value: 300,
        pctFull: 0.20,
        name: "20%"
    }, {
        value: 1250,
        pctFull: 0.75,
        name: "75%"
    }, {
        value: 1600,
        pctFull: 0.25,
        name: "20%"
    }, {
        value: 1250,
        pctFull: 0.65,
        name: "65%"
    }, {
        value: 12500,
        pctFull: 0.95,
        name: "95%"
    }, {
        value: 1100,
        pctFull: 0.05,
        name: "5%"
    }, {
        value: 1050,
        pctFull: 0.35,
        name: "35%"
    }, {
        value: 1700,
        pctFull: 0.40,
        name: "40%"
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

 

    function tick() {
        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    }
    
}

//kCalculation();
rCalculation();
drawGraph();