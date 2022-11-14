function rawCalc(input, rslevel){
    const arrayRSString = []
    if (rslevel == "rs3"){
    for (const j of input) {
       arrayRSString.push(j.RS3)
        } 
    } else if (rslevel == "rs2"){
      for (const j of input) {
       arrayRSString.push(j.RS2)
        }
    } else {
      for (const j of input) {
       arrayRSString.push(j.RS)
        }
    }
    const arrayRS = arrayRSString.map(Number)
    const sumRS = arrayRS.reduce((a,b)=>a + b, 0);
    let globalRS = ((sumRS / arrayRS.length) || 0).toFixed(1);
    //
    const arrayRSSort = arrayRS.slice().sort((a,b)=>a - b);
    let arrayRSLength = arrayRSSort.length;
    let middleIndex = Math.floor(arrayRSLength / 2);
    let oddLength = arrayRSLength % 2 != 0;
    let medianRS;
    if (oddLength) {
        // if array length is odd -> return element at middleIndex
        medianRS = arrayRSSort[middleIndex];
    } else {
        medianRS = (arrayRSSort[middleIndex] + arrayRSSort[middleIndex - 1]) / 2;
    }
    const RSper90Calc = Math.floor(arrayRSLength * .9) - 1;
    const RSper75Calc = Math.floor(arrayRSLength * .75) - 1;
    const RSper50Calc = Math.floor(arrayRSLength * .5) - 1;
    const RSper90 = arrayRSSort[RSper90Calc];
    const RSper75 = arrayRSSort[RSper75Calc];
    const RSper50 = arrayRSSort[RSper50Calc];    
    const percentilesArray = [RSper90, RSper75, RSper50]
    return percentilesArray;
  }
  
  export function percentile3rdCalc(regionS, avRegion, avWineType){
      d3.text(`/csv/${regionS}.csv`).then(function(data) {
          const csv = d3.csvParse(data);
          const awardFilter = function(d) { 
            return d.Region == avRegion && d.WineType == avWineType && d.Entry === "1"
          }
          //
          const awardArray = csv.filter(awardFilter)
          const rslevel = "rs3"
          //
          const percentileArray = rawCalc(awardArray, rslevel)
          if (document.querySelector(".rs3").getAttribute('data-content') > percentileArray[0]){
              d3.select(".rs3").attr("data-per","P90")
          } else if (document.querySelector(".rs3").getAttribute('data-content') >= percentileArray[1]){
              d3.select(".rs3").attr("data-per","P75")
          } else if (document.querySelector(".rs3").getAttribute('data-content') >= percentileArray[2]){
              d3.select(".rs3").attr("data-per","P50")
          } else {
              d3.select(".rs3").attr("data-per","P0")
          }
      })
  }
  
  export function percentile2ndCalc(regionS, avRegion, avWineType, avAppellationName, avSLC){
      d3.text(`/csv/${regionS}.csv`).then(function(data) {
          const csv = d3.csvParse(data);
          const awardFilter = function(d) { 
            return d.Region == avRegion && d.WineType == avWineType && d.AppellationName == avAppellationName && d.SLC == avSLC && d.Entry === "1"
          }
          const awardArray = csv.filter(awardFilter)
          const rslevel = "rs2"
          //
          const percentileArray = rawCalc(awardArray, rslevel)
          if (document.querySelector(".rs2").getAttribute('data-content') > percentileArray[0]){
              d3.select(".rs2").attr("data-per","P90")
          } else if (document.querySelector(".rs2").getAttribute('data-content') >= percentileArray[1]){
              d3.select(".rs2").attr("data-per","P75")
          } else if (document.querySelector(".rs2").getAttribute('data-content') >= percentileArray[2]){
              d3.select(".rs2").attr("data-per","P50")
          } else {
              d3.select(".rs2").attr("data-per","P0")
          }
      })
  }
  
  export function percentileCalc(regionS, avRegion, avWineType, avAppellationName){
      d3.text(`/csv/${regionS}.csv`).then(function(data) {
          const csv = d3.csvParse(data);
          const awardFilter = function(d) { 
            return d.Region == avRegion && d.WineType == avWineType && d.AppellationName == avAppellationName && d.Entry === "1"
          }
          //
          const awardArray = csv.filter(awardFilter)
          const rslevel = "rs"
          //
          const percentileArray = rawCalc(awardArray, rslevel)
          if (document.querySelector(".rs").getAttribute('data-content') > percentileArray[0]){
              d3.select(".rs").attr("data-per","P90")
          } else if (document.querySelector(".rs").getAttribute('data-content') >= percentileArray[1]){
              d3.select(".rs").attr("data-per","P75")
          } else if (document.querySelector(".rs").getAttribute('data-content') >= percentileArray[2]){
              d3.select(".rs").attr("data-per","P50")
          } else {
              d3.select(".rs").attr("data-per","P0")
          }
      })
  }