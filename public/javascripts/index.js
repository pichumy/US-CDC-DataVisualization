// const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {

let Year = 1999; // default

let clickers = document.querySelectorAll("button");
clickers.forEach(clicker => {
  clicker.addEventListener("click", (e) => {
    Year = e.target.value;
  })
})
let svg = d3.select("svg");

let height = +svg.attr("height");
let width = +svg.attr("width");
let mortality = d3.map();
let path = d3.geoPath();
  // .projection(projection);

let x = d3.scaleLinear()
  .domain([1, 10])
  .rangeRound([600, 860]);
let color = d3.scaleThreshold()
  .domain(d3.range(0, 1.5))
  .range(d3.schemeBlues[9]);
let g = svg.append("g")
  .attr("class", "key")
  .attr("transform", "translate(0,40)");

g.selectAll("rect")
  .data(color.range().map(function(d){
    d = color.invertExtent(d);
    if(d[0] == null) d[0] = x.domain()[0];
    if(d[1] == null) d[1] = x.domain()[1];
    return d;
  }))
  .enter().append("rect")
    .attr("height", 8)
    .attr("x", function(d){ return x(d[0]); })
    .attr("width", function(d){ return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return color(d[0]); });

g.append("text")
  .attr("class", "caption")
  .attr("x", x.range()[0])
  .attr("y", -6)
  .attr("fill", "#000")
  .attr("text-anchor", "start")
  .attr("font-weight", "bold")
  .text("Mortality Rate");

g.call(d3.axisBottom(x)
      .tickSize(13)
      .tickFormat(function(x, i) { return i ? x/10 : x/10 + "%"; })
      .tickValues(color.domain()))
    .select("domain")
      .remove();
d3.queue()
  .defer(d3.json, "https://d3js.org/us-10m.v1.json")
  .defer(d3.tsv, `../data/StateDeath${Year}.tsv`, function(d){
    console.log(d);
    mortality.set(d["State Code"], d.Deaths/1000);
  })
  .await(ready);

function ready(error, us) {
  if (error) throw error;
  console.log("this runs");
  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("fill", function(d) {
        d.rate = mortality.get(d.id)
        console.log(d.rate);
        return color(d.rate * 1000);
      })
      .attr("d", path)
    .append("title")
      .text(function(d) { return d.rate + "%"; });

      // this part makes lines thicker? :thinking:
  svg.append("path")
    .datum(topojson.mesh(us, us.objects.states, function(a,b) { return a !== b; }))
    .attr("class", "states")
    .attr("d", path);


  }
})
