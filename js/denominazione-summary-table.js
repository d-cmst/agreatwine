import { agingPie } from "./aging-pie-chart.js"
import {priceChartAppellation} from "./price-chart.js"

export function denominazioneSummaryTable(headlineTitle, pageCat, region, regionS, regionCc, country, years, listCheck) {
  const typeCounterArray = document.querySelectorAll('.t1A')
  document.querySelector('h1').textContent = headlineTitle
  for (const t of typeCounterArray){
    const appellationName = headlineTitle.substring(headlineTitle.indexOf(' ')+1)
    const typeCounter = t.getAttribute('data-tab')
    const wineType = t.getAttribute('data-type')
    let slc = t.getAttribute('data-slc')
    //add award class
    function awardAdd() {
        d3.text(`/csv/${regionS}.csv`).then(function(data) {
            const csv = d3.csvParse(data);
            const allVintagesFilter = function(d) { 
                if (pageCat == "Third Level Comparison"){
                  return d.Region == region && d.WineType == wineType && d.Entry === "1"
                } else if (pageCat == "Second Level Comparison"){
                  return d.Region == region && d.WineType == wineType && d.SLC == slc && d.Entry === "1"
                } else {
                  return d.Region == region && d.WineType == wineType && d.AppellationName == appellationName && d.Entry === "1"
                }
            }
            const allVintagesArray = csv.filter(allVintagesFilter)
            //above avg
            const arrayRSString = []
            for (const j of allVintagesArray) {
                let RS
                let QP
                if(pageCat == "Second Level Comparison"){RS = j.RS2} else if(pageCat == "Third Level Comparison"){RS = j.RS3} else {RS = j.RS}
                arrayRSString.push(RS)
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
            //above Average
            const allRS = document.querySelectorAll(`div[data-tab="${typeCounter}"] .denominazione-table td[data-th='RS']`)
            for (const i of allRS) {
                if (Number(i.innerText) > RSper90) {
                    const parentRow = i.parentNode
                    parentRow.querySelector("td[data-th='Wine']").classList.add("award90")
                } else if (Number(i.innerText) <= RSper90 && Number(i.innerText) >= RSper75) {
                    const parentRow = i.parentNode
                    parentRow.querySelector("td[data-th='Wine']").classList.add("award75")
                } else if (Number(i.innerText) < RSper75 && Number(i.innerText) > RSper50) {
                    const parentRow = i.parentNode
                    parentRow.querySelector("td[data-th='Wine']").classList.add("award51")
                } else if (Number(i.innerText) <= RSper50) {
                    const parentRow = i.parentNode
                    parentRow.querySelector("td[data-th='Wine']").classList.add("award50")
                }
            }
        })
    }
    //destroyTdTh
    function destroyTh() {
        d3.text(`/csv/${regionS}.csv`).then(function(data) {
            const allTd = document.querySelectorAll(`div[data-tab="${typeCounter}"] .denominazione-table td:nth-of-type(n+7)`)
            for (const i of allTd) {
                i.remove()
            }
            const allTh = document.querySelectorAll(`div[data-tab="${typeCounter}"] .denominazione-table th:nth-of-type(n+7)`)
            for (const i of allTh) {
                i.remove()
            }
        }).then(singleWineReFill)
    }
    //singleWineReFill
    function singleWineReFill() {
        const visibleRows = d3.selectAll(`div[data-tab="${typeCounter}"] .denominazione-table tbody tr`)
        const visibleTh = d3.selectAll(`div[data-tab="${typeCounter}"] .denominazione-table thead tr`)
        for (const i in years) {
            visibleTh.append("th").attr("data-th", `${years[i]}`).attr("data-th", `${years[i]}`).attr('data-sortable', '').append("a").attr("href", "#").attr("class", "dataTable-sorter").text(`${years[i]}`)
        }
        for (const i in years) {
            visibleRows.append("td").attr("data-th", `${years[i]}`).attr("title", "sv").text("sv")
        }
        d3.text(`/csv/${regionS}.csv`).then(function(data) {
            const csv = d3.csvParse(data);
            const singleVintagesFilter = function(d) { 
              if (pageCat == "Third Level Comparison"){
                return d.Region == region && d.WineType == wineType && d.Entry === "2"
              } else if (pageCat == "Second Level Comparison"){
                return d.Region == region && d.WineType == wineType && d.SLC == slc && d.Entry === "2"
              } else {
                return d.Region == region && d.WineType == wineType && d.AppellationName == appellationName && d.Entry === "2"
              }
            }
            const singleVintageArray = csv.filter(singleVintagesFilter)
            for (const k of singleVintageArray) {
                d3.select(`div[data-tab="${typeCounter}"] .denominazione-table tr[data-th="${k.WineryName}-${k.FullName}"] td[data-th="${k.Vintage}"]`).attr("title", `${k.EvaluationAvg}`).text(`${k.EvaluationAvg}`)
            }
        }).then(destroyEmptiness)//awardAdd
    }
    //singleWineFill
    function singleWineFill() {
        const visibleRows = d3.selectAll(`div[data-tab="${typeCounter}"] table tbody tr`)
        for (const i in years) {
            visibleRows.append("td").attr("data-th", `${years[i]}`).attr("title", "sv").text("sv")
        }
        d3.text(`/csv/${regionS}.csv`).then(function(data) {
            const csv = d3.csvParse(data);
            const singleVintagesFilter = function(d) { 
              if (pageCat == "Third Level Comparison"){
                return d.Region == region && d.WineType == wineType && d.Entry === "2"
              } else if (pageCat == "Second Level Comparison"){
                return d.Region == region && d.WineType == wineType && d.SLC == slc && d.Entry === "2"
              } else {
                return d.Region == region && d.WineType == wineType && d.AppellationName == appellationName && d.Entry === "2"
              }
            }
            const singleVintagesArray = csv.filter(singleVintagesFilter)
            for (const j of singleVintagesArray) {
                d3.select(`div[data-tab="${typeCounter}"] table tr[data-th="${j.WineryName}-${j.FullName}"] td[data-th="${j.Vintage}"]`).attr("title", `${j.EvaluationAvg}`).text(`${j.EvaluationAvg}`)
            }
        }).then(destroyEmptiness)//then(awardAdd)
    }
    //datatable
    function myDataTable() {
        const dataTable = new simpleDatatables.DataTable(`div[data-tab="${typeCounter}"] .denominazione-table`,{
            layout: {
                top: "{search}",
                bottom: "{pager}",
            },
            labels: {
                placeholder: "Filter",
                perPage: "{select} results per page",
                noRows: "No results",
                info: "{start} to {end} of {rows} entries",
            },
            searchable: true,
            columns: [{
                select: [3, 5, 6, 7],
                type: "number"
            }, {
                select: 4,
                type: "number",
                sort: "desc"
            }],
            nextPrev: false
        })
        dataTable.on("datatable.init", function() {
            singleWineFill()
        })
        dataTable.on("datatable.sort", function() {
            destroyTh()
        })
        dataTable.on("datatable.page", function() {
            destroyTh()
        })
        dataTable.on("datatable.search", function() {
            destroyTh()
        })
    }
    //destroyEmptiness
    function destroyEmptiness() {
        if (window.innerWidth >= 600) {
            for (const i of years) {
                const all132 = document.querySelector(`div[data-tab="${typeCounter}"] .denominazione-table th[data-th="${i}"]`)
                const all13 = document.querySelectorAll(`div[data-tab="${typeCounter}"] .denominazione-table td[data-th="${i}"]`)
                const all = []
                for (const j of all13) {
                    all.push(j.innerText)
                }
                const allEqual = arr=>arr.every(v=>v === "sv")

                if (allEqual(all) == true) {
                    if (all132) {
                        all132.remove()
                    }
                    for (const i of all13) {
                        i.remove()
                    }
                }
            }
        } else {
            
        }
    }

  d3.text(`/csv/${regionS}.csv`).then(function(data) {    
      //csv filters and arrays
      const csv = d3.csvParse(data);
      const allVintagesFilter = function(d) { 
        if (pageCat == "Third Level Comparison"){
          return d.Region == region && d.WineType == wineType && d.Entry === "1"
        } else if (pageCat == "Second Level Comparison"){
          return d.Region == region && d.WineType == wineType && d.SLC == slc && d.Entry === "1"
        } else {
          return d.Region == region && d.WineType == wineType && d.AppellationName == appellationName && d.Entry === "1"
        }
      }
      const allVintagesArray = csv.filter(allVintagesFilter)
      /************/
      /*functions**/
      /************/
      //calc Price
      function calcPrice(i) {
        const splitPrices = i.Price.split("-");
        const avgPrice = (Number(splitPrices[0]) + Number(splitPrices[1])) / 2
        return avgPrice
      }
      //appellations list
      function appellationsList(){
        //denominazioni
        let appellationsTemp = []
        let output = ``
        for (const i of allVintagesArray){
            if (appellationsTemp.includes(i.AppellationName)){
             //do nothing
            }else{
                appellationsTemp.push(i.AppellationName) 
                output += `<a href="/Appellations/Italy/${i.Region.replaceAll(" ","-")}/${i.AppellationLevel}-${i.AppellationName.replaceAll(" ","-")}.html">${i.AppellationName}</a>, `
            }
        }
        if (pageCat == "Third Level Comparison" || pageCat == "Second Level Comparison"){
          output = `<li><b>Aggregated appellations: </b>${output.slice(0, -2)}</li>`
        } else {
          output = ''
        }
        return output
      }
      //table header pop
      function tableHead(){
        let tableHead = d3.select(`div[data-tab="${typeCounter}"] .denominazione-table thead tr`)
        tableHead.append("th").text("Winery")
        tableHead.append("th").text("Wine")
        tableHead.append("th").text("Raw-Avg-Ev")
        tableHead.append("th").text("Price")
        tableHead.append("th").text("RS")
        tableHead.append("th").text("QP")
        for (const y in years) {
          tableHead.append("th").text(`${years[y]}`).attr("data-th", `${years[y]}`)
        }
      }
      //table row pop
      function tableRow(){
          //RS calc
          const arrayRSString = []
            for (const j of allVintagesArray) {
                let RS
                let QP
                if(pageCat == "Second Level Comparison"){RS = j.RS2} else if(pageCat == "Third Level Comparison"){RS = j.RS3} else {RS = j.RS}
                arrayRSString.push(RS)
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
          //
          //QP calc
          const arrayQPString = []
            for (const j of allVintagesArray) {
                let RS
                let QP
                if(pageCat == "Second Level Comparison"){QP = j.QP2} else if(pageCat == "Third Level Comparison"){QP = j.QP3} else {QP = j.QP}
                arrayQPString.push(QP)
            }
            const arrayQP = arrayQPString.map(Number)
            const sumQP = arrayQP.reduce((a,b)=>a + b, 0);
            let globalQP = ((sumQP / arrayQP.length) || 0).toFixed(1);
            //
            const arrayQPSort = arrayQP.slice().sort((a,b)=>a - b);
            let arrayQPLength = arrayQPSort.length;
            let middleIndexQP = Math.floor(arrayQPLength / 2);
            let oddLengthQP = arrayQPLength % 2 != 0;
            let medianQP;
            if (oddLengthQP) {
                // if array length is odd -> return element at middleIndex
                medianQP = arrayQPSort[middleIndexQP];
            } else {
                medianQP = (arrayQPSort[middleIndexQP] + arrayQPSort[middleIndexQP - 1]) / 2;
            }
            const QPper90Calc = Math.floor(arrayQPLength * .9) - 1;
            const QPper75Calc = Math.floor(arrayQPLength * .75) - 1;
            const QPper50Calc = Math.floor(arrayQPLength * .5) - 1;
            const QPper90 = arrayQPSort[QPper90Calc];
            const QPper75 = arrayQPSort[QPper75Calc];
            const QPper50 = arrayQPSort[QPper50Calc];
            //
          for (const i of allVintagesArray) {
            let RS
            let QP
            if(pageCat == "Second Level Comparison"){RS = i.RS2; QP = i.QP2} else if(pageCat == "Third Level Comparison"){RS = i.RS3; QP = i.QP3} else {RS = i.RS; QP = i.QP}
          const produttoreBodyRow = d3.select(`div[data-tab="${typeCounter}"] .denominazione-table tbody`).append("tr").attr("data-th", `${i.WineryName}-${i.FullName}`)
          produttoreBodyRow.append("td").attr("data-th", "Winery").attr("title", `${i.WineryName}`).html(`<a href="/en/Wineries/${country}/${regionCc}/${i.WineryName.replaceAll(' ', '-').replaceAll("'", '-')}.html">${i.WineryName}</a>`)
          produttoreBodyRow.append("td").attr("data-th", "Wine").attr("title", `${i.FullName}`).html(`<a href="/en/Wines/${country}/${regionCc}/${i.WineryName.replaceAll("' ", '-').replaceAll(' ', '-').replaceAll("'", '-').replaceAll("è", 'e').replaceAll("à", 'a').replaceAll("é", 'e').replaceAll("ù", 'u')}/${i.FullName.replaceAll(' ', '-').replaceAll("'", '-').replaceAll("à", 'a').replaceAll("é", 'e')}/all-vintages.html">${i.FullName}</a>`)
          produttoreBodyRow.append("td").attr("data-th", "Raw-Avg-Ev").text(`${i.RawAvg}`)
          produttoreBodyRow.append("td").attr("data-th", "Price").html(`${calcPrice(i)}`)
          produttoreBodyRow.append("td").attr("data-th", "RS").attr("title", `${RS}`).style("width", function(d) {
              if (RS > RSper90) {
                    return ((100 * 90) / 100) + "%"    
                } else if (RS <= RSper90 && RS >= RSper75) {
                    return ((75 * 90) / 100) + "%"
                } else if (RS < RSper75 && RS > RSper50) {
                    return ((50 * 90) / 100) + "%"
                } else if (RS <= RSper50) {
                    return ((1 * 90) / 100) + "%"
                }
          }).attr("class", function(d) {
              if (RS > RSper90) {
                    return "p100"    
                } else if (RS <= RSper90 && RS >= RSper75) {
                   return "p75" 
                } else if (RS < RSper75 && RS > RSper50) {
                    return "p50" 
                } else if (RS <= RSper50) {
                    return "p1" 
                }
          }).text(`${RS}`)
          produttoreBodyRow.append("td").attr("data-th", "QP").attr("title", `${QP}`).style("width", function(d) {
              if (QP > QPper90) {
                    return ((100 * 90) / 100) + "%"
                } else if (QP <= QPper90 && QP >= QPper75) {
                    return ((75 * 90) / 100) + "%"
                } else if (QP < QPper75 && QP > QPper50) {
                    return ((50 * 90) / 100) + "%"
                } else if (QP <= QPper50) {
                    return ((1 * 90) / 100) + "%"
                }
          }).attr("class", function(d) {
              if (QP > QPper90) {
                    return "p100"    
                } else if (QP <= QPper90 && QP >= QPper75) {
                   return "p75" 
                } else if (QP < QPper75 && QP > QPper50) {
                    return "p50" 
                } else if (QP <= QPper50) {
                    return "p1" 
                }
           }).text(`${QP}`)
        }
      }
      //templates
      const htmlTemplate = `
        <div class="appellation-basic-data">
          <div><b>Name: </b></div><div class="denominazioneNome">${headlineTitle}</div>
          <div><b>Region: </b></div><div class="denominazioneRegione">${region}</div>
          ${appellationsList()}
        </div>
        <div data-tab="${typeCounter}">
            <div class="appellation-stats">
                <div>Wines listed: </div><div></div>
                <div>Median Price: </div><div></div>
                <div>Highest Price: </div><div></div>
                <div>Raw Avg: </div><div></div>
            </div>
            <div class="appellation-charts">
              <div class="appellation-aging">
                <div>Aging</div>
                <svg viewBox="0 0 400 400" preserveAspectRatio="xMinYMin meet"></svg>
              </div>
              <div class="appellation-pricing">
                <div>Pricing</div>
              </div>
            </div>
          <div><b>Wines</b></div>
          <div class="table-container" role="region" aria-labelledby="caption" tabindex="0">
            <table class="denominazione-table">
              <thead>
                <tr>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      `
      
      //insert templates
      d3.select(`h2:nth-of-type(${typeCounter})`).attr("id",`${wineType.replaceAll(" ","-").toLowerCase()}`).html(`<a href="#${wineType.replaceAll(" ","-").toLowerCase()}" class="toc-anchor">¶</a>${wineType}`)
      d3.select(`div[data-tab="${typeCounter}"]`).html(`${htmlTemplate}`)
      //copy headers in TOC
      
      if (listCheck == null){} else {
        document.querySelector("div[role='list'] > div:nth-of-type(1) .v-list-item__title").innerText = headlineTitle
        document.querySelector(`div[role='list'] > div:nth-of-type(${Number(typeCounter)+1}) .v-list-item__title`).innerText = wineType
      }
      tableHead() //populates table header
      tableRow()
      //statistiche denominazionee prima di dataTable
        const arrayWines = document.querySelectorAll(`div[data-tab="${typeCounter}"] .denominazione-table td[data-th='Wine']`)
        //media delle medie
        const arrayAvgTd = document.querySelectorAll(`div[data-tab="${typeCounter}"] .denominazione-table td[data-th='Raw-Avg-Ev']`)
        const arrayAvgString = []
        for (const i of arrayAvgTd) {
            arrayAvgString.push(i.innerText)
        }
        const arrayAvg = arrayAvgString.map(Number)
        const sumAvg = arrayAvg.reduce((a,b)=>a + b, 0);
        const globalAvg = ((sumAvg / arrayAvg.length) || 0).toFixed(1);
        //prezzo medio    
        const arrayPriceTd = document.querySelectorAll(`div[data-tab="${typeCounter}"] .denominazione-table td[data-th='Price']`)
        const arrayPriceString = []
        for (const i of arrayPriceTd) {
            arrayPriceString.push(i.innerText)
        }
        const arrayPrice = arrayPriceString.map(Number)
        //median calculator function
        const myMedian = arr => {
            const mid = Math.floor(arr.length / 2),
                nums = [...arr].sort((a, b) => a - b);
            return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
        };
        const sumPrice = arrayPrice.reduce((a,b)=>a + b, 0);
        //prefer median over avg
        //const globalPrice = ((sumPrice / arrayPrice.length) || 0).toFixed(0);
        //
        document.querySelector(`div[data-tab="${typeCounter}"] .appellation-stats div:nth-child(2)`).innerText = arrayWines.length
        document.querySelector(`div[data-tab="${typeCounter}"] .appellation-stats div:nth-child(4)`).innerText = myMedian(arrayPrice) + "€"
        document.querySelector(`div[data-tab="${typeCounter}"] .appellation-stats div:nth-child(6)`).innerText = Math.max(...arrayPrice) + "€"
        document.querySelector(`div[data-tab="${typeCounter}"] .appellation-stats div:nth-child(8)`).innerText = globalAvg    
        //
        agingPie(allVintagesArray, typeCounter)
        priceChartAppellation(regionS, appellationName, wineType, typeCounter)

  }).then(function() {
        myDataTable()
    })
}
}
