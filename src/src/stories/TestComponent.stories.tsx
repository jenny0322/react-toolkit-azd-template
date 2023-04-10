import React from "react"
import type { Story } from "@ladle/react";
import TestComponent from "../components/TestComponent/TestComponent";
import { TestComponentProps } from "../components/TestComponent/TestComponent.types";

export const Controls: Story<TestComponentProps> = ({ id, height, width, backgroundColor, hoverBackgroundColor, borderRadiusPercent, primary, disabled }) => (
    <>
        <p>id: {id}</p>
        <p>height: {height}</p>
        <p>width: {width}</p>
        <p>backgroundColor: {backgroundColor}</p>
        <p>hoverBackgroundColor: {hoverBackgroundColor}</p>
        <p>borderRadiusPercent: {borderRadiusPercent}</p>
        <p>primary: {primary ? "yes": "no" }</p>
        <p>disabled: {disabled ? "yes": "no"}</p>
        <TestComponent id={id} height={height} width={width} backgroundColor={backgroundColor} hoverBackgroundColor={hoverBackgroundColor} borderRadiusPercent={borderRadiusPercent} primary={primary} disabled={disabled}></TestComponent>
    </>
  );

Controls.args = {
    id:'CircleControl',
    primary:true,
    disabled:false,
    borderRadiusPercent: '50%'
};

Controls.argTypes = {
    height: {
        options: [ '100px', '200px', '300px', '400px', '500px', '600px', '700px', '800px'],
        control: { type: "select" },
        defaultValue: '200px'
    },
    width: {
        options: [ '100px', '200px', '300px', '400px', '500px', '600px', '700px', '800px'],
        control: { type: "select" },
        defaultValue: '200px'
    },
    backgroundColor: {
        options: [ 'red', 'green', 'blue', 'yellow', 'cyan', 'black', 'white', 'grey'],
        control: { type: "select" },
        defaultValue: 'green'
    },
    hoverBackgroundColor: {
        options:  [ 'red', 'green', 'blue', 'yellow', 'cyan', 'black', 'white', 'grey'],
        control: { type: "select" },
        defaultValue: 'red'
    }
};

