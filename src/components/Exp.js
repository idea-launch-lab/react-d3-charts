import React from "react";
import * as d3 from "d3";

import { useEffect, useRef } from "react";

const Exp = ({ inputData, chartSize }) => {
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

    const groups = svg.selectAll("g").data(inputData);

    const xScale = d3
      .scaleLinear()
      .domain([0, inputData.length])
      .range([50, chartWidth - 50]);

    // Enter new D3 elements
    const groupEnter = groups.enter().append("g").attr("class", ".group");

    groupEnter
      .append("circle")
      .attr("r", 0)
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", 40)
      .transition()
      .duration(500)
      .attr("r", (d, i) => d.value)
      .style("fill", "green");

    groupEnter
      .append("text")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => 40)
      .text((d) => d.name);

    // update
    groups
      .select("circle")
      .transition()
      .duration(500)
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", 40)
      .attr("r", (d, i) => d.value)
      .style("fill", "orange");
    groups
      .select("text")
      .transition()
      .duration(500)
      .attr("x", (d, i) => xScale(i))
      .attr("y", 40)
      .text((d) => d.name);

    // console.log("UPDATE > ", stUpdate);

    const stExit = groups.exit();
    // const stExit = groups.select("g");
    stExit
      .select("circle")
      .style("fill", "red")
      .transition()
      .duration(200)
      .attr("r", 0)
      .on("end", () => stExit.remove());

    // stExit.remove();

    // console.log("EXIT > ", stExit);
  });
  return <svg ref={ref}></svg>;
};

export default Exp;
