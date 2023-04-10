import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import autoExternal from 'rollup-plugin-auto-external';
import visualizer from 'rollup-plugin-visualizer';
import dts from "rollup-plugin-dts";

const directImports = {
    Graphikle: 'src/components/Graphikle/index.ts',
    TestComponent: 'src/components/TestComponent/index.ts'
}

const commonPlugins = [
    nodeResolve(),
    typescript({ tsconfigOverride: { compilerOptions: { declaration: false } }}),
    autoExternal(),
    commonjs(),
    json()
    
]

export default [
    {
        input: { ...directImports },
        output: {
            dir: 'dist',
            format: 'esm',
            sourcemap: true,
        },
        plugins: [
           ...commonPlugins,
           visualizer({filename: 'build_artifacts/esm_stats.html'}) // Generate esm bundle stats
        ],
        external: ["react", "react-dom", "styled-components", "react-force-graph-3d", "axios"]
    },
    {
        input: { ...directImports },
        output: { dir: 'dist', format: 'esm' },
        plugins: [ 
            ...commonPlugins,
            dts(),
        ],
    },
    
];