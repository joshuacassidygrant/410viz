export default class GraphNode {
  public id: number
  public label: string
  public type: "repo" | "user"
  public title: string

  constructor(id: number, label: string, type: "repo" | "user", title: string) {
    this.id = id
    this.label = label
    this.type = type
    this.title = title
  }
}
