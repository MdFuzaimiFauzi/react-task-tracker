import * as d3 from "d3";
import {useEffect, useRef, useState} from "react";
import "./TaskCompletionTrend.css";

const TaskCompletionTrend = () => {
    const [data, setData] = useState([]);
    const svgRef = useRef();

        const fetchTasks = async () => {
            try {
                const res = await fetch("/api/tasks");
                const data = await res.json();

                setData(data);
            } catch (error) {
                console.error("Failed to fetch tasks: ", error);
            }
            
        };

    //initial fetch
    useEffect(() => {
        fetchTasks();
    }, []);

    //SSE listener
    useEffect(() => {
    const eventSource = new EventSource("/api/events");

    eventSource.addEventListener("tasks-changed", () => {
        console.log("SSE: Task Completion Trend updated");

        fetchTasks();
    });

    eventSource.onerror = (error) => {
        console.error("SSE error:", error);
    };

    return () => {
        eventSource.close();
    };
}, []);

    const completedTasks = data.filter((task) => task.status === "Completed" && task.completed_at);

    const groupedByDate = d3.rollup(
            completedTasks,
            (tasks) => tasks.length,
            (task) => task.completed_at.split("T")[0]
        );

    const completionData = Array.from(groupedByDate, ([date, count]) => ({ date, count }));

    const parseDate = d3.timeParse("%Y-%m-%d");
    const parsedCompletionData = completionData.map((item) => ({
        date: parseDate(item.date),
        count: item.count,
    }));

    console.log("Parsed Completion Data:", parsedCompletionData);

    useEffect(() => {
    if (parsedCompletionData.length === 0) return;

    const width = 400;
    const height = 150;

    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 40;

     //animation
    const sortedData = [...parsedCompletionData].sort((a, b) => a.date - b.date);
    
    const maxCount = d3.max(parsedCompletionData, (d) => d.count);

    const xScale = d3.scaleTime()
        .domain(d3.extent(parsedCompletionData, (d) => d.date))
        .range([marginLeft, width - marginRight]);

    const yScale = d3
        .scaleLinear()
        .domain([0, maxCount])
        .nice()
        .range([height - marginBottom, marginTop]);

    const xAxis = d3
        .axisBottom(xScale)
        .ticks(5)
        .tickFormat(d3.timeFormat("%d-%m"));
    
    const yAxis = d3
        .axisLeft(yScale)
        .ticks(5)
        .tickFormat(d3.format("d"));

    const line = d3.line().x((d) => xScale(d.date)).y((d) => yScale(d.count));
    
    const tooltip = d3.select(".completion-tooltip");
   
    const svg = d3.select(svgRef.current);
    svg
        .attr("width", width)
        .attr("height", height)
    
    svg.selectAll("*").remove()

    svg
    .append("g")
    .attr("transform", `translate(0, ${height - marginBottom})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(0)")
    .attr("text-anchor", "end");

    svg
    .append("g")
    .attr("transform", `translate(${marginLeft}, 0)`)
    .call(yAxis);

    const circles = svg
    .selectAll("circle")
    .data(sortedData)
    .join("circle")
    .attr("cx", (d) => xScale(d.date))
    .attr("cy", (d) => yScale(d.count))
    .attr("r", 4)
    .attr("opacity", 0)

    .on("mouseover", (event, d) => {
        tooltip
            .style("display", "block")
            .html(`
                ${d3.timeFormat("%d %b %Y")(d.date)}<br/>
                Completed Tasks: ${d.count}
            `);
    })
    .on("mousemove", (event) => {
        tooltip
           .style("left", `${event.offsetX + 10}px`)
            .style("top", `${event.offsetY - 10}px`);
    })
    .on("mouseout", () => {
        tooltip.style("display", "none");
    });

        const path = svg
        .append("path")
        .datum(sortedData)
        .attr("fill", "none")
        .attr("stroke", "lightgreen")
        .attr("stroke-width", 2)
        .attr("d", line);

        const totalLength = path.node().getTotalLength();

        path
        .attr("stroke-dasharray", totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);
    

    circles
    .transition()
    .delay(350)
    .duration(300)
    .attr("fill", "white")
    .attr("opacity", 1);

}, [parsedCompletionData]);


    return (
    <div className="task-completion-trend">
        {parsedCompletionData.length === 0 ? (
            <p className="no-completed-task">
                No completed task yet
            </p>
        ) : (
            <>
                <svg
                    ref={svgRef}
                    width="400"
                    height="180"
                ></svg>

                <div className="completion-tooltip"></div>
            </>
        )}
    </div>
);
};

export default TaskCompletionTrend;