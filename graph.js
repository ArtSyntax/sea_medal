async function plot(){
  // Get the data
  const dataPath = "https://gist.githubusercontent.com/rapee/fd513e1f231130c75a555bfbeb7e803b/raw/e71bcc5dc33cf2a606752ce9d3dbf4700bce3610/medals.csv"
  const data = await d3.csv(dataPath)

  // set the dimensions and margins of the graph
  let canvasSize = 600
  let margin = {top: 20, right: 20, bottom: 40, left: 50}
  let width = canvasSize*2 - margin.left - margin.right
  let height = canvasSize - margin.top - margin.bottom

  // set the ranges
  let x = d3.scaleLinear().range([0, width - 100])
  let y = d3.scaleLinear().range([height, 0])

  // append the svg obgect to the body of the page
  let svg = d3.select("body").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // scale the range of the data
  x.domain(d3.extent(data, d => d.year ))
  y.domain([0, 200])

  // add the X Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
  svg.append("text")
    .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Years")

  // add the Y Axis
  svg.append("g")
    .call(d3.axisLeft(y))
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Medals")

  // define the line
  let lineValue = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.gold))

  // add the line
  addLine(svg, x, y, lineValue, "#69b3a2", getCountry(data, "Malaysia"))
  addLine(svg, x, y, lineValue, "#626169", getCountry(data, "Thailand"))
  addLine(svg, x, y, lineValue, "#C2DA58", getCountry(data, "Vietnam"))
  addLine(svg, x, y, lineValue, "#C07AA1", getCountry(data, "Singapore"))
  addLine(svg, x, y, lineValue, "#E5483A", getCountry(data, "Indonesia"))
  addLine(svg, x, y, lineValue, "#55E56C", getCountry(data, "Philippines"))
  addLine(svg, x, y, lineValue, "#8FCEE1", getCountry(data, "Myanmar"))
  addLine(svg, x, y, lineValue, "#A4B6F6", getCountry(data, "Cambodia"))
  addLine(svg, x, y, lineValue, "#D9C5F0", getCountry(data, "Laos"))
  addLine(svg, x, y, lineValue, "#F2D3EC", getCountry(data, "Brunei"))
  addLine(svg, x, y, lineValue, "#F00B4E", getCountry(data, "Timor-Leste"))
}

function getCountry(data, country) {
  return data.filter(d => d.name == country)
}

function addLine(svg, x, y, lineValue, color, data) {
  let stokeWidth = 1.5
  let strokeOpacity = 0.2
  let dotSize = 3

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", stokeWidth)
    .attr("stroke-opacity", strokeOpacity)
    .attr("d", lineValue)

  svg.selectAll("myCircles")
    .data(data)
    .enter()
    .append("circle")
    .attr("fill", color)
    .attr("stroke", "none")
    .attr("cx", d => x(d.year) )
    .attr("cy", d => y(d.gold) )
    .attr("r", dotSize)

  svg.append("text")
    .attr("transform", "translate(" + (x(data[data.length-1].year) + 15) + "," + (y(data[data.length-1].gold)) + ")")
    .attr("dy", "0.2em")
    .attr("text-anchor", "start")
    .style("fill", color)
    .text("AA")
    .text(data[0].name)
}

function main() {
  plot()
}

main()
