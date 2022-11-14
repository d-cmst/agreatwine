export function priceChart(regionS, headlineArray){
  //median calculator function
  const myMedian = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };
  /* avg, not used, prefer median
  const sumAvg = mediaAnnoArray.reduce((a, b) => a+b, 0);
  const globalAvg = ((sumAvg / mediaAnnoArray.length) || 0).toFixed(1);
  */
d3.text(`/csv/${regionS}.csv`).then(function(data) {
  const csv = d3.csvParse(data);
  const denominazioneGet = document.querySelector(".appellation").innerText
  const denominazioneClean = denominazioneGet.substring(denominazioneGet.indexOf(' ')+1);

  const tipologiaGet = document.querySelector(".winetype").innerText
  // tutti i vini della stessa denominazione/tipologia
  const filterTuttiDenominazione = function(d) {return d.WineType == tipologiaGet && d.AppellationName == denominazioneClean && d.Entry === "2"}
  const tuttiDenominazione = csv.filter(filterTuttiDenominazione)    
  //Assi
  const margin = {top: 50, right: 30, bottom: 30, left: 60},
  width = 300 - margin.left - margin.right,
  height = 350 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select(".t1:nth-of-type(6)")
  .append("svg")
  .attr("viewBox", "0 0 512 512")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("class","svg-content")
  //.attr("width", width + margin.left + margin.right)
  //.attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

  
  // Get annate
  let tutteLeAnnate = []
  function tutteLeAnnateGet(){
    for (const i of tuttiDenominazione){
      if (i.RatingYear == 2017 || i.RatingYear == 2018 || i.RatingYear == 2019 || i.RatingYear == 2020 || i.RatingYear == 2021 || i.RatingYear == 2022){
        tutteLeAnnate.push(i.RatingYear)
      }
    }
  }
  tutteLeAnnateGet()
  tutteLeAnnate = [...new Set(tutteLeAnnate)].sort()
  const xmin = Math.min(...tutteLeAnnate)
  const xmax = Math.max(...tutteLeAnnate)
  //Add X axis
  const svgCont = document.querySelector(".t1:nth-of-type(6)")
  const xScale = d3.scaleLinear()
    .domain([xmin,xmax])
    .range([ 0, svgCont.offsetWidth ]);
  svg.append("g")
    .attr("class", "ticks")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale)
    .ticks(tutteLeAnnate.length, "d")
    .tickPadding([20])
    )
  .selectAll("text")    
.style("text-anchor", "end")
.attr("dx", "-.5em")
.attr("dy", "-.6em")
.attr("transform", "rotate(-60)");

  // create objects for plots
  //plot avg
  let plotAvg = []
  for (const i of tutteLeAnnate) {
    let mediaAnnoArray = []
    for (const j of tuttiDenominazione){
      if (j.RatingYear == i) {
        const splitPrice = j.Price.split("-")
        const avgPrice = (Number(splitPrice[0]) + Number(splitPrice[1])) / 2
        mediaAnnoArray.push(avgPrice)
      }          
    }
    let pointAvgPlot = {
      x : i,
      y : myMedian(mediaAnnoArray)
    }
    plotAvg.push(pointAvgPlot)
  }
  //plot wine
  let plotWine = []
  for (const i of tuttiDenominazione){
    if (i.FullName == headlineArray[0] && i.WineryName == headlineArray[2]){
    const splitPrice = i.Price.split("-")
    const avgPrice = (Number(splitPrice[0]) + Number(splitPrice[1])) / 2
    let pointWinePlot = {
        x : i.RatingYear,
        y : avgPrice
      }
    plotWine.push(pointWinePlot)
      console.log(pointWinePlot)
    }
  }
  
  // Get prezzi for y axis
  let tuttiIPrezzi = []
  function tuttiIPrezziGet() {
    for (const i of tuttiDenominazione) {
      const splitPrice = i.Price.split("-")
      const avgPrice = (Number(splitPrice[0]) + Number(splitPrice[1])) / 2
      tuttiIPrezzi.push(avgPrice)
    }
  }
  tuttiIPrezziGet()
  tuttiIPrezzi = [...new Set(tuttiIPrezzi)].sort() //cancella duplicati
  let plotAvgMin = Math.min(...plotAvg.map(item => item.y))
  let plotAvgMax = Math.max(...plotAvg.map(item => item.y))
  let plotWineMin = Math.min(...plotWine.map(item => item.y))
  let plotWineMax = Math.max(...plotWine.map(item => item.y))

  let ymin = 0
  let ymax = 0
  if (plotAvgMin <= plotWineMin){
    ymin = plotAvgMin 
  } else {
    ymin = plotWineMin
  }
  if (plotAvgMax >= plotWineMax){
    ymax = plotAvgMax
  } else {
    ymax = plotWineMax
  }
  let ylength = ((ymax + 1) - (ymin - 1)) + 1 
  if (ylength > 13) {
    ylength = 13
  } else {
    ylength = ylength
  }
  const prezzoAnnataLength = ymax - ymin + 1
  //Add Y axis
  const yScale = d3.scaleLinear()
    .domain([ymin-1, ymax+1])
    .range([ height, 0 ]);
  const ytick = svg.append("g")
    .attr("class", "ticks")
    .call(d3.axisLeft(yScale)
    .ticks(ylength, "d")
    .tickFormat(function(d){ return d + "€" })
     )
  //d3.select("g.ticks:nth-child(2) g").remove() // remove first yaxis tick

  // avg line
  const line1 = d3.line()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y))
  .curve(d3.curveLinear)

  // this wine line
  const line2 = d3.line()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y))
  .curve(d3.curveLinear)

  // Add avg plot
  svg.append("path")
    .datum(plotAvg)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line1)

  // Add wine plot
  svg.append("path")
    .datum(plotWine)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", line2)
  
})
}