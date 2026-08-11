import * as d3 from "d3";
import { useEffect, useRef } from "react";
import "./D3Example.css";


const D3Example = () => {
    const svgRef = useRef(null);

 
useEffect(() => {
  const data = [30, 50, 70, 40, 60];

  const width = 800;
  const height = 800;

  const xScale = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([50, 750])
    .padding(0.2);

  const yScale = d3
  .scaleLinear()
  .domain([0,70])
  .range([750, 50]);

  const svg = d3.select(svgRef.current);

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height",(d) => 750 - yScale(d))
    .attr("fill", "steelblue");
}, []);

return (
    <div className="d3-container">
         <svg
        ref={svgRef}
        width="800"
        height="800"
        style={{ border: "1px solid white" }}
        />
    </div>
    );
};


export default D3Example;