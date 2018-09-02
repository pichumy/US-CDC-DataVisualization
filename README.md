# CDC Data Visualization

This project is a heat-map visualization on CDC mortality data during the years from 1999 to 2016. Hovering over a state will provide more detailed information about the causes of death in that state.

https://pichumy.github.io/US-CDC-DataVisualization/

# Architecture and Technologies

This project uses the following technologies:

* A node.js server to prevent cross domain errors while using D3.
* D3, a library for creating data visualization graphics in javascript
* topojson, a library that contains functionality to create maps of various geographic locations
* Webpack, to bundle up and serve various scripts (Maybe not needed!)

# Implementation Timeline

This project was created in roughly two days, with most of the time being spent on figuring out what data to acquire, and how to load it. A future addition that I would like to complete is to create an exportable class with functions that will allow people to create their own heat maps by simply passing their data through that class.

# Code

This part of the code loads in the file that contains the US map as well as the general data from 1999 to 2016.  
```
d3.queue()
  .defer(d3.json, "https://d3js.org/us-10m.v1.json")
  .defer(d3.tsv, `../data/Overall.tsv`, function(d){
    mortality.set(d["State Code"], d.CrudeRate);
  })
  .await(ready);
```
That data is then used to draw the state, and coloring the state based on the rate provided by the data (Data is matched by mapping to the state code)
```
svg.append("g")
  .selectAll("path")
  .data(topojson.feature(us, us.objects.states).features)
  .enter().append("path")
    // These individual paths are the states.
    .attr("class", "state")
    // This function colors the state based on the Crude Rate
    .attr("fill", function(d) {
      d.rate = mortality.get(d.id)
      return color(d.rate/100);
    })
    // Draw the state!
    .attr("d", path)
```

This portion of the code is used to cause additional information to appear on hover. The first block is a nice trick to avoid creating multiple event listeners, while the second block is the logic for having the data show up (and response to mouse position). The moveHandler is used to determine the location based on mouse position.

```
// This lets us only have to create the event listener once
let moveHandler = () => {};
let callback = (e) => {
  moveHandler(e);
}
```
```
.on('mouseover', function(d){
  d3.select(this).classed("selected", true);
  ul.classList.remove("hidden");
  let strong = document.createElement("strong");
  strong.innerHTML = "15 Leading Causes of Death";
  ul.appendChild(strong);
  d3.tsv(`../data/states/${d.id}.tsv`, function(d){
    for(let i = 0; i < 15; i++){
      let li = document.createElement("li");
      li.innerHTML = `${d[i]['15 Leading Causes of Death'].substring(1)}: ${d[i].Deaths}`;
      ul.appendChild(li);
    }
  })
  moveHandler = (e) => {
    ul.style.position = "fixed";
    if(e.clientY > 300){
      ul.style.top = e.clientY - 300 + "px";
    }else{
      ul.style.top = e.clientY - 5 + "px";
    }
    if(e.clientX > 700){
      ul.style.left = e.clientX - 500 + "px";
    }else {
      ul.style.left = e.clientX + 10 + "px";
    }
  }
})
.on('mouseout', function(d){
  d3.select(this).classed("selected", false)
  ul.classList.add("hidden");
  while(ul.lastChild){
    ul.removeChild(ul.lastChild);
  }
})
```
