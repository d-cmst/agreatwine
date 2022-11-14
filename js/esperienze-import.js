export function esperienzeImport(){
  const esperienzaNome = document.querySelector(".esperienzaNome").innerText.replaceAll(' ', '-');
  const esperienzaDove = document.querySelector(".esperienzaDove").innerText;
  const esperienzaAnno = document.querySelector(".esperienzaAnno").innerText;
  const esperienza = esperienzaAnno + "-" + esperienzaNome + "-" + esperienzaDove;
  d3.text(`${esperienza}.csv`).then( function(data) {
    var sortAscending = true;
    var csv = d3.csvParse(data), allheaders = d3.csvParseRows(data)[0],
    table = d3.select(`div.esperienza-table-container`).append('table').attr('class','sort esperienza-table summary-table');
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
    const vinoAll = document.querySelectorAll("table tbody tr");
    vinoAll.forEach(i =>{
      const nome = i.querySelector("td[data-th='Vino']").innerText.replaceAll(' ', '-').replaceAll('é','e')    
      const nomeEl = i.querySelector("td[data-th='Vino']")
      const produttore = i.querySelector("td[data-th='Produttore']").innerText.replaceAll("' ", '-').replaceAll(' ', '-').replaceAll("'", '-');
      const produttoreEl = i.querySelector("td[data-th='Produttore']")
      const regione = i.querySelector("td[data-th='Regione']").innerText.replaceAll("' ", '-').replaceAll(' ', '-')
      const path = "/en/vini/Italia/" + regione + "/" + produttore + "/" + nome + "/scheda-globale"
      const node = document.createElement("a");
      node.href = path
      node.classList.add("summaryExtLink")
      node.setAttribute("target","_blank")
      if (window.innerWidth < 600) {
            nomeEl.append(node)
      } else {
            nomeEl.prepend(node)
      }
      nomeEl.setAttribute("title",nomeEl.innerText)
      produttoreEl.setAttribute("title",produttoreEl.innerText)
    })
    const firstTh = document.querySelector('th:nth-child(1)');
      firstTh.setAttribute("scope","col");
      firstTh.classList.add("table__header");
    const secondTh = document.querySelector('th:nth-child(2)');
      secondTh.setAttribute("scope","col");
      secondTh.classList.add("table__header");
    const thirdTh = document.querySelector('th:nth-child(3)');
      thirdTh.setAttribute("scope","col");
      thirdTh.classList.add("table__header");
    const fourthTh = document.querySelector('th:nth-child(5)');
      fourthTh.setAttribute("scope","col");
      fourthTh.setAttribute("data-type","number");
      fourthTh.classList.add("table__header");
    const fifthTh = document.querySelector('th:nth-child(6)');
      fifthTh.setAttribute("scope","col");
      fifthTh.setAttribute("data-type","number");
      fifthTh.classList.add("table__header");
  })
}