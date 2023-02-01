import {sanitizeInputCc} from './helper-functions.js';
export function bestWines() {

    //Checks
    const table = document.querySelector(".table-container")
    let csvArray = [ "abruzzo", "alto-adige", "emilia", "friuli-venezia-giulia", "lazio", "lombardia", "marche", "piemonte", "puglia", "romagna", "sardegna", "sicilia"]
    let bestWinesArray = []
    for (const i of csvArray){
        d3.text(`/csv/${i}.csv`).then( function(data) {
            const csv = d3.csvParse(data);
            const bestWinesFilter = function(d) { 
             return d.RANK == 1
            }
            const bestWinesTest = csv.filter(bestWinesFilter)
            for (const i of bestWinesTest){
                if (typeof i !== 'undefined'){
                    bestWinesArray.push(i)
                } else {}
            }
     })
    }
    function bestWinesTablePopulate(){
        const bestWinesTableHead = d3.select('.best-wines-table thead tr')
        bestWinesTableHead.append("th").text("Region")
        bestWinesTableHead.append("th").text("Appellation")
        bestWinesTableHead.append("th").text("Winery")
        bestWinesTableHead.append("th").text("Wine")

        for (let i of bestWinesArray) {
            const bestWinesTableBodyRow = d3.select(`.best-wines-table tbody`).append("tr")
            bestWinesTableBodyRow.append("td").text(`${i.Region}`)
            bestWinesTableBodyRow.append("td").text(`${i.AppellationName}`)
            bestWinesTableBodyRow.append("td").text(`${i.WineryName}`)
            bestWinesTableBodyRow.append("td").html(`<a href="/en/Wines/Italy/${sanitizeInputCc(i.Region)}/${sanitizeInputCc(i.WineryName)}/${sanitizeInputCc(i.FullName)}">${i.FullName}</a>`)
        }
        const dataTable = new simpleDatatables.DataTable(`.best-wines-table`, {
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
            { select: 0, sort: "asc"}
          ],
          nextPrev: false
        })
    }
    setTimeout(bestWinesTablePopulate, 1500)
  }