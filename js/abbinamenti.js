export function abbinamentiTree() {
  const denominazione = document.querySelector(".denominazioneNome").innerText.replaceAll(' ', '-');
  const abbinamentiCheck = document.querySelector(".abbinamenti")
  if (abbinamentiCheck == null) {
      return
  }
  // set the dimensions and margins of the graph
  const width = 1500
  const height = 1500

  // append the svg object to the body of the page
  const svg = d3.select(".abbinamenti").append("svg")//    .attr("width", width)
  //  .attr("height", height)
  .attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMinYMin meet").append("g").attr("transform", "translate(10,0)");
  // bit of margin on the left = 40

  // read json data
  d3.json(`${denominazione}/abbinamenti.json`).then(function(data) {

      // Create the cluster layout:
      const cluster = d3.cluster().size([height, width - 300]);
      // 100 is the margin I will have on the right side

      // Give the data to this cluster layout:
      const root = d3.hierarchy(data, function(d) {
          return d.children;
      });
      //    
      const tempOne = Object.values(root.descendants().slice(1))
      
      cluster(root);

      // Add the links between nodes:
      svg.selectAll('path').data(root.descendants().slice(1)).join('path').attr("d", function(d) {
          return "M" + d.y + "," + d.x + "C" + (d.parent.y + 50) + "," + d.x + " " + (d.parent.y + 50) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
          + " " + d.parent.y + "," + d.parent.x;
      }).style("fill", 'none').attr("stroke", '#ccc')

      // Add a circle for each node.
      svg.selectAll("g").data(root.descendants()).join("g").attr("transform", function(d) {
          return `translate(${d.y},${d.x})`
      }).append("circle").attr("r", 7).style("fill", function(d) {
          switch (d.data.family) {
          case "Pesce":
              return "#89c2d9";
          case "Cereali":
              return "#ffbe0b";
          case "Carne":
              return "#d00000";
          case "Uova":
              return "#f4d35e";
          case "Vegetali":
              return "#38b000";
          default:
              return "#1976d2";
          }
      }).attr("stroke", "transparent").style("stroke-width", 2)
      svg.selectAll("g").append("text").style('font-size', '15px').text(function(d) {
          return d.data.name;
      });
      svg.selectAll("text").attr('text-anchor', "start").attr('transform', "translate(10,5)").style('background-color', 'white')
      svg.select("text").style("font-size", "20px").style("font-weight", "bold").attr('transform', "translate(20,5)")
  })
  const zoomIn = document.querySelector(".zoomIn")
  const zoomOut = document.querySelector(".zoomOut")
  const abbinamentiSvg = document.querySelector(".abbinamenti svg")
  const abbinamentiContainer = document.querySelector(".abbinamenti")
  let zoomLevel = 1.0
  let baseSize = abbinamentiContainer.offsetWidth
  zoomIn.addEventListener('click', function() {
      baseSize = baseSize * (1 + 0.15)
      abbinamentiSvg.setAttribute("width", baseSize)
      abbinamentiSvg.setAttribute("height", baseSize)
      abbinamentiContainer.classList.add("zoomOn")
      zoomOut.classList.add("zoomActive")
  })
  zoomOut.addEventListener('click', function() {
      baseSize = baseSize * (1 - 0.15)
      if (baseSize >= abbinamentiContainer.offsetWidth){
          abbinamentiSvg.setAttribute("width", baseSize)
          abbinamentiSvg.setAttribute("height", baseSize)
      } else {
          abbinamentiSvg.setAttribute("width", "100%")
          abbinamentiContainer.classList.remove("zoomOn")
          zoomOut.classList.remove("zoomActive")
      }
  })
  abbinamentiContainer.style.cursor = 'grab';

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e) {
      abbinamentiContainer.style.cursor = 'grabbing';
      abbinamentiContainer.style.userSelect = 'none';

      pos = {
          left: abbinamentiContainer.scrollLeft,
          top: abbinamentiContainer.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      abbinamentiContainer.scrollTop = pos.top - dy;
      abbinamentiContainer.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
      abbinamentiContainer.style.cursor = 'grab';
      abbinamentiContainer.style.removeProperty('user-select');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
  };

  // Attach the handler
  abbinamentiContainer.addEventListener('mousedown', mouseDownHandler);
}
