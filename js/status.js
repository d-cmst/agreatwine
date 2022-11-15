export function statusTable() {
  function cssTable(){
    //const allPercent = document.querySelectorAll(".status-table td:nth-child(6)")
    //for (const i of allPercent){
    //  if (i.textContent.includes("100")){
    //    const percentParent = i.parentElement
    //    const allTds = percentParent.querySelectorAll("td")
    //    for (const j of allTds){
    //      j.style.backgroundColor = "#4caf50"
    //      j.style.color = "white"
    //    }
    // }
    //}
    const allPercent = document.querySelectorAll(".summary-table td:nth-child(5)");
    for (const i of allPercent) {
      const percentValue = i.innerText
      if (window.innerWidth < 600) {
        i.setAttribute("width",((percentValue*98.5)/100) + "%")
      } else {
        i.setAttribute("width",((percentValue*90)/100) + "%")
      }
    }
  }
  //Checks
  d3.text(`/csv/status-docg.csv`).then( function(data) {
     var csv = d3.csvParse(data), allheaders = d3.csvParseRows(data)[0],
    table = d3.select('.summary-table[tabindex="0"]')
        var titles = Object.keys(data[0]);
        var headers = table.append('thead').append('tr')
                    .selectAll('th')
                    .data(allheaders).enter()
                    .append('th')
                    .text(function (d) {
                        return d;
                      })
    var rows = table.append('tbody').selectAll('tr')
                .data(csv).enter()
                .append('tr');
    rows.selectAll('td')
      .data(function (d) {
        return allheaders.map(function (k) {
          return { 'value': d[k], 'name': k};
        });
      }).enter()
      .append('td')
      .attr('data-th', function (d) {
        return d.name;
      })
      .text(function (d) {
        return d.value;
      });
  }).then(function(){
  //start dataTable
    const dataTable = new simpleDatatables.DataTable(`.summary-table`, {
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
      perPage: 20,
      columns: [
        { select: [2,3,4], type: "number"},
        { select: 3, type: "number", sort: "desc"}
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
     })
}
