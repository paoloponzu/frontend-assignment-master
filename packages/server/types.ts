export interface Edge<A> {
  cursor: string
  node: A
}

export interface PageInfo {
  endCursor?: string
  hasNextPage: boolean,
  count: number
}

export interface Connection<A> {
  edges: Array<Edge<A>>
  pageInfo: PageInfo
}