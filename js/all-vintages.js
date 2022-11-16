import {priceChart} from './price-chart.js';
import {sanitizeInputCc} from './helper-functions.js';
import {percentileCalc} from './percentile-calc.js';
import {percentile2ndCalc} from './percentile-calc.js';
import {percentile3rdCalc} from './percentile-calc.js';
export function allVintages(regionS, headlineArray, listCheck) {
  d3.text(`/csv/${regionS}.csv`).then(function(data) {
      const csv = d3.csvParse(data);
      const allVintagesData = function(d) {return d.FullName == headlineArray[0] && d.WineryName == headlineArray[2] && d.Entry === "1"}
      const singleVintageData = function(d) {return d.FullName == headlineArray[0] && d.WineryName == headlineArray[2] && d.Entry === "2"}
      //allVintagesData
      const avFullName = csv.filter(allVintagesData)[0].FullName;
      const avRegion = csv.filter(allVintagesData)[0].Region;
      const avCountry = csv.filter(allVintagesData)[0].Country;
      const avWineType = csv.filter(allVintagesData)[0].WineType;
      const avAppellationName = csv.filter(allVintagesData)[0].AppellationName;
      const avQterms = csv.filter(allVintagesData)[0].Qterms;
      const avAppellationLevel = csv.filter(allVintagesData)[0].AppellationLevel;
      const avWineryName = csv.filter(allVintagesData)[0].WineryName;
      const avGrapes = csv.filter(allVintagesData)[0].Grapes;
      const avGrapesArray = avGrapes.split(' – ')    
      let avGrapesArrayLength = avGrapesArray.length; //must be let for the condition to work
      const avAgingMonths = csv.filter(allVintagesData)[0].AgingMonths;
      const avAgingType = csv.filter(allVintagesData)[0].AgingType;
      const avAlcohol = csv.filter(allVintagesData)[0].Alcohol;
      const avPrice = csv.filter(allVintagesData)[0].Price;
      const avPairing = csv.filter(allVintagesData)[0].Pairing;
      const avPairingArray = avPairing.split(' – ')
      const avNotes = csv.filter(allVintagesData)[0].Notes;
      const avSLC = csv.filter(allVintagesData)[0].SLC;
      const avTLC = csv.filter(allVintagesData)[0].TLC;
        console.log(avTLC)
      //AllVintagesData ScoreAIS
      const avRS = csv.filter(allVintagesData)[0].RS;
      const avQP = csv.filter(allVintagesData)[0].QP;
      const avRS2 = csv.filter(allVintagesData)[0].RS2;
      const avQP2 = csv.filter(allVintagesData)[0].QP2;
      const avRS3 = csv.filter(allVintagesData)[0].RS3;
      const avQP3 = csv.filter(allVintagesData)[0].QP3;
      const avScoreAIS = csv.filter(allVintagesData)[0].ScoreAIS;
      const avScoreGR = csv.filter(allVintagesData)[0].ScoreGR;
      const avScoreAvg = csv.filter(allVintagesData)[0].ScoreAvg;
      //spumantizzazione
      const avVintageNV = csv.filter(allVintagesData)[0].VintageNV;
      const avMethod = csv.filter(allVintagesData)[0].Method;
      const avSweetness = csv.filter(allVintagesData)[0].Sweetness;
      //singola annata
      const singleVintagesArray = csv.filter(singleVintageData)
      const svEvaluationAvg = csv.filter(singleVintageData)[0].EvaluationAvg;
      const svScoreAvg = csv.filter(singleVintageData)[0].ScoreAvg;

      //HTML templates
      const htmlTemplateBasicData =`
          <div class="basic-data">
          <div>Wine Name: </div><div>${avFullName}</div>
          <div>Wine Type: </div><div class="winetype">${avWineType}</div>
          </div>
          <div class="comparison">
          <div>Appellation: </div><div><a class="appellation" href="/en/Appellations/Italy/${sanitizeInputCc(avRegion)}/${avAppellationLevel}-${sanitizeInputCc(avAppellationName)}.html">${avAppellationLevel} ${avAppellationName}</a></div>
          ${avSLC == "" ? "" : 
            `<div>2nd Level: </div><div><a class="second-level" href="/en/Appellations/Italy/${sanitizeInputCc(avRegion)}/${sanitizeInputCc(avSLC)}.html">${avSLC}</a></div>`
          }
          ${avTLC == "" || avTLC == undefined ? "" : 
            `<div>3nd Level: </div><div><a class="third-level" href="/en/Appellations/Italy/${sanitizeInputCc(avRegion)}/${sanitizeInputCc(avTLC)}.html">${avTLC}</a></div>`
          }
          </div>
          <div class="basic-data">
          <div class="winery">Winery: </div><div><a href="/en/Wineries/Italy/${sanitizeInputCc(avRegion)}/${sanitizeInputCc(avWineryName)}.html">${avWineryName}</a></div>
          <div>Grapes: </div><div>${avGrapes}</div>
          ${avAgingMonths == "-" && avAgingType == "-" 
            ? 
            "<div>Aging: </div><div>-</div>"
            : 
            ((avAgingMonths == "-") ? (`<div>Aging: </div><div>${avAgingType}</div>`) : (`<div>Aging: </div><div>${avAgingMonths} months in ${avAgingType}</div>`))
          }
          <div>Alcohol: </div><div>${avAlcohol}°</div>
          <div>Price: </div><div>${avPrice}€</div>
          </div>
      `
      const rs2Template = `
          <div class="rs2-label">2nd Level Relative Score</div><div class="rs2" title="${avRS2}" data-content="${avRS2}" style="width:${avRS2}%"></div>
          <div class="qp2-label">2nd Level Quality/Price </div><div class="qp2" title="${avRS2}" data-content="${avQP2}" style="width:${avQP2}%"></div>
      `
      const rs3Template = `
          <div class="rs3-label">3rd Level Relative Score</div><div class="rs3" title="${avRS3}" data-content="${avRS3}" style="width:${avRS3}%"></div>
          <div class="qp3-label">3nd Level Quality/Price</div><div class="qp3" title="${avRS3}" data-content="${avQP3}" style="width:${avQP3}%"></div>
      `
      const htmlTemplateScores =`
        <div class="rs-summary">
          <div class="rs-label">Appellation Relative Score</div>
          <div class="rs" title="${avRS}" data-content="${avRS}" style="width:${avRS}%"></div>
          <div class="qp-label">Appellation Quality/Price</div>
          <div class="qp" title="${avRS}" data-content="${avQP}" style="width:${avQP}%"></div>
          ${avRS2 == "" ? "" : `${rs2Template}`}
          ${avRS3 == "" ? "" : `${rs3Template}`}
        </div>
      `
      //destroy unused
      d3.select('div.t1:nth-of-type(7)').remove()
      d3.select('div.t1:nth-of-type(6)').remove()
      d3.select('h2:nth-of-type(7)').remove()  
      d3.select('h2:nth-of-type(6)').remove()  //must be in reverse order
      if (listCheck == null){} else {
        document.querySelector("div[role='list'] > div:nth-of-type(8)").remove()
        document.querySelector("div[role='list'] > div:nth-of-type(7)").remove()
      }
      //insert html templates
      d3.select('div.t1:nth-of-type(2)').html(`${htmlTemplateBasicData}`)
      d3.select('div.t1:nth-of-type(3)').html(`${htmlTemplateScores}`)
        for (const i of avPairingArray) {
          if (i == ""){} else{
            d3.select('div.t1:nth-of-type(4)').append("div").text(i)
          }
        }
      //single vintages
        for (const i of singleVintagesArray.reverse()) {
          const singleVintagesTableBodyRow = d3.select('div.t1:nth-of-type(5)')
          singleVintagesTableBodyRow.append("div").html(`${i.Vintage}`) 
          singleVintagesTableBodyRow.append("div").html(`${i.EvaluationAvg}<span class="star"></span> -- ${i.ScoreAvg}/100`)
        }
        d3.select("div.t1:nth-of-type(5)").append("div").text("Global Avg")
        d3.select("div.t1:nth-of-type(5)").append("div").attr("class","globalavg").text(avScoreAvg)
    
      //insert headers text
      document.querySelector('h1').textContent = avFullName
      let headersList = ["Basic Data", "Scores", "Pairings", "Vintages", "Price Chart"]
      for (const h of headersList){
        d3.select(`h2:nth-of-type(${headersList.indexOf(h)+1})`).attr("id",`${h.replaceAll(" ","-").toLowerCase()}`).html(`<a href="#${h.replaceAll(" ","-").toLowerCase()}" class="toc-anchor">¶</a>${h}`)
      }
      //copy headers in TOC
      if (listCheck == null){} else {
        document.querySelector("div[role='list'] > div:nth-of-type(1) .v-list-item__title").innerText = headlineArray[0]
        document.querySelector("div[role='list'] > div:nth-of-type(2) .v-list-item__title").innerText = "Basic Data"
        document.querySelector("div[role='list'] > div:nth-of-type(3) .v-list-item__title").innerText = "Scores"
        document.querySelector("div[role='list'] > div:nth-of-type(4) .v-list-item__title").innerText = "Pairings"
        document.querySelector("div[role='list'] > div:nth-of-type(5) .v-list-item__title").innerText = "Vintages"
        document.querySelector("div[role='list'] > div:nth-of-type(6) .v-list-item__title").innerText = "Price Chart"
      }
      //percentiles
      if(document.querySelector(".rs")){
            percentileCalc(regionS, avRegion, avWineType, avAppellationName)
      } 
      if (document.querySelector(".rs2")){
            percentile2ndCalc(regionS, avRegion, avWineType, avAppellationName, avSLC)
      } 
      if (document.querySelector(".rs3")){
            percentile3rdCalc(regionS, avRegion, avWineType)
      }  
      
  }).then(function() {
      document.querySelector('.contents').style.opacity = "1"
      priceChart(regionS, headlineArray)
  })
}