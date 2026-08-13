import * as d3 from "d3";
import { useEffect, useRef } from "react";
import "./TaskStatusChart.css";

const TaskStatusChart = ({ tasks = [] }) => {
   const svgRef = useRef(null);
   const statusData = [
        {
            status: "Not Start Yet",
            count: tasks.filter((task) => task.status === "Not Start Yet").length,
        },
        {
            status: "Pending",
            count: tasks.filter((task) => task.status === "Pending").length,
        },
        {
            status: "In Progress",
            count: tasks.filter((task) => task.status === "In Progress").length,
        },
        {
            status: "Completed",
            count: tasks.filter((task) => task.status === "Completed").length,
        }
    ];

    useEffect(() => {
        const pie = d3.pie().value((d) => d.count);
        const arc = d3.arc().innerRadius(0).outerRadius(70);

        if (tasks.length === 0) return;

        const width = 360;
        const height = 150;
        const svg = d3.select(svgRef.current);
        const arcs = pie(statusData);

        const arcTween = (d) => {
        const interpolate = d3.interpolate(
            { ...d, endAngle: d.startAngle },
            d
        );

        return (t) => arc(interpolate(t));
        };

        const color = d3
            .scaleOrdinal()
            .domain(statusData.map((d) => d.status))
            .range([
                "cyan",
                "red",
                "orange",
                "green",
            ]);

            let tooltip = d3.select(".status-chart .chart-tooltip");

            if (tooltip.empty()) {
                tooltip = d3
                .select(".status-chart")
                .append("div")
                .attr("class", "chart-tooltip");
            }

        svg
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr(
            "transform",
            `translate(${width / 2 - 25}, ${height / 2})`
        )
        .attr("fill", (d) => color(d.data.status))
        .attr("stroke", "white")
        .attr("stroke-width", "2px")

        //tooltip
        .on("mouseover", function (event, d) {
                d3.select(this).attr("opacity", 0.7);
        
                tooltip
                  .style("display", "block")
                  .html(`
                    <strong>${d.data.status}</strong><br/>
                    ${d.data.count} task${d.data.count !== 1 ? "s" : ""}
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
        .attr("d", (d) =>
            arc({
            ...d,
            endAngle: d.startAngle,
            })
        )
        .transition()
        .duration(700)
        .ease(d3.easeCubicOut)
        .attrTween("d", arcTween)
        ;

        //legend
        const legend = svg
        .selectAll(".legend-item")
        .data(statusData)
        .join("g")
        .attr("class", "legend-item")
        .attr("transform", (d,i) => {
            return `translate(280, ${30 + i * 25})`;
        })

        legend
        .selectAll("circle")
        .data((d) => [d])
        .join("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 6)
        .attr("fill", (d) => color(d.status));

        legend
        .selectAll("text")
        .data((d) => [d])
        .join("text")
        .attr("x", 12)
        .attr("y", 0)
        .attr("dominant-baseline" , "middle")
        .attr("fill" , "white")
        .attr("font-size" , "12px")
        .text((d) => d.status);
        
    }, [tasks]);


  return (
    <div className="status-chart">
      <svg
        ref={svgRef}
        width="360"
        height="150"
      />
    </div>
  );

};

export default TaskStatusChart;