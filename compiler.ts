import { codegen } from "./codegen";
import { parser } from "./parser";
import { tokenizer } from "./tokenizer";
import { transformer } from "./transformer";

export function compiler(code) {
  const tokens = tokenizer(code);
  const ast = parser(tokens);
  const transformed = transformer(ast);
  
  return codegen(transformed);
}