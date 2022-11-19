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
const RSper25 = arrayRSSort[RSper25Calc];
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