import React, { FC, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import ForceGraph3D, { LinkObject, NodeObject } from 'react-force-graph-3d'
import { GraphikleProps } from './Graphikle.types'
import { IGraphData } from '../../model/IGraphData'
import DataService from '../../datacontext/DataService'
import { ForceGraph3DInstance } from '3d-force-graph'
import SpriteText from 'three-spritetext'
import * as three from "three"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

const StyledGraphikle = styled.div<GraphikleProps>`
  id: ${props => props.id};
  width: ${props => props.width};
  height: ${props => props.height};
  baseurl;
  searchterm: ${props => props.searchterm};
  graphdata;
  nodeClick;
  nodeRightClick;
  nodeHover;
  nodeDrag;
  nodeDragEnd;
  linkClick;
  linkRightClick;
  linkHover;
  backgroundClick;
  backgroundRightClick;
`;

const Graphikle: React.FC<GraphikleProps> = ({ ...props }) => {
  const { nodeClick, nodeRightClick, nodeHover, nodeDrag, nodeDragEnd, linkClick, linkRightClick, linkHover, backgroundClick, backgroundRightClick } = props;
  const ref = React.createRef();
  const graphRef = React.createRef<ForceGraph3DInstance>();
  const [graphData, setGraphData] = useState<IGraphData>();
  const [currentsearchterm, setCurrentSearchTerm] = useState<string>("");

  const getSearchData = () => {
      DataService.getBySearchTerm(props.baseurl, props.searchterm).then((response: any) => { 
        setCurrentSearchTerm(props.searchterm);
        setGraphData(response.data);
    }).catch((e: Error) => { 
      console.log(e); 
    });
  };

  if (currentsearchterm !== props.searchterm)
  {
    getSearchData();
  }

  useEffect(() => {
    const bloomPass = new UnrealBloomPass(new three.Vector2(props.height,props.width),3,1,0.1);
    graphRef.current.postProcessingComposer().addPass(bloomPass);
  },[]);


  const castNodeToString = (node: NodeObject | null) => {
    if (node === null) return "";
    switch(typeof node.id){
      case 'string':
        return node.id;
        break;
      case 'number':
        return node.id.toString();
        break;
      default:
        return "";
    }
  }

  const castLinkToString = (link: string | number | NodeObject | null) => {
    if (link === null) return "";
    switch(typeof link){
      case 'string':
        return link;
        break;
      case 'number':
        return link.toString();
        break;
      default:
        return link.id.toString();
        break;
    }
  }

  const handleOnNodeClick = (node: NodeObject, event: MouseEvent) => {
    nodeClick(node.id.toString(), event);
  }

  const handleOnNodeDrag = (node: NodeObject, translate: { x: number, y: number }) => {
    nodeDrag(node.id.toString(), translate.x, translate.y);
  }

  const handleOnNodeDragEnd = (node: NodeObject, translate: { x: number, y: number }) => {
    nodeDragEnd(node.id.toString(), translate.x, translate.y);
  }

  const handleOnNodeHover = (node: NodeObject | null, previousNode: NodeObject | null) => {
    const idNode = castNodeToString(node);
    const idPreviousNode = castNodeToString(previousNode);
    nodeHover(idNode, idPreviousNode);
  }

  const handleOnNodeRightClick= (node: NodeObject, event: MouseEvent) => {
    nodeRightClick(node.id.toString(), event);
  }

  const handleOnLinkClick = (link: LinkObject, event: MouseEvent) => {
    const idSource = castLinkToString(link.source);
    const idTarget = castLinkToString(link.target);
    linkClick(idSource, idTarget, event);
  }

  const handleOnLinkRightClick = (link: LinkObject, event: MouseEvent) => {
    const idSource = castLinkToString(link.source);
    const idTarget = castLinkToString(link.target);
    linkRightClick(idSource, idTarget, event);
  }

  const handleOnLinkHover = (link: LinkObject | null, previousLink: LinkObject | null) => {
    const idSource = link === null ? "" : castLinkToString(link.source);
    const idTarget = link === null ? "" : castLinkToString(link.target);
    const idPreviousSource = previousLink === null ? "" : castLinkToString(previousLink.source);
    const idPreviousTarget = previousLink === null ? "" : castLinkToString(previousLink.target);
    linkHover(idSource, idTarget, idPreviousSource, idPreviousTarget);
  }

  const handleOnBackgroundClick = (event: MouseEvent) => {
    backgroundClick(event);
  }

  const handleOnBackgroundRightClick = (event: MouseEvent) => {
    backgroundRightClick(event);
  }

  return(
    <>
      <StyledGraphikle {...props}>
        <ForceGraph3D 
          height={props.height}
          width={props.width}
          ref={graphRef}
          cooldownTicks={100}
          graphData={graphData}
          nodeAutoColorBy="name"
          onNodeClick={handleOnNodeClick}
          onNodeDrag={handleOnNodeDrag}
          onNodeDragEnd={handleOnNodeDragEnd}
          onNodeHover={handleOnNodeHover}
          onNodeRightClick={handleOnNodeRightClick}

          onLinkClick={handleOnLinkClick}
          onLinkHover={handleOnLinkHover}
          onLinkRightClick={handleOnLinkRightClick}
          
          onBackgroundClick={handleOnBackgroundClick}
          onBackgroundRightClick={handleOnBackgroundRightClick}
          />
      </StyledGraphikle>
    </>
  );
};

export default Graphikle;
