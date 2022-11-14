// general dimensions
const vpMargin = {top: 20, right: 10, bottom: 30, left: 10},
vpWidth = 930 - vpMargin.left - vpMargin.right,
vpHeight = 930 - vpMargin.top - vpMargin.bottom,
vpInnerRadius = 5,
vpOuterRadius = Math.min(vpWidth, vpHeight) /1.8;   
xAxisRange = [0, 2 * Math.PI];
yAxisDomain = [0, 300];

familiesOuterRadius = vpOuterRadius - 60
familiesInnerRadius = vpOuterRadius - 40

// Color scales
const myColor = d3.scaleLinear().domain([0,1,2,3,4,5,6,7,8,9,10,11])
.range(["#d3d3d3", "#80b1d3", "#e66e6d", "#c5d551", "#3f5c6f", "#f9c91d", "#a27859", "#4a032a", "#e94235", "#cf9fd6", "#2a2e32","#e7ba77"]);
//Color scale for bars
const colorScale =  function(d){
  if (d.Valore == 0){
    return('transparent')
   } else {
     return(myColor(d.Famiglia))
   }
 };
// color scales for labels
const colorScaleText =  function(d){
 if (d.Valore == 0){
   return('lightgray')
   } else {
     return(myColor(d.Famiglia))
   }
 };   
// font weight
const fontWeight =  function(d){
  if (d.Valore == 0){
    return('normal')
    } else {
      return("900")
    }
  };
 // font size
 const fontSize =  function(d){
  if (d.Valore == 0){
    return('16px')
    } else {
      return("20px")
    }
  };
 //label styles
 labelDistance = 186
 const labelStyle =  function(){
   return d3.selectAll(".labels")
     .style("font-size", fontSize)
     .style("font-weight", fontWeight)
     .attr("fill", colorScaleText)
     .attr("alignment-baseline", "middle")
 }

//create SVG
function createSVG(){
  const vpSvg = d3.selectAll(".vini")
    .append("svg")
    .attr("width", "100%")
    .attr("viewBox","10 10 930 930")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", `translate(${vpWidth/2+vpMargin.left}, ${vpHeight/2+vpMargin.top})`); 
    return vpSvg;
}

const vpCoronaFunction = function(nome, testo, colore, size){
  d3.selectAll(".vini > svg > g").append("g").append("path")
    .attr("d", nome)
    .attr("fill", myColor(colore))
    .attr("id", testo);
    d3.selectAll(".vini > svg > g").append("g").append("text")
    .attr("dy", 17)
    .append("textPath") 
      .attr("fill", "white")
      .style("font-weight", "bold") 
      .style("text-anchor","start")
      .style("font-size", size+"px") 
      .attr("startOffset", "5px")
      .attr("xlink:href", "#"+testo)
      .attr("class", "famiglia")
      .text(testo);
};
