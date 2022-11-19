export function wineryPage(wineryName, wineryNameS, region, regionS, countryName, years, listCheck) {
  //destroyEmptiness
  function destroyEmptiness(){
    //var startTime2 = performance.now()
    for (const i of years) {
      const all132 = document.querySelector(`.winery-table th[data-th="${i}"]`)
      const all13 = document.querySelectorAll(`.winery-table td[data-th="${i}"]`)
      const all = []
      for (const j of all13) {
          all.push(j.innerText)
      }
      const allEqual = arr => arr.every( v => v === arr[0] )
      if (all.length == 1) { // se la tabella contiene un solo vino
      } else {
          if (allEqual(all) == true){ 
              all132.remove()
              for (const i of all13){
                  i.remove()
              }
          }
      }  
    }
    const loaderCheck = document.querySelector(".loader-container")
      if(loaderCheck) {loaderCheck.remove()} else {}
    //var endTime2 = performance.now()
    //
  }
  //calcSinglePrice
  function calcPrice(i) {
    const splitPrices = i.Price.split("-");
    const avgPrice = (Number(splitPrices[0]) + Number(splitPrices[1])) / 2
    return avgPrice
  }
  //open csv first time
  d3.text(`/csv/${regionS}.csv`).then( function(data) {
    //csv filters and arrays
    const csv = d3.csvParse(data);
    const allVintagesFilter = function(d) {
        return d.WineryName == wineryName && d.Entry === "1"
    }
    const allVintagesArray = csv.filter(allVintagesFilter)
    const singleVintagesFilter = function(d) {
        return d.WineryName == wineryName && d.Entry === "2"
    }
    const singleVintagesArray = csv.filter(singleVintagesFilter)
    //html templates
    const htmlTemplateInfo = `
      <ul class="winery-info">
        <li><b>Name: </b>${wineryName}</li>
        <li><b>Country: </b>${countryName}</li>
        <li><b>Region: </b>${region}</li>
        <li><b>Appellations: </b> ${appellationsList()}</li>
      </ul>
    `
    const htmlTemplateTable =`
        <ul class="winery-stats">
          <li>Wines listed: <span></span></li>
          <li>Average Price: <span></span></li>
          <li>Highest Price: <span></span></li>
          <li class="test">Winery Raw Average Evalution: <span></span></li>
        </ul>
        <div class="table-container" role="region" aria-labelledby="caption" tabindex="0">
          <table class="winery-table">
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>   
        </div>
    `
    //destroy unused template
    d3.select('div.t1W:nth-of-type(6)').remove()
    d3.select('div.t1W:nth-of-type(5)').remove()
    d3.select('div.t1W:nth-of-type(4)').remove()
    d3.select('h2:nth-of-type(5)').remove()  
    d3.select('h2:nth-of-type(4)').remove()
    d3.select('h2:nth-of-type(3)').remove()//must be in reverse order
    if (listCheck == null){} else {
      document.querySelector("div[role='list'] > div:nth-of-type(6)").remove()
      document.querySelector("div[role='list'] > div:nth-of-type(5)").remove()
      document.querySelector("div[role='list'] > div:nth-of-type(4)").remove()
    }
    //insert headers
    document.querySelector('h1').textContent = wineryName
    let headersList = ["Info", "Wines List"]
    for (const h of headersList){
      d3.select(`h2:nth-of-type(${headersList.indexOf(h)+1})`).attr("id",`${h.replaceAll(" ","-").toLowerCase()}`).html(`<a href="#${h.replaceAll(" ","-").toLowerCase()}" class="toc-anchor">¶</a>${h}`)
    }
    if (listCheck == null){} else {
      document.querySelector("div[role='list'] > div:nth-of-type(1) .v-list-item__title").innerText = wineryName
      document.querySelector("div[role='list'] > div:nth-of-type(2) .v-list-item__title").innerText = "Info"
      document.querySelector("div[role='list'] > div:nth-of-type(3) .v-list-item__title").innerText = "Wines List"
    }
    //insert templates
    d3.select('div.t1W:nth-of-type(2)').html(`${htmlTemplateInfo}`)
      function appellationsList(){
        //denominazioni
        let denominazioneTemp = []
        let output = ``
        for (const i of allVintagesArray){
            if (denominazioneTemp.includes(i.AppellationName)){
             //do nothing
            }else{
                denominazioneTemp.push(i.AppellationName) 
                output += `<a href="/Appellations/Italy/${i.Region.replaceAll(" ","-")}/${i.AppellationLevel}-${i.AppellationName.replaceAll(" ","-")}.html">${i.AppellationName}</a>, `
            }
        }
        output = output.slice(0, -2)
        return output
      }
    d3.select('div.t1W:nth-of-type(3)').html(`${htmlTemplateTable}`)
      const wineryTableHead = d3.select('.winery-table thead tr')
      wineryTableHead.append("th").text("Wine")
      wineryTableHead.append("th").text("Raw Avg Evaluation")
      wineryTableHead.append("th").text("Price")
      wineryTableHead.append("th").text("RS")
      wineryTableHead.append("th").text("QP")
      for (const i in years) {
          wineryTableHead.append("th").text(`${years[i]}`).attr("data-th",`${years[i]}`)
      }
      for (const i of allVintagesArray) {
        const wineryTableBodyRow = d3.select(`.winery-table tbody`).append("tr").attr("data-th", `${i.WineryName}-${i.FullName}`)
        wineryTableBodyRow.append("td").attr("data-th", "Wine").attr("title", `${i.FullName}`).html(`<a href="/en/Wines/${countryName}/${regionS}/${wineryNameS}/${i.FullName.replaceAll(' ', '-').replaceAll("'", '-')}/all-vintages.html">${i.FullName}</a>`)
        wineryTableBodyRow.append("td").attr("data-th", "Raw-Avg-Ev").text(`${i.RawAvg}`)
        wineryTableBodyRow.append("td").attr("data-th", "Price").html(`${calcPrice(i)}`)
        wineryTableBodyRow.append("td").attr("data-th", "RS").attr("title", `${i.RS}`).text(`${i.RS}`)
        wineryTableBodyRow.append("td").attr("data-th", "QP").attr("title", `${i.QP}`).text(`${i.QP}`)
        for (const j in years) {
            wineryTableBodyRow.append("td").attr("data-th", `${years[j]}`).attr("title", "sv").text("sv")
        }  
      }
      //90percentile
      for (const i of allVintagesArray){
          const denominazioneTemp = i.AppellationName
          const wineTypeTemp = i.WineType
          const denominazioneFilter = function(d) {
              return d.AppellationName == denominazioneTemp && d.WineType == wineTypeTemp && d.Entry === "1"
          }
          const denominazioneList = csv.filter(denominazioneFilter)
          const arrayRSString = []
          for (const j of denominazioneList) {
              arrayRSString.push(j.RS)
          }
          const arrayRS = arrayRSString.map(Number)
          const arrayRSSort = arrayRS.slice().sort((a, b) => a - b);
          let arrayRSLength = arrayRSSort.length;
          let middleIndex = Math.floor(arrayRSLength / 2);
          let oddLength = arrayRSLength % 2 != 0;
          let medianRS;
          if(oddLength) { // if array length is odd -> return element at middleIndex
              medianRS = arrayRSSort[middleIndex];
          } else {
              medianRS = (arrayRSSort[middleIndex] + arrayRSSort[middleIndex - 1]) / 2;
          }
          const RSper90Calc =  Math.floor(arrayRSLength*.9) - 1;
          const RSper75Calc =  Math.floor(arrayRSLength*.75) - 1;
          const RSper50Calc =  Math.floor(arrayRSLength*.5) - 1;
          const RSper90 = arrayRSSort[RSper90Calc];
          const RSper75 = arrayRSSort[RSper75Calc];
          const RSper50 = arrayRSSort[RSper50Calc];
          //QP calc
          const arrayQPString = []
          for (const j of denominazioneList) {
              arrayQPString.push(j.QP)
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
          
            d3.select(`table tr[data-th="${i.WineryName}-${i.FullName}"] td[data-th='RS']`).style("width",function(d) {
              const RS =  i.RS 
              if (RS > RSper90) {
                    return "100%"    
                } else if (RS <= RSper90 && RS >= RSper75) {
                    return "75%" 
                } else if (RS < RSper75 && RS > RSper50) {
                    return "50%" 
                } else if (RS <= RSper50) {
                    return "1%" 
                }
            }).attr("class", function(d){
                const RS =  i.RS 
                if (RS > RSper90) {
                    return "p100"    
                } else if (RS <= RSper90 && RS >= RSper75) {
                    return "p75" 
                } else if (RS < RSper75 && RS > RSper50) {
                    return "p50" 
                } else if (RS <= RSper50) {
                    return "p1" 
                }
            })
            d3.select(`table tr[data-th="${i.WineryName}-${i.FullName}"] td[data-th='QP']`).style("width",function(d) {
              const QP =  i.QP 
              if (QP > QPper90) {
                    return "100%"    
              } else if (QP <= QPper90 && QP >= QPper75) {
                 return "75%" 
              } else if (QP < QPper75 && QP > QPper50) {
                 return "50%" 
              } else if (QP <= QPper50) {
                 return "1%" 
            }
            }).attr("class", function(d){
                const QP =  i.QP 
                if (QP > QPper90) {
                    return "p100"    
                } else if (QP <= QPper90 && QP >= QPper75) {
                    return "p75" 
                } else if (QP < QPper75 && QP > QPper50) {
                    return "p50" 
                } else if (QP <= QPper50) {
                    return "p1" 
                }
            })
           
      } 
      //statistiche wineryName prima di dataTable
      const arrayWines = document.querySelectorAll(".winery-table td[data-th='Wine']")
      //media delle medie
      const arrayAvgTd = document.querySelectorAll(".winery-table td[data-th='Raw Avg Evaluation']")
      const arrayAvgString = []
      for (const i of arrayAvgTd) {
          arrayAvgString.push(i.innerText)
      }
      const arrayAvg = arrayAvgString.map(Number)
      const sumAvg = arrayAvg.reduce((a, b) => a+b, 0);
      const globalAvg = ((sumAvg / arrayAvg.length) || 0).toFixed(1);
      //prezzo medio    
      const arrayPriceTd = document.querySelectorAll(".winery-table td[data-th='Price']")
      const arrayPriceString = []
      for (const i of arrayPriceTd) {
          arrayPriceString.push(i.innerText)
      }
      const arrayPrice = arrayPriceString.map(Number)
      const sumPrice = arrayPrice.reduce((a, b) => a+b, 0);
      const globalPrice = ((sumPrice / arrayPrice.length) || 0).toFixed(0);
      //insert stats in info  
      document.querySelector(".winery-stats li:nth-child(1) span").innerText = arrayWines.length
      document.querySelector(".winery-stats li:nth-child(2) span").innerText = globalPrice + "€"
      document.querySelector(".winery-stats li:nth-child(3) span").innerText = Math.max(...arrayPrice) + "€"
      document.querySelector(".winery-stats li:nth-child(4) span").innerText = globalAvg
  }).then(function(){
      //safer to open csv a second time for bigger tables
      d3.text(`/csv/${regionS}.csv`).then( function(data) {
        const csv = d3.csvParse(data);
        const singleVintagesFilter = function(d) {
          return d.WineryName == wineryName&& d.Entry === "2"
        }
        const singleVintagesArray = csv.filter(singleVintagesFilter)
        for (const k of singleVintagesArray) {
          d3.select(`.winery-table tr[data-th="${k.WineryName}-${k.FullName}"] td[data-th="${k.Vintage}"]`).attr("title", `${k.EvaluationAvg}`).text(`${k.EvaluationAvg}`)
        }
    }).then(destroyEmptiness).then(function(){
  //start dataTable
    const dataTable = new simpleDatatables.DataTable(`.winery-table`, {
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
      columns: [
        { select: [2,3,4,5], type: "number"},
        { select: 1, type: "number", sort: "desc"}
      ],
      nextPrev: false
    })
  })
})
}
