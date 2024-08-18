import React from "react";
import * as d3 from "d3";

import { useEffect, useRef } from "react";

// REFERENCES
// 1. https://medium.com/@c_behrens/enter-update-exit-6cafc6014c36
// 2. Good one for beginners https://www.dataviscourse.net/tutorials/lectures/lecture-advanced-d3/

const ExpGeneralUpdate = ({ inputData, chartSize }) => {
  const ref = useRef(null);
  const chartWidth = chartSize
    ? chartSize.width
      ? chartSize.width
      : 100
    : 100;
  const chartHeight = chartSize
    ? chartSize.height
      ? chartSize.height
      : 100
    : 100;

  useEffect(() => {
    console.log("-----------");
    console.log(inputData);
    const svg = d3
      .select(ref.current)
      .attr("width", chartWidth || 100)
      .attr("height", chartHeight || 10)
      .style("background-color", "beige");

    // Bind D3 data
    const shapes = svg.selectAll("circle").data(inputData);
    console.log("GU > SHAPES ", shapes);

    // Set up global transition behavior
    // const t = svg.transition().duration(500);

    const xScale = d3
      .scaleLinear()
      .domain([0, inputData.length])
      .range([50, chartWidth - 50]);
    const yScale = d3
      .scaleLinear()
      .domain([0, inputData.length])
      .range([50, chartHeight - 50]);

    // ENTER new D3 elements
    const enterObject = shapes.enter();
    console.log("GU > ENTER ", enterObject);

    enterObject
      .append("circle")
      .attr("r", 0)
      // .attr("cx", (d, i) => xScale(i))
      // .attr("cy", 40)
      .attr("cx", Math.floor(Math.random() * (chartWidth - 50)))
      .attr("cy", Math.floor(Math.random() * (chartHeight - 50)))
      .transition()
      .duration(500)
      .attr("r", (d, i) => d.value)
      .style("fill", "green")
      .style("stroke", "gray")
      .style("opacity", 0.75);
    // .call((enter) =>
    //   enter
    //     .transition(t)
    //     .attr("r", (d) => d.value)
    //     .style("fill", "green")
    // );

    // UPDATE existing D3 elements
    const updateObject = shapes;
    console.log("GU > UPDATE ", updateObject);

    updateObject
      .transition()
      .duration(500)
      // .attr("cx", (d, i) => xScale(i))
      // .attr("cy", 40)
      // .attr("cx", Math.floor(Math.random() * (chartWidth - 50)))
      // .attr("cy", Math.floor(Math.random() * (chartHeight - 50)))
      .attr("r", (d, i) => d.value)
      .style("fill", "orange");
    // .call((update) =>
    //   update
    //     .transition(t)
    //     .attr("cx", (d, i) => xScale(i))
    //     .attr("cy", 40)
    //     .attr("r", (d, i) => d.value)
    //     .style("fill", "orange")
    // );

    // EXIT remove D3 elements no longer in the data
    const exitObject = shapes.exit();
    console.log("GU > EXIT ", exitObject);
    console.log("------------");
    exitObject
      .style("fill", "red")
      .transition()
      .duration(500)
      .attr("r", 0)
      .remove();
    // console.log("EXIT > ", stExit);
  });
  return <svg ref={ref}></svg>;
};

export default ExpGeneralUpdate;
