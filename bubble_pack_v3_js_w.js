/*
var d3div= "#holder_"+this.divName;
var thisObj=this;

$.getScript('https://my.infocaptor.com/dash/js/d3.v3.min.js', function(data, textStatus){
buildBubbles();

});

*/


function buildBubbles()
{
var width = thisObj.dWidth;
var height = thisObj.dHeight;
var maxSize=Math.min(width,height);

var diameter = maxSize,
format = d3.format(",d"),
color = d3.scale.category20c();

var bubble = d3.layout.pack()
.sort(null)
.size([diameter, diameter])
.padding(1.5);


var svg = d3.select(d3div).append("svg")
.attr("width", diameter)
.attr("height", diameter)
.attr("class", "bubble");

var col_names=glb["_json"]["legends"];
var data=glb["_odata"];


var dobj=[];
for (var di=0;di<data[0].length;di++)
{
dobj.push({"key":di,"value":data[1][di]});
}
display_pack({children: dobj});


function display_pack(root)
{
var tipStr;
var node = svg.selectAll(".node")
.data(bubble.nodes(root)
.filter(function(d) { return !d.children; }))
.enter().append("g")
.attr("class", "node")
.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
.style("fill", function(d) { return color(data[0][d.key]); })
.on("mouseover", function(d,i)
{
d3.select(this).style("fill", "gold"); 
tipStr=getToolTipMessage(i)

showToolTip(tipStr,thisObj.dx+d.x+d3.mouse(this)[0]+50,thisObj.dy+d.y+d3.mouse(this)[1],true);

})
.on("mousemove", function(d,i)
{

tooltipDivID.css({top:thisObj.dy+d.y+d3.mouse(this)[1],left:thisObj.dx+d.x+d3.mouse(this)[0]+50});

})	
.on("mouseout", function()
{
d3.select(this).style("fill", function(d) { return color(data[0][d.key]); });
showToolTip(" ",0,0,false);
})	
;

/*node.append("title")
.text(function(d) { return data[0][d.key] + ": " + format(d.value); });
*/
node.append("circle")
.attr("r", function(d) { return d.r; })
;
//.style("fill", function(d) { return color(data[0][d.key]); });

node.append("text")
.attr("dy", ".3em")
.attr("font-size",thisObj.fontSize)
.attr("font-family",thisObj.fontName)
.style("text-anchor", "middle")
.style("fill","black")
.text(function(d) { return data[0][d.key].substring(0, d.r / 3); });
}
//);


function showToolTip(pMessage,pX,pY,pShow)
{
if (typeof(tooltipDivID)=="undefined")
{
tooltipDivID =$('<div id="messageToolTipDiv" style="position:absolute;display:block;z-index:10000;border:2px solid black;background-color:rgba(0,0,0,0.8);padding:3px 5px 3px 5px;color:white;font-size:12px;font-family:arial;border-radius: 5px;vertical-align: middle;text-align: left;min-width:50px;overflow:auto;"></div>');

$('body').append(tooltipDivID);
}
if (!pShow) { tooltipDivID.hide(); return;}
//MT.tooltipDivID.empty().append(pMessage);
tooltipDivID.html(pMessage);
tooltipDivID.css({top:pY,left:pX});
tooltipDivID.show();
}

function getToolTipMessage(pIndex)
{
var tipStr="";
	for (var li=0;li<col_names.length;li++)
	{
		tipStr+=col_names[li]+" = "+data[li][pIndex]+"<br>";
	}
return tipStr;
}




}


