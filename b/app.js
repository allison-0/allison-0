// Define the data
const data = [
    { name: 'Car, truck, or van - drove alone', value: 284728 },
    { name: 'Car, truck, or van - carpooled', value: 44173 },
    { name: 'Public transportation (excluding taxicab)', value: 2923 },
    { name: 'Walked', value: 6533 },
    { name: 'Taxicab, motorcycle, bicycle, or other means', value: 5823 },
    { name: 'Worked from home', value: 62080 },

];

// Set dimensions and margins for the chart
const margin = { top: 30, right: 30, bottom: 150, left: 40 },
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Append SVG element
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create the X axis
const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.name))
    .padding(0.5);




// Rotate and style X-axis labels
//xAxis.selectAll("text")
   // .attr("class", "axis-label")
  //  .attr("text-anchor", "end")
  //  .style("font-size", "12px")
   // .style("fill", "black");

// Create the Y axis
const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .attr("class", "axis-label");

// Create the bars
svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.value));

// Add a title
svg.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("class", "title")
    .text("Simple Bar Chart");

const xAxis = svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("class", "axis-label")
    .style("text-anchor", "end") // Align text to the end
    .attr("dx", "-0.8em") // Adjust text position
    .attr("dy", "0.5em")
    .call(wrap, 80); // Apply the wrap function with a specified width; // Adjust text position


function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
        }
    });
    }