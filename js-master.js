import {wineryPage} from './en/js/winery-page.js';
import {mobileNavBottom} from './en/js/mobile-nav-bottom.js';
import {denominazioneSummaryTable} from './en/js/denominazione-summary-table.js';
import {allVintages} from './en/js/all-vintages.js';
import {schedaSingolaImport} from './en/js/scheda-singola-import.js';
import {sanitizeInput} from './en/js/helper-functions.js';
import {sanitizeInputCc} from './en/js/helper-functions.js';
//import {searchLabel} from './en/js/mobile-nav-bottom.js';
import {statusTable} from './en/js/status.js';
import {bestWines} from './en/js/best-wines.js';
import {firstWordBold} from './en/js/vitigni-first-word-bold.js';
import {sentoreCheck} from './en/js/listone-olfattivo.js';
import {esperienzeImport} from './en/js/esperienze-import.js';
import {abbinamentiTree} from './en/js/abbinamenti.js';

// global consts
const years = [2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003]

//wait for page load
window.addEventListener("load", function() {
//global checks after page load
const listCheck = document.querySelector("div[role='list'] .v-list-item__title")  
//window.boot.register('vue', () => {
    // code to execute
//})  
    // custom label for search field
    //searchLabel();
    //hide single wines from search contents
    /**const searchInput = document.querySelector(".nav-header input")
  if (searchInput == null){ } else {
    searchInput.addEventListener("keydown", function(){
      for (const i of document.querySelectorAll(".search-results-items .v-list-item__subtitle")) {
        if (i.textContent.match(/[0-9]{7}/)){
          i.parentElement.parentElement.style.display = "none"
        }
      }
    })
  }
  const searchButton = document.querySelector("header.nav-header-inner button")
  
  if (searchButton == null){ } else {
    searchButton.addEventListener("click", function(){
      const searchInput = document.querySelector(".nav-header input")
      searchInput.addEventListener("keydown", function(){
        
        for (const i of document.querySelectorAll(".search-results-items .caption")) {
          if (i.textContent.match(/[0-9]{7}/)){
            i.parentElement.parentElement.style.display = "none"
          }
        }
      })
    })
  }**/

    // Select the node that will be observed for mutations
    var targetNode = document.querySelector('.v-application--wrap');

    // Options for the observer (which mutations to observe)
    var config = {
        childList: true,
        subtree: true
    };

    // Callback function to execute when mutations are observed
    var callback = function(mutationsList) {
        for (var mutation of mutationsList) {
            for (const i of document.querySelectorAll(".search-results-items .caption")) {
                if (i.textContent.match(/[0-9]{7}/)) {
                    i.parentElement.parentElement.style.display = "none"
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations

    observer.observe(targetNode, config);

    // Later, you can stop observing
    //observer.disconnect();

    //hide caption from single wine pages
    const hideCaption = document.querySelector(".is-page-header .caption")
    if (hideCaption.textContent.match(/[0-9]{7}/)) {
        hideCaption.style.display = "none"
    }
    //mobile navigation bottom
    if (window.innerWidth < 959) {
        let headers = document.querySelectorAll("div.contents > div > h2.toc-header");
        setTimeout(mobileNavBottom, 750)
    }
    // produttore table and sort/filter tools
    if (window.location.href.indexOf("/Wineries/") != -1) {
        const wineryName = document.querySelector(".headline").innerText
        const wineryNameS = sanitizeInput(wineryName)  
        const headlineCaptionArray = document.querySelector(".caption").innerText.split(' | ')
        const countryName = headlineCaptionArray[1]
        const region = headlineCaptionArray[2]
        const regionS = sanitizeInput(region)
        wineryPage(wineryName, wineryNameS, region, regionS, countryName, years, listCheck)
        document.querySelector('.contents').style.opacity = "1"
    } else if (window.location.href.indexOf("/Appellations/") != -1) {
        const headlineTitle = document.querySelector(".headline").innerText
        const headlineCaption = document.querySelector(".caption").innerText.split(' | ')
        const pageCat = headlineCaption[0]
        const country = headlineCaption[1]
        const region = headlineCaption[2]
        const regionS = sanitizeInput(region)
        const regionCc = sanitizeInputCc(region)
        denominazioneSummaryTable(headlineTitle, pageCat, region, regionS, regionCc, country, years, listCheck) 
        document.querySelector('.contents').style.opacity = "1"
    } else if (window.location.href.indexOf("/status") != -1) {
        statusTable()
        document.querySelector('.contents').style.opacity = "1"
    } else if (window.location.href.indexOf("/all-vintages") != -1) {
        //
        //page headline input
        //
        const headlineArray = document.querySelector(".headline").innerText.split(' – ') //retrieve headline splitted at – in arrary 
        // 0 = FullName, 1 = AppellationLevel + AppellationName, 2 = WineryName, 3 = Region + Country, 4 = EvaluationAVG, 5 = Price+"€""
        const regionWithoutCountry = headlineArray[3].split(' (')
        const regionS = sanitizeInput(regionWithoutCountry[0])
        //
        //function exec
        //
        allVintages(regionS, headlineArray,listCheck)
    } else if (window.location.href.indexOf("vintage-") != -1) {
        schedaSingolaImport()
        document.querySelector('.contents').style.opacity = "1"
    } else if (window.location.href.indexOf("best-wines") != -1) {
      bestWines()
    } else {
     document.querySelector('.contents').style.opacity = "1"
    }
})
