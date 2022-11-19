function  rawCalcRS(input, rslevel){
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
    const RSper25Calc = Math.floor(arrayRSLength * .25) - 1;
    const RSper90 = arrayRSSort[RSper90Calc];
    const RSper75 = arrayRSSort[RSper75Calc];
    const RSper50 = arrayRSSort[RSper50Calc];    
    const RSper25 = arrayRSSort[RSper25Calc];    
    const percentilesArray = [RSper90, RSper75, RSper50, RSper25]
    return percentilesArray;
  }

  function rawCalcQP(input, qplevel){
    const arrayQPString = []
    if (qplevel == "QP3"){
    for (const j of input) {
       arrayQPString.push(j.QP3)
        } 
    } else if (qplevel == "QP2"){
      for (const j of input) {
       arrayQPString.push(j.QP2)
        }
    } else {
      for (const j of input) {
       arrayQPString.push(j.QP)
        }
    }
    const arrayQP = arrayQPString.map(Number)
    const sumQP = arrayQP.reduce((a,b)=>a + b, 0);
    let globalQP = ((sumQP / arrayQP.length) || 0).toFixed(1);
    //
    const arrayQPSort = arrayQP.slice().sort((a,b)=>a - b);
    let arrayQPLength = arrayQPSort.length;
    let middleIndex = Math.floor(arrayQPLength / 2);
    let oddLength = arrayQPLength % 2 != 0;
    let medianQP;
    if (oddLength) {
        // if array length is odd -> return element at middleIndex
        medianQP = arrayQPSort[middleIndex];
    } else {
        medianQP = (arrayQPSort[middleIndex] + arrayQPSort[middleIndex - 1]) / 2;
    }
    const QPper90Calc = Math.floor(arrayQPLength * .9) - 1;
    const QPper75Calc = Math.floor(arrayQPLength * .75) - 1;
    const QPper50Calc = Math.floor(arrayQPLength * .5) - 1;
    const QPper25Calc = Math.floor(arrayQPLength * .25) - 1;
    const QPper90 = arrayQPSort[QPper90Calc];
    const QPper75 = arrayQPSort[QPper75Calc];
    const QPper50 = arrayQPSort[QPper50Calc];
    const QPper25 = arrayQPSort[QPper25Calc];    
    const percentilesArray = [QPper90, QPper75, QPper50, QPper25]
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
          const qplevel = "qp3"
          //
          let percentileArray =  rawCalcrs3(awardArray, rs3level)
          if (document.querySelector(".rs3").getAttribute('data-content') > percentileArray[0]){
              d3.select(".rs3").attr("data-per","P90").style("width", "100%").attr("class", "rs p100")
          } else if (document.querySelector(".rs3").getAttribute('data-content') >= percentileArray[1]){
              d3.select(".rs3").attr("data-per","P75").style("width", "75%").attr("class", "rs p75")
          } else if (document.querySelector(".rs3").getAttribute('data-content') >= percentileArray[2]){
              d3.select(".rs3").attr("data-per","P50").style("width", "50%").attr("class", "rs p50")
          } else if (document.querySelector(".rs3").getAttribute('data-content') >= percentileArray[3]){
            d3.select(".rs3").attr("data-per","P25").style("width", "25%").attr("class", "rs p25")
         } else {
              d3.select(".rs3").attr("data-per","P0").style("width", "1%").attr("class", "rs p1")
          }
          percentileArray =  rawCalcqp3(awardArray, qp3level)
          if (document.querySelector(".qp3").getAttribute('data-content') > percentileArray[0]){
              d3.select(".qp3").attr("data-per","P90").style("width", "100%").attr("class", "qp p100")
          } else if (document.querySelector(".qp3").getAttribute('data-content') >= percentileArray[1]){
              d3.select(".qp3").attr("data-per","P75").style("width", "75%").attr("class", "qp p75")
          } else if (document.querySelector(".qp3").getAttribute('data-content') >= percentileArray[2]){
              d3.select(".qp3").attr("data-per","P50").style("width", "50%").attr("class", "qp p50")
          } else if (document.querySelector(".qp3").getAttribute('data-content') >= percentileArray[3]){
            d3.select(".qp3").attr("data-per","P25").style("width", "25%").attr("class", "qp p25")
          } else {
              d3.select(".qp3").attr("data-per","P0").style("width", "1%").attr("class", "qp p1")
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
          const qplevel = "qp2"
          //
          let percentileArray =  rawCalcRS(awardArray, rslevel)
          if (document.querySelector(".rs2").getAttribute('data-content') > percentileArray[0]){
              d3.select(".rs2").attr("data-per","P90").style("width", "100%").attr("class", "rs p100")
          } else if (document.querySelector(".rs2").getAttribute('data-content') >= percentileArray[1]){
              d3.select(".rs2").attr("data-per","P75").style("width", "75%").attr("class", "rs p75")
          } else if (document.querySelector(".rs2").getAttribute('data-content') >= percentileArray[2]){
              d3.select(".rs2").attr("data-per","P50").style("width", "50%").attr("class", "rs p50")
          } else if (document.querySelector(".rs2").getAttribute('data-content') >= percentileArray[3]){
            d3.select(".rs2").attr("data-per","P25").style("width", "25%").attr("class", "rs p1")
         } else {
              d3.select(".rs2").attr("data-per","P0").style("width", "1%")
          }
          percentileArray =  rawCalcQP(awardArray, qplevel)
          if (document.querySelector(".qp2").getAttribute('data-content') > percentileArray[0]){
              d3.select(".qp2").attr("data-per","P90").style("width", "100%").attr("class", "qp p100")
          } else if (document.querySelector(".qp2").getAttribute('data-content') >= percentileArray[1]){
              d3.select(".qp2").attr("data-per","P75").style("width", "75%").attr("class", "qp p75")
          } else if (document.querySelector(".qp2").getAttribute('data-content') >= percentileArray[2]){
              d3.select(".qp2").attr("data-per","P50").style("width", "50%").attr("class", "qp p50")
          } else if (document.querySelector(".qp2").getAttribute('data-content') >= percentileArray[3]){
            d3.select(".qp2").attr("data-per","P25").style("width", "25%").attr("class", "qp p1")
          } else {
              d3.select(".qp2").attr("data-per","P0").style("width", "1%")
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
          const qplevel = "qp"
          //
          let percentileArray =  rawCalcRS(awardArray, rslevel)
          if (document.querySelector(".rs").getAttribute('data-content') > percentileArray[0]){
              d3.select(".rs").attr("data-per","P90").style("width", "100%").attr("class", "rs p100")
          } else if (document.querySelector(".rs").getAttribute('data-content') >= percentileArray[1]){
              d3.select(".rs").attr("data-per","P75").style("width", "75%").attr("class", "rs p75")
          } else if (document.querySelector(".rs").getAttribute('data-content') >= percentileArray[2]){
              d3.select(".rs").attr("data-per","P50").style("width", "50%").attr("class", "rs p50")
          } else if (document.querySelector(".rs").getAttribute('data-content') >= percentileArray[3]){
            d3.select(".rs").attr("data-per","P25").style("width", "25%").attr("class", "rs p25")
         } else {
              d3.select(".rs").attr("data-per","P0").style("width", "1%").attr("class", "rs p1")
          }
          percentileArray =  rawCalcQP(awardArray, qplevel)
          if (document.querySelector(".qp").getAttribute('data-content') > percentileArray[0]){
              d3.select(".qp").attr("data-per","P90").style("width", "100%").attr("class", "qp p100")
          } else if (document.querySelector(".qp").getAttribute('data-content') >= percentileArray[1]){
              d3.select(".qp").attr("data-per","P75").style("width", "75%").attr("class", "qp p75")
          } else if (document.querySelector(".qp").getAttribute('data-content') >= percentileArray[2]){
              d3.select(".qp").attr("data-per","P50").style("width", "50%").attr("class", "qp p50")
          } else if (document.querySelector(".qp").getAttribute('data-content') >= percentileArray[3]){
            d3.select(".qp").attr("data-per","P25").style("width", "25%").attr("class", "qp p25")
          } else {
              d3.select(".qp").attr("data-per","P0").style("width", "1%").attr("class", "qp p1")
          }
      })
  }