import { expect, test } from "vitest";
import { NodeTypes, RootNode } from "./parser";

import { traverser, Visitor } from "./traverser";
// 遍历树
test("traverser", () => {
  const ast: RootNode = {
    type: NodeTypes.Root,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.Number,
            value: "2",
          },
          {
            type: NodeTypes.CallExpression,
            name: "subtract",
            params: [
              {
                type: NodeTypes.Number,
                value: "4",
              },
              {
                type: NodeTypes.Number,
                value: "2",
              },
            ],
          },
        ],
      },
    ],
  };

  const callCounts: Array<string | NodeTypes >[] = [];
  const visitor: Visitor = {
    Root: {
      enter(node, parent) {
        callCounts.push(["program-enter", node.type, ""]);
      },
      exit(node, parent) {
        callCounts.push(["program-exit", node.type, ""]);
      },
    },

    CallExpression: {
      enter(node, parent) {
        callCounts.push(["callExpression-enter", node.type, parent!.type]);
      },
      exit(node, parent) {
        callCounts.push(["callExpression-exit", node.type, parent!.type]);
      },
    },

    Number: {
      enter(node, parent) {
        callCounts.push(["numberLiteral-enter", node.type, parent!.type]);
      },
      exit(node, parent) {
        callCounts.push(["numberLiteral-exit", node.type, parent!.type]);
      },
    },
  };

  traverser(ast, visitor);

  expect(callCounts).toEqual([
    ["program-enter", NodeTypes.Root, ""],
    ["callExpression-enter", NodeTypes.CallExpression, NodeTypes.Root],
    ["numberLiteral-enter", NodeTypes.Number, NodeTypes.CallExpression],
    ["numberLiteral-exit", NodeTypes.Number, NodeTypes.CallExpression],
    [
      "callExpression-enter",
      NodeTypes.CallExpression,
      NodeTypes.CallExpression,
    ],
    ["numberLiteral-enter", NodeTypes.Number, NodeTypes.CallExpression],
    ["numberLiteral-exit", NodeTypes.Number, NodeTypes.CallExpression],
    ["numberLiteral-enter", NodeTypes.Number, NodeTypes.CallExpression],
    ["numberLiteral-exit", NodeTypes.Number, NodeTypes.CallExpression],
    ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.CallExpression],
    ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.Root],
    ["program-exit", NodeTypes.Root, ""],
  ]);
});
