export default class GraphEdge {
    public from: number;
    public to: number;
    public type: "friend"|"contributor";

    constructor(from: number, to: number, type: "friend"|"contributor") {
        this.from = from;
        this.to = to;
        this.type = type;
    }
}