import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import "./TaskPriorityChart.css";


const TaskPriorityChart = () => {
    const [tasks, setTasks] = useState([]);
    const svgRef = useRef(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch("/api/tasks");
            const data = await response.json();

            setTasks(data);
        };

        fetchTasks();

        //Fetch again every 3 seconds
        const interval = setInterval(() => {
            fetchTasks();
        }, 3000);

        //clean up when component disappears
        return () => {
            clearInterval(interval);
        };
    }, []);

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
        }
    ];

    useEffect(() => {
        if (tasks.length === 0) return;

        const width = 370; //total width
        const height = 150; //total height

        const marginTop = 30;
        const marginBottom = 30;
        const marginLeft = 30;
        const marginRight = 30;

        const svg = d3.select(svgRef.current);

        const maxCount = d3.max(priorityData, (d) => d.count);

        svg.selectAll("*").remove();

        const xScale = d3
            .scaleBand()
            .domain(priorityData.map((d) => d.priority))
            .range([marginLeft, width - marginRight])
            .padding(0.3);

        const yScale = d3
            .scaleLinear()
            .domain([0, maxCount])
            .range([height - marginBottom, marginTop]);

        const tooltip = d3
            .select(".priority-chart")
            .append("div")
            .attr("class", "chart-tooltip");


        // Draw bars
        svg
            .selectAll("rect")
            .data(priorityData)
            .join("rect")
            .attr("x", (d) => xScale(d.priority))
            .attr("y", (d) => yScale(d.count))
            .attr("width", xScale.bandwidth())
            .attr(
                "height",
                (d) => height - marginBottom - yScale(d.count)
            )
            .attr("fill", (d) => {
                if (d.priority === "Urgent") return "purple";
                if (d.priority === "High") return "red";
                if (d.priority === "Medium") return "orange";
                if (d.priority === "Low") return "green";

                return "steelblue";
            })

            //add hover interaction
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .attr("opacity", 0.7);

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
                d3.select(this)
                    .attr("opacity", 1);

                tooltip
                    .style("display", "none");
            });

    // Draw count labels
    svg
        .selectAll(".count-label")
        .data(priorityData)
        .join("text")
        .attr("class", "count-label")
        .attr("x", (d) => xScale(d.priority) + xScale.bandwidth() / 2)
        .attr("y", (d) => yScale(d.count) - 10)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "14px")
        .text((d) => d.count);

    //Draw X-axis
    const xAxis = d3.axisBottom(xScale);

    svg
        .append("g")
        .attr(
            "transform",
            `translate(0, ${height - marginBottom})`
        )
        .call(xAxis)
        .attr("color", "white");

    //Draw y-axis   
    // const yAxis = d3
    //     .axisLeft(yScale)
    //     .tickValues(d3.range(0, maxCount + 1))
    //     .tickFormat(d3.format("d"));
    // d=means display integer

    // svg
    //     .append("g")
    //     .attr("transform", `translate(${marginLeft}, 0)`)
    //     .call(yAxis)
    //     .attr("color", "white");



}, [tasks]);

return (
    <div className="priority-chart">
        <svg
            ref={svgRef}
            width="370"
            height="150"
            style={{ border: "1px solid white" }}
        />
    </div>
);
};

export default TaskPriorityChart;