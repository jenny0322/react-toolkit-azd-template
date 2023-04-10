import React from "react"
import { Story } from "@ladle/react";
import { GraphikleProps } from "../components/Graphikle/Graphikle.types";
import Graphikle from "../components/Graphikle/Graphikle";

export const Graph: Story<GraphikleProps> = ({ id, baseurl, searchterm, graphdata, height, width }) => {
    return(
    <>
       <p>Search Term = {searchterm}, id={id}, baseurl={baseurl}, height={height}, width={width}</p>
       <Graphikle 
          height={height}
          width={width} 
          id={id}
          baseurl={baseurl}
          searchterm={searchterm}
          graphdata={graphdata}

          nodeClick={nodeClicked}
          nodeRightClick={nodeRightClicked}
          nodeHover={nodeHoveredOver}
          nodeDrag={nodeDragged}
          nodeDragEnd={nodeDragReleased}

          linkClick={linkClicked}
          linkRightClick={linkRightClicked}
          linkHover={linkHoveredOver}

          backgroundClick={backgroundClicked}
          backgroundRightClick={backgroundRightClicked}
        />
    </>
    );
};

Graph.args = {
  id: '3dgraph',
  baseurl: '[SOURCE_URL]',
  searchterm: '[SEARCH_TERM]'
};

Graph.argTypes = {
  height: {
    options: [ 400, 500, 600, 700, 800 ],
    control: { type: "select" },
    defaultValue: 700
  },
  width: {
      options: [ 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500 ],
      control: { type: "select" },
      defaultValue: 1400
  },
};

const nodeClicked = (nodeId: string, event: MouseEvent) => {
  alert(`${nodeId} was clicked`)
};

const nodeRightClicked = (nodeId: string, event: MouseEvent) => {
  alert(`${nodeId} was right clicked`)
};

const nodeHoveredOver = (nodeId: string, previousNodeId: string) => {
  if (nodeId === "") {
    console.log(`Node: ${previousNodeId} is no longer hovered over.`)
  } else if (previousNodeId === "") {
    console.log(`Node: ${nodeId} was hovered over`)
  } else
  {
    console.log(`Node: ${nodeId} was hovered over, previous node was ${previousNodeId}`)
  }
};

const nodeDragged = (nodeId: string, x: number, y: number) => {
  console.log(`${nodeId} is being dragged (started at ${x.toString()}, ${y.toString()})`)
};

const nodeDragReleased = (nodeId: string, x: number, y: number) => {
  console.log(`${nodeId} has been released (ended at ${x.toString()}, ${y.toString()})`)
};

const linkClicked = (linkSourceId: string, linkDestinationId:string, event: MouseEvent) => {
  alert(`link left clicked, goes from ${linkSourceId} to ${linkDestinationId}`)
};

const linkRightClicked = (linkSourceId: string, linkDestinationId:string, event: MouseEvent) => {
  alert(`link right clicked, goes from ${linkSourceId} to ${linkDestinationId}`)
};

const linkHoveredOver = (linkSourceId: string, linkTargetId: string, previousLinkSourceId: string, previousLinkTargetId: string) => {
  if (linkSourceId === "") {
    console.log(`Link: ${previousLinkSourceId} --> ${previousLinkTargetId} is no longer hovered over.`)
  } else if (previousLinkSourceId === "") {
    console.log(`Link: ${linkSourceId} --> ${linkTargetId} was hovered over`)
  } else
  {
    console.log(`Link: ${linkSourceId} --> ${linkTargetId} was hovered over, previous node was ${previousLinkSourceId} --> ${previousLinkTargetId}`)
  }
};

const backgroundClicked = (event: MouseEvent) => {
  alert('background was clicked')
};

const backgroundRightClicked = (event: MouseEvent) => {
  alert('background was right clicked')
};


