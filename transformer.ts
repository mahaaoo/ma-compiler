import { NodeTypes, RootNode } from "./parser";
import { traverser } from "./traverser";

export function transformer(ast: RootNode) {
  const newAst = {
    type: NodeTypes.Root,
    body: [],
  }

  ast.context = newAst.body;

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type === NodeTypes.CallExpression) {
          let expression = {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: node.name,
            },
            arguments: [],
          }

          node.context = expression.arguments;

          if (parent.type !== NodeTypes.CallExpression) {
            expression = {
              type: 'ExpressionStatement',
              expression,
            }
          }

          parent?.context.push(expression)
        }
      }
    },
    Number: {
      enter(node, parent) {
        if (node.type === NodeTypes.Number) {
          const numberNode = {
            type: "NumberLiteral",
            value: node.value,
          }

          parent?.context.push(numberNode);
        }
      }
    }
  })

  return newAst;
}