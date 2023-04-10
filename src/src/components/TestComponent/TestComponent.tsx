import React, { FC } from 'react'
import styled from 'styled-components';

import { TestComponentProps } from "./TestComponent.types"

const StyledSpan = styled.span<TestComponentProps>`
    height: ${props => props.height};
    width: ${props => props.width};
    background-color: ${props => props.backgroundColor};
    border-radius: ${props => props.borderRadiusPercent};
    display: inline-block;
    opacity: ${props => props.disabled ? 0.2 : 1};
    &:hover {
      background-color: ${props => props.primary ? props.hoverBackgroundColor : props => props.backgroundColor};
    }
    &:active {
        border: solid 2px #1b116e;
    }
`;

const TestComponent: React.FC<TestComponentProps> = ({ ...props }) => {
    return(
        <StyledSpan id={props.id} {...props}/>
    );
};

export default TestComponent;