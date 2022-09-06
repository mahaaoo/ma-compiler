import {Token, TokenTypes} from './tokenizer';

export enum NodeTypes {
  Root,
  Number,
  CallExpression,
}

export interface Node {
  type: NodeTypes,
}

type ChildNode = NumberNode | CallExpressionNode;

export interface RootNode extends Node {
  body: ChildNode[];
}

export interface NumberNode extends Node {
  value: string;
}

export interface CallExpressionNode extends Node {
  name: string;
  params: ChildNode[];
}

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Root,
    body: [],
  }
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.Number,
    value: value,
  }
}

function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name: name,
    params: [],
  }
}

export function parser(tokens: Token[]) {
  let current = 0;
  const rootNode = createRootNode();

  function work() {
    let token = tokens[current];
    if (token.type === TokenTypes.Number) {
      current++;
      return createNumberNode(token.value)
    }
  
    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[++current];
  
      const node = createCallExpressionNode(token.value);
  
      token = tokens[++current];
      while (!(token.type === TokenTypes.Paren && token.value === ')')) {
        node.params.push(work());
        token = tokens[current];
      }

      current++;
      return node;
    }

    throw new Error("unknown token type: " + token);
  }


  while(current < tokens.length) {
    rootNode.body.push(work());
  }

  return rootNode;
}