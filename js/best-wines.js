export function bestWines() {

    //Checks
    const table = document.querySelector(".table-container")
    let csvArray = [ "abruzzo", "alto-adige", "emilia", "friuli-venezia-giulia", "lazio", "lombardia", "marche", "piemonte", "puglia", "romagna", "sardegna", "sicilia"]

    for (const i of csvArray){
    d3.text(`/csv/status-${i}.csv`).then( function(data) {
        const bestWinesFilter = function(d) { 
         return d.RANK == 1
        }
    }).then(function(){
    //start dataTable
      const dataTable = new simpleDatatables.DataTable(`.table-container[tabindex="${i}"] .summary-table`, {
        layout: {
          top: "{search}",
          bottom: "{pager}",
        },
        labels: {
          placeholder: "Filter",
          perPage: "{select} results for page",
          noRows: "No results",
          info: "{start} to {end} of {rows} entries",
        },
      searchable: true,
        perPage: 10,
        columns: [
          { select: [2,3,4], type: "number"},
          { select: 2, type: "number", sort: "desc"}
        ],
        nextPrev: false
      })
      dataTable.on("datatable.sort", function(){
        cssTable()
      })
      dataTable.on("datatable.page", function(){
        cssTable()
      })
      dataTable.on("datatable.search", function(){
        cssTable()
      })
    }).then(function(){
        cssTable()
        document.querySelector(".ev-total").innerText = totalGrand
       })
    }
  }