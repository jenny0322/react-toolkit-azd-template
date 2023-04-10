export interface Node {
    id: string;
    name: string;
}

export interface Document {
    frequency: number;
    title: string;
}

export interface Link {
    source: string;
    target: string;
    weight: number;
    documents: Document[];
}

export interface IGraphData {
    nodes: Node[];
    links: Link[];
}