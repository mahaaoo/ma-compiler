import { NodeTypes, RootNode, ChildNode } from "./parser";

interface VisitorOptions {
  enter: (node: RootNode | ChildNode, parent: RootNode | ChildNode | undefined) => void;
  exit: (node: RootNode | ChildNode, parent: RootNode | ChildNode | undefined) => void;
}

export interface Visitor {
  Root?: VisitorOptions;
  CallExpression?: VisitorOptions;
  Number?: VisitorOptions;
}

export function traverser(ast: RootNode, visitor: Visitor) {

  function traverserArray(array: ChildNode[], parent?: RootNode | ChildNode) {
    array.forEach(node => {
      traverserNode(node, parent);
    });
  }


  function traverserNode(node: ChildNode | RootNode, parent?: RootNode | ChildNode) {
    const visitorObj = visitor[node.type];
    // enter
    if (visitorObj) {
      visitorObj.enter(node, parent);
    }


    if (node.type === NodeTypes.Number) {
      console.log("numbner", node);
    } else if (node.type === NodeTypes.CallExpression) {
      traverserArray(node.params, node)
    } else if (node.type === NodeTypes.Root) {
      traverserArray(node.body, node);
    }


    // exit
    if (visitorObj) {
      visitorObj.exit(node, parent);
    }
  }

  traverserNode(ast)
};