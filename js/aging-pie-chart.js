export function agingPie(allVintagesArray){

  let agingTypeArray = []
  for (const i of allVintagesArray){
     if (i.AgingType.includes("+")){
         const splitted = i.AgingType.split("+")
         agingTypeArray.push(splitted[0])
         agingTypeArray.push(splitted[1])
     } else if (i.AgingType.includes("/")){
         const splitted = i.AgingType.split("/")
         agingTypeArray.push(splitted[0])
         agingTypeArray.push(splitted[1])
     } else {
       agingTypeArray.push(i.AgingType)                    
     }
  }

  var counted = [];
  var result = {};
  agingTypeArray.forEach(type => {// refer to each item in this array with the parameter "answer"
  if(!counted.includes(type)){ // check if answer is not in counted array
      counted.push(type); // add the answer to counted [array]
      result[type] = 1; // add answer to result{object} as a key with a value of 1
  }else if(counted.includes(type)){// here we check if answer is in counted [array]
      result[type] += 1    // now, we just need to increment its value by 1
  }
})

console.log(result); // {true: 2, false: 3, not sure: 2, I don't know: 1}
const numOfOak = result["big oak"];

const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);


//console.log(numOfOak);// 2
//console.log(sumValues(result));// 2

let agingChartData = [];
for (var key in result) {
agingChartData.push({
  name: key,
  value: result[key]
})
};
agingChartData.sort((a,b) => b.value - a.value);

console.log(agingChartData)

var arc = d3.arc().outerRadius(100).innerRadius(0);
var pie = d3.pie().value(function(d) {
return d.value
});
var colors = d3.scaleOrdinal(d3.schemeCategory10)
var svg = d3.select(".appellation-aging svg")
.append("g")
.attr("transform", "translate(100,100)")
svg.selectAll(null)
.data(pie(agingChartData))
.enter()
.append("path")
.attr("d", arc)
.style("fill", function(d, i) {
  return colors(i)
})
//
  var legendG = svg.selectAll("g .legend")
  .data(pie(agingChartData))
  .enter()
  .append("g")
  .attr("transform", function(d,i){
      return "translate(" + (130) + "," + (i * 22 + -80) + ")";
  })
  .attr("class", "legend");  


    legendG.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill",  function(d, i) {
  return colors(i)
});
  console.log()
          legendG.append("text")
        .text(function(d){ 
            const percent = ((d.data.value * 100)/sumValues(result)).toFixed(0)
          return percent + "% " + d.data.name;
        })
        .style("font-size", 16)
        .style("font-family", "inherit")
        .attr("y", 10)
        .attr("x", 11);

}