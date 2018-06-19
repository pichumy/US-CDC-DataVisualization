// const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
  // d3.csv("../data/Death.csv", function(data){
  //   return {
  //     id: data.StateCode,
  //     state: data.State,
  //     population: data.Population,
  //     deaths: data.Deaths
  //   };
  // })
  // var svg = d3.select("#map")
  //   .append("svg")
  //   .attr("height", height + margin.top + margin.bottom)
  //   .attr("width", width + margin.left + margin.right)
  //   .append("g")
  //   .attr("transform", "translate(" + margin.left + ',' + margin.top + ")");

var svg = d3.select("svg");

var path = d3.geoPath();

d3.json("https://unpkg.com/us-atlas@1/us/10m.json", function(error, us) {
  if (error) throw error;
  console.log(us);
  // svg.append("path")
  //     .attr("stroke", "#aaa")
  //     .attr("stroke-width", 0.5)
  //     .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); })));
  let states = topojson.feature(us, us.objects.states).features
  svg.append("path")
      .attr("stroke-width", 0.5)
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
  svg.append("path")
      .attr("d", path(topojson.feature(us, us.objects.nation)));
    console.log(states[0]);

  svg.selectAll()
});

})
