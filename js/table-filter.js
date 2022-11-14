export function tableSort(){
  const tableAll = document.querySelectorAll('.sort');
  tableAll.forEach(el =>{
    const headers = el.querySelectorAll('th');
    const tableBody = el.querySelector('tbody');
    const rows = tableBody.querySelectorAll('tr'); 
  
    // Track sort directions
    const directions = Array.from(headers).map(function (header) {
      return '';
    });
  
    // Transform the content of given cell in given column
    const transform = function (index, content) {
      // Get the data type of column
      const type = headers[index].getAttribute('data-type');
      switch (type) {
        case 'number':
          return parseFloat(content);
        case 'string':
        default:
          return content;
      }
    };
  
    const sortColumn = function (index) {
      // Get the current direction
      const direction = directions[index] || 'asc';
  
      // A factor based on the direction
      const multiplier = direction === 'desc' ? 1 : -1;
  
      const newRows = Array.from(rows);
  
      newRows.sort(function (rowA, rowB) {
        const cellA = rowA.querySelectorAll('td')[index].innerHTML;
        const cellB = rowB.querySelectorAll('td')[index].innerHTML;
  
        const a = transform(index, cellA);
        const b = transform(index, cellB);
  
        switch (true) {
          case a > b:
            return 1 * multiplier;
          case a < b:
            return -1 * multiplier;
          case a === b:
            return 0;
        }
      });
  
      // Remove old rows
      [].forEach.call(rows, function (row) {
        tableBody.removeChild(row);
      });
  
      // Reverse the direction
      directions[index] = direction === 'asc' ? 'desc' : 'asc';
  
      // Append new row
      newRows.forEach(function (newRow) {
        tableBody.appendChild(newRow);
      });
    };
  
    [].forEach.call(headers, function (header, index) {
      header.addEventListener('click', function () {
        sortColumn(index);
      });
    });
  })
}

export function tableFilter() {
  var input, filter, table, tr, td, cell, i, j;
  input = document.getElementById("filterInput");
  filter = input.value.toUpperCase();
  table = document.querySelector(".sort");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";
  
    //td = tr[i].getElementsByTagName("td"); // OLD VERSION
    td = tr[i].querySelectorAll('td:not([data-th="Voto Medio"])')
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].querySelectorAll('td:not([data-th="Voto Medio"])')[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        } 
      }
    }
  }
}

export function denominazioneTableFilter(){
  const inputAll = document.querySelectorAll(".filterInput")
  inputAll.forEach(el =>{
    el.addEventListener('keyup', function(){
      const filter = el.value.toUpperCase();
      const table = el.nextElementSibling;
      const tr = table.getElementsByTagName("tr");
      for (var i = 1; i < tr.length; i++) {
        // Hide the row initially.
        tr[i].style.display = "none";
      
        const td = tr[i].querySelectorAll('td:not([data-th="Voto Medio"])');
        for (var j = 0; j < td.length; j++) {
          const cell = tr[i].querySelectorAll('td:not([data-th="Voto Medio"])')[j];
          if (cell) {
            if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
              break;
            } 
          }
        }
      }        
    })
  })
}