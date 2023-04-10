import {  MouseEventHandler } from "react"
export interface TestComponentProps {
    id: string,
    height?: number,
    width?: number,
    backgroundColor?: string,
    hoverBackgroundColor?: string,
    borderRadiusPercent?: number,
    primary?:boolean,
    disabled?: boolean,
    onClick?: MouseEventHandler<HTMLButtonElement>
}