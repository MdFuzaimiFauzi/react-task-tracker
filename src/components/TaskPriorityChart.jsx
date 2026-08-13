import * as d3 from "d3";
import { useEffect, useRef } from "react";
import "./TaskPriorityChart.css";

const TaskPriorityChart = ({ tasks = [] }) => {
  const svgRef = useRef(null);
 
  const priorityData = [
    {
      priority: "Urgent",
      count: tasks.filter((task) => task.priority === "Urgent").length,
    },
    {
      priority: "High",
      count: tasks.filter((task) => task.priority === "High").length,
    },
    {
      priority: "Medium",
      count: tasks.filter((task) => task.priority === "Medium").length,
    },
    {
      priority: "Low",
      count: tasks.filter((task) => task.priority === "Low").length,
    },
  ];

  useEffect(() => {
    if (tasks.length === 0) return;

    const width = 400;
    const height = 160;

    const marginTop = 5;
    const marginBottom = 30;
    const marginLeft = 30;
    const marginRight = 30;

    const svg = d3.select(svgRef.current);

    const maxCount = d3.max(priorityData, (d) => d.count) || 1;

    // X scale
    const xScale = d3
      .scaleBand()
      .domain(priorityData.map((d) => d.priority))
      .range([marginLeft, width - marginRight])
      .padding(0.3);

    // Y scale
    const yScale = d3
      .scaleLinear()
      .domain([0, maxCount])
      .range([height - marginBottom, marginTop]);

    // Remove previous tooltip before creating a new one
    d3.select(".priority-chart")
      .selectAll(".chart-tooltip")
      .remove();

    const tooltip = d3
      .select(".priority-chart")
      .append("div")
      .attr("class", "chart-tooltip");

    // -------------------------
    // Bars
    // -------------------------

    const bars = svg
      .selectAll(".priority-bar")
      .data(priorityData, (d) => d.priority);

    bars
      .join(
        (enter) =>
            enter
            .append("rect")
        .attr("class", "priority-bar")
        .attr("x", (d) => xScale(d.priority))
        .attr("width", xScale.bandwidth())
        .attr("y", height - marginBottom)
        .attr("height", 0),

        (update) => update)
        
      .attr("class", "priority-bar")
      .attr("x", (d) => xScale(d.priority))
      .attr("width", xScale.bandwidth())
      .attr("fill", (d) => {
        if (d.priority === "Urgent") return "cyan";
        if (d.priority === "High") return "red";
        if (d.priority === "Medium") return "orange";
        if (d.priority === "Low") return "green";

        return "steelblue";
      })
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 0.7);

        tooltip
          .style("display", "block")
          .html(`
            <strong>${d.priority}</strong><br/>
            ${d.count} task${d.count !== 1 ? "s" : ""}
          `);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", `${event.pageX + 20}px`)
          .style("top", `${event.pageY + 20}px`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 1);

        tooltip.style("display", "none");
      })
      .transition()
      .duration(700)
      .attr("y", (d) => yScale(d.count))
      .attr(
        "height",
        (d) => height - marginBottom - yScale(d.count)
      );

    // -------------------------
    // Count labels
    // -------------------------

    const labels = svg
      .selectAll(".count-label")
      .data(priorityData, (d) => d.priority);

    const yAxis = d3
  .axisLeft(yScale)
  .ticks(maxCount)
  .tickFormat(d3.format("d"));

    svg
    .selectAll(".y-axis")
    .data([null])
    .join("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${marginLeft}, 0)`)
    .attr("color", "white")
    .call(yAxis);

    const xAxis = d3.axisBottom(xScale);

    svg
      .selectAll(".x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr(
        "transform",
        `translate(0, ${height - marginBottom})`
      )
      .attr("color", "white")
      .call(xAxis);

  }, [tasks]);

  return (
    <div className="priority-chart">
      <svg
        ref={svgRef}
        width="370"
        height="150"
      />
    </div>
  );
};

export default TaskPriorityChart;