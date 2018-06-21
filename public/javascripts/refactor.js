class HeatMap = {
  constructor(svg, dataFile, identifier, colors = d3.schemeBlues[9]){
    this.svg = svg;
    this.colors = colors;
    this.title = "Your title here"
    this.scale = scale;
    this.file = dataFile;
    this.identifier = identifier;
    if(dataFile.substring(dataFile.length - 4) === "json")
      this.type = "json"
    else
      this.type = dataFile.substring(dataFile.length-3)

  }
  render(){
    let data_map = d3.map();
    let path = d3.geoPath();
    let g = this.svg.append("g")
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
      .attr("x", function(d){ return x[d[0]]});
      .attr("width", function(d) { return x(d[1]) - x(d[0]); })
    g.append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text(this.title)
    g.call(d3.axisBottom(x)
          .tickSize(13)
          .tickFormat(function(x, i) { return i ? x : x + scale()) })
          .tickValues(color.domain()))
        .select("domain")
          .remove();
    )

    d3.queue()
      .defer(d3.json, "https://d3js.org/us-10m.v1.json")
      .defer(d3[this.type], this.file, function(d){
        data_map.set(d[this.identifier])
      })
  }
  title(string){
    this.title = string;
  }
  scale(scale = this.scale){
    let string = "";
    this.scale = scale;
    for(let i = 0; i < scale, i++){
      string += "0";
    }
    return string;
  }

}
