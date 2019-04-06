d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(error, a) {
    var baseTemp = a.baseTemperature;
    var dataset = [a.monthlyVariance.map(b => b.year),a.monthlyVariance.map(b => b.month),a.monthlyVariance.map(b => b.variance)];
    
    const w = 1200,
          h = 600,
          padding = 60,
          margin = 20,
          tileWidth = 5,
          tileHeight = 39;
  
    const xScale = d3.scaleLinear().domain([d3.min(dataset[0]), d3.max(dataset[0])])
                                   .range([padding, w - padding - margin]);
  
    const yScale = d3.scaleTime().range([padding, h - padding * 2])
                                   .domain([0, 11]);
  
    const yScaleAxis = d3.scaleTime().range([padding, h - padding * 2])
                                     .domain([new Date(2017, 0, 1), new Date(2017, 11, 1)])
  
    const warmScale = d3.scaleSequential()
                        .domain([baseTemp + d3.min(dataset[2]), baseTemp + d3.max(dataset[2])])
                        .interpolator(d3.interpolatePlasma);
  
    var legendScale = [1, 4, 6, 8, 10, 12, 15];
    
  const lScale = d3.scaleLinear().domain([d3.min(legendScale), d3.max(legendScale)])
                                   .range([padding, 340]);
  
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
    
    var tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .attr("id", "tooltip")
                    .style("opacity",0)
  
    function tooltipContent(d){
        var toolTemp = (d.variance + baseTemp).toFixed(1);
        var toolDate = new Date(d.year, d.month);
        
        return d3.timeFormat("%B %Y")(toolDate) + "<br><br>" + "Temperature: " + toolTemp + " °C<br><br>"
    }

    svg.selectAll("rect")
        .data(a.monthlyVariance)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.year) + margin)
        .attr("y", (d) => yScale(d.month - 1))
        .attr("width", (d) => tileWidth)
        .attr("height", (d) => tileHeight)
        .attr("class", "cell")
        .attr("data-year",(d,i) => d.year)
        .attr("data-month",(d,i) => d.month - 1)
        .attr("data-temp",(d,i) => d.variance)
        .attr("fill", (d) => warmScale(d.variance + baseTemp))
        .on("mouseover",function(d, i) {
            const text = tooltipContent(d);
            tooltip.transition().style("opacity",0.9)
            tooltip.html(text)
                   .style("top", (d3.event.pageY) + "px")
                   .style("left", (d3.event.pageX / 2) + "px")
        })
        .on("mouseout",function(d,i){
            tooltip.transition()
                   .style("opacity",0)
        })
  
    svg.append("text")
      .text("Monthly Global Land-Surface Temperature")
        .attr("class", "title")
        .attr("x", w / 2 - 200)
        .attr("y", 20)
        .attr("font-size", 25)
  
    svg.append("text")
        .attr("id", "description")
        .text("1753 - 2015 base temperature 8.66 celsius")
        .attr("class", "title2")
        .attr("x", w / 2 - 160)
        .attr("y", 50)
        .attr("font-size", 18)

    svg.append("g")
        .attr("id", "x-axis")
        .attr("class", "tick")
        .attr("transform", "translate(" + (margin) + "," + (h - padding - margin - 1) + ")")
        .call(d3.axisBottom(xScale).ticks(20).tickFormat(d3.format(".0f")))
  
    svg.append("g")
        .attr("id", "y-axis")
        .attr("class", "tick")
        .attr("transform", "translate(" + (padding + margin) + "," + margin + ")")
        .call(d3.axisLeft(yScaleAxis).ticks(12).tickFormat(d3.timeFormat("%B")));

    var legend = svg.append("g").attr("id", "legend");

    legend.append("rect")
        .attr("x", padding + margin)
        .attr("y", h - 50)
        .attr("width", (d) => 40)
        .attr("height", (d) => tileHeight / 2)
        .attr("fill", (d) => warmScale(legendScale[0]))
    legend.append("rect")
        .attr("x", padding + margin * 3)
        .attr("y", h - 50)
        .attr("width", (d) => 40)
        .attr("height", (d) => tileHeight / 2)
        .attr("fill", (d) => warmScale(legendScale[1]))
    legend.append("rect")
        .attr("x", padding + margin * 5)
        .attr("y", h - 50)
        .attr("width", (d) => 40)
        .attr("height", (d) => tileHeight / 2)
        .attr("fill", (d) => warmScale(legendScale[2]))
    legend.append("rect")
        .attr("x", padding + margin * 7)
        .attr("y", h - 50)
        .attr("width", (d) => 40)
        .attr("height", (d) => tileHeight / 2)
        .attr("fill", (d) => warmScale(legendScale[3]))
    legend.append("rect")
        .attr("x", padding + margin * 9)
        .attr("y", h - 50)
        .attr("width", (d) => 40)
        .attr("height", (d) => tileHeight / 2)
        .attr("fill", (d) => warmScale(legendScale[4]))
    legend.append("rect")
        .attr("x", padding + margin * 11)
        .attr("y", h - 50)
        .attr("width", (d) => 40)
        .attr("height", (d) => tileHeight / 2)
        .attr("fill", (d) => warmScale(legendScale[5]))
    legend.append("rect")
        .attr("x", padding + margin * 13)
        .attr("y", h - 50)
        .attr("width", (d) => 40)
        .attr("height", (d) => tileHeight / 2)
        .attr("fill", (d) => warmScale(legendScale[6]))
  
    svg.append("g")
      .attr("id", "l-axis")
      .attr("class", "tick")
      .attr("transform", "translate(" + margin + "," + (h - margin - 12) + ")")
      .call(d3.axisBottom(lScale).ticks(8).tickFormat(d3.format(".0f")))
});