import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "./style.css"; // Ensure you import your CSS file

const Provider = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [destinationsData, setDestinationsData] = useState([]);
  const chartRef = useRef(null);
  const scatterplotRef = useRef(null);
  const [poiData, setPoiData] = useState([]);
  const treeMapRef = useRef(null);

  useEffect(() => {
    // Fetch hotel data from the backend
    fetch("https://cs373-idb-group4-summer2024.uc.r.appspot.com/hotels")
      .then((response) => response.json())
      .then((data) => {
        const hotels = data.hotels;
        const aggregatedData = aggregateRatings(hotels);
        setBarChartData(aggregatedData);
      })
      .catch((error) => console.error("Error fetching hotel data:", error));

    // Fetch destination data from the backend
    fetch("https://cs373-idb-group4-summer2024.uc.r.appspot.com/destinations")
      .then((response) => response.json())
      .then((data) => {
        const destinations = data.destinations;
        setDestinationsData(destinations);
      })
      .catch((error) =>
        console.error("Error fetching destination data:", error)
      );

    fetch(
      "https://cs373-idb-group4-summer2024.uc.r.appspot.com/pointsofinterest"
    )
      .then((response) => response.json())
      .then((data) => {
        const poi = data.point_of_interest;
        const aggregatedData = aggregateByCity(poi);
        setPoiData(aggregatedData);
      })
      .catch((error) => console.error("Error fetching POI data:", error));
  }, []);

  function aggregateByCity(data) {
    const cityCounts = {};
    data.forEach((poi) => {
      const city = poi.cityName;
      if (cityCounts[city]) {
        cityCounts[city]++;
      } else {
        cityCounts[city] = 1;
      }
    });
    const aggregatedData = Object.entries(cityCounts).map(([city, count]) => ({
      city,
      count,
    }));
    return aggregatedData;
  }

  useEffect(() => {
    if (poiData.length > 0) {
      createTreeMap(poiData);
    }
  }, [poiData]);

  useEffect(() => {
    if (barChartData.length > 0) {
      createBarChart(barChartData);
    }
  }, [barChartData]);

  useEffect(() => {
    if (destinationsData.length > 0) {
      createScatterPlot(destinationsData);
    }
  }, [destinationsData]);

  function aggregateRatings(data) {
    const ratingCounts = {};
    data.forEach((hotel) => {
      const rating = hotel.rating;
      if (ratingCounts[rating]) {
        ratingCounts[rating]++;
      } else {
        ratingCounts[rating] = 1;
      }
    });
    const aggregatedData = Object.entries(ratingCounts).map(
      ([rating, count]) => ({
        rating: +rating,
        count,
      })
    );
    // Sort the aggregated data by rating
    aggregatedData.sort((a, b) => a.rating - b.rating);
    return aggregatedData;
  }

  function createTreeMap(data) {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    d3.select(treeMapRef.current).selectAll("*").remove();

    const svg = d3
      .select(treeMapRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const root = d3
      .hierarchy({ children: data })
      .sum((d) => d.count)
      .sort((a, b) => b.count - a.count);

    d3.treemap().size([width, height]).padding(1)(root);

    const nodes = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    nodes
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", "steelblue")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "orange");
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`${d.data.city}<br>Count: ${d.data.count}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "steelblue");
        tooltip.transition().duration(500).style("opacity", 0);
      });

    nodes
      .append("text")
      .attr("x", 3)
      .attr("y", 10)
      .text((d) => `${d.data.city} (${d.data.count})`)
      .attr("fill", "white")
      .style("font-size", "12px")
      .call(wrapText, d => d.x1 - d.x0);

  }

  function wrapText(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")) || 0,
          tspan = text.text(null).append("tspan").attr("x", text.attr("x")).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", text.attr("x")).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }
    

  function createBarChart(data) {
    // Set dimensions and margins
    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Remove any existing SVG before creating a new one
    d3.select(chartRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.rating))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height, 0]);

    // Add x-axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .style("fill", "white");

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text("# of Hotels");

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text("Rating");

    // Add y-axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("fill", "white");

    // Add bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.rating))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "steelblue");

    // Add interactivity
    svg
      .selectAll(".bar")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "orange");
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Count: ${d.count}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr("fill", "steelblue");
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Append a tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  }

  function createScatterPlot(data) {
    // Set dimensions and margins
    const margin = { top: 20, right: 30, bottom: 40, left: 50 },
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // Remove any existing SVG before creating a new one
    d3.select(scatterplotRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3
      .select(scatterplotRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.longitude))
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.latitude))
      .range([height, 0]);

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("fill", "white");

    // Add Y axis
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("fill", "white");

    // Add dots
    svg
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.longitude))
      .attr("cy", (d) => y(d.latitude))
      .attr("r", 5)
      .style("fill", "steelblue")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `City: ${d.cityName}<br>Location: ${d.location}<br>Latitude: ${d.latitude}<br>Longitude: ${d.longitude}`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", (d) => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add axis labels
    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text("Longitude");

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text("Latitude");

    // Append a tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  }

  return (
    <div>
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center mt-5">
            <h3 className="text-center mt-3" style={{ color: "white" }}>
              Hotel Ratings
            </h3>
            <svg ref={chartRef}></svg>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center mt-5">
            <h3 className="text-center mt-3" style={{ color: "white" }}>
              Destinations
            </h3>
            <svg ref={scatterplotRef}></svg>
          </div>
        </div>
        <div>
          <div className="row justify-content-center">
            <div className="col-12 d-flex flex-column justify-content-center align-items-center mt-5">
              <h3 className="text-center mt-3" style={{ color: "white" }}>
                Points of Interest by City
              </h3>
              <svg ref={treeMapRef}></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Provider;
