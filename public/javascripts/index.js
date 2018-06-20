// const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {

// let Year = 1999; // default
//
// let clickers = document.querySelectorAll("button");
// clickers.forEach(clicker => {
//   clicker.addEventListener("click", (e) => {
//     Year = e.target.value;
//     d3.queue()
//       .defer(d3.json, "https://d3js.org/us-10m.v1.json")
//       .defer(d3.tsv, `../data/StateDeath${Year}.tsv`, function(d){
//         mortality.set(d["State Code"], d.Deaths/1000);
//       })
//       .await(ready);
//   })
// })
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
  .domain(d3.range(2, 10))
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
  .text("Crude Rate");

g.call(d3.axisBottom(x)
      .tickSize(13)
      .tickFormat(function(x, i) { return i ? x : x + "00"; })
      .tickValues(color.domain()))
    .select("domain")
      .remove();
d3.queue()
  .defer(d3.json, "https://d3js.org/us-10m.v1.json")
  .defer(d3.tsv, `../data/Overall.tsv`, function(d){
    mortality.set(d["State Code"], d.CrudeRate);
  })
  .await(ready);
// let styles = {
//   div: {
//
//   }
// }
let ul = document.createElement("ul");
ul.className = "test"
document.body.appendChild(div);
// This lets us only have to create the event listener once
let moveHandler = () => {};
let callback = (e) => {
  moveHandler(e);
}
document.addEventListener("mousemove", callback);

function ready(error, us) {
  if (error) throw error;

  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("class", "state")
      .attr("fill", function(d) {
        d.rate = mortality.get(d.id)
        return color(d.rate/100);
      })
      .attr("d", path)
    .on('mouseover', function(d){
      d3.select(this).classed("selected", true);
      div.innerHTML = "test";
      console.log(d);
      d3.tsv(`../data/states/${d.id}.tsv`, function(d){

      })
      moveHandler = (e) => {
        div.style.position = "fixed";
        div.style.top = e.clientY + 5 + "px";
        div.style.left = e.clientX + 5 + "px";
      }
    })
    .on('mouseout', function(d){
      d3.select(this).classed("selected", false)
    })
      // Actual lines of the state, rather than just filled colors
  svg.append("path")
    .datum(topojson.mesh(us, us.objects.states, function(a,b) { return a !== b; }))
    .attr("class", "states")
    .attr("d", path);


  }
})
