async function plot2(){
  // set the dimensions and margins of the graph
  let margin = {top: 20, right: 20, bottom: 30, left: 50}
  let width = 600 - margin.left - margin.right
  let height = 600 - margin.top - margin.bottom

  // set the ranges
  let x = d3.scaleLinear().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);

  // append the svg obgect to the body of the page
  let svg = d3.select("body").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g").attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  data_path = "https://gist.githubusercontent.com/rapee/fd513e1f231130c75a555bfbeb7e803b/raw/e71bcc5dc33cf2a606752ce9d3dbf4700bce3610/medals.csv"
  const data = await d3.csv(data_path);

  // Scale the range of the data

  console.log(data.reduce(function(max, x) { return (x.gold > max) ? x.gold : max; }, 0))

  x.domain(d3.extent(data, d => d.year ))
  // y.domain(d3.extent(data, d => d.gold ))
  y.domain([0, d3.max(data, d => d.gold)])
  y.domain([0, 200])

  // define the line
  let valueline = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.gold); })

  // Add the valueline path.
  svg.append("path")
    .data([data.filter(function(d) {return d.name == "Thailand"})])
    .attr("class", "line")
    .attr("d", valueline);

  // Add the X Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
    .call(d3.axisLeft(y));

}

function plot() {
  let data = [35, 21, 38, 77, 32, 44, 47, 80, 37, 50, 62, 49, 92, 63, 62, 72, 63, 157, 83, 65, 103, 90, 87, 183, 86, 109, 108, 95, 72];

  let bar = d3.select("svg").selectAll("rect")
    .data(data);

  let h = 600
  let y = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, h])

  let color = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range(["red", "blue"])

  bar.enter().append("rect")
    .attr("x", (d, i) => i*20)
    .attr("y", d => h-y(d))
    .attr("height", d => y(d))
    .style("fill", d => color(d))
}

function main() {
  // plot()
  plot2()
}

main()
