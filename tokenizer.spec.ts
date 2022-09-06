import { test, expect } from "vitest";
import { tokenizer, TokenTypes } from "./tokenizer";

test("tokenizer1", () => {
  const input  = '(';
  const tokens = [
    { type: TokenTypes.Paren,  value: '('        },
  ];

  
  expect(tokenizer(input)).toEqual(tokens);
});

test("tokenizer2", () => {
  const input  = 'add';
  const tokens = [
    { type: TokenTypes.Name,  value: 'add'        },
  ];

  
  expect(tokenizer(input)).toEqual(tokens);
});

test("tokenizer3", () => {
  const input  = '22';
  const tokens = [
    { type: TokenTypes.Number,  value: '22'        },
  ];

  
  expect(tokenizer(input)).toEqual(tokens);
});

test("tokenizer4", () => {
  const input  = ')';
  const tokens = [
    { type: TokenTypes.Paren,  value: ')'        },
  ];

  
  expect(tokenizer(input)).toEqual(tokens);
});

test("tokenizer5", () => {
  const input  = '(add 1 2)';
  const tokens = [
    { type: TokenTypes.Paren,  value: '('        },
    { type: TokenTypes.Name,   value: 'add'      },
    { type: TokenTypes.Number, value: '1'        },
    { type: TokenTypes.Number, value: '2'        },
    { type: TokenTypes.Paren,  value: ')'        },
  ];

  
  expect(tokenizer(input)).toEqual(tokens);
});

test("tokenizer", () => {
  const input  = '(add 2 (subtract 4 2))';
  const tokens = [
    { type: TokenTypes.Paren,  value: '('        },
    { type: TokenTypes.Name,   value: 'add'      },
    { type: TokenTypes.Number, value: '2'        },
    { type: TokenTypes.Paren,  value: '('        },
    { type: TokenTypes.Name,   value: 'subtract' },
    { type: TokenTypes.Number, value: '4'        },
    { type: TokenTypes.Number, value: '2'        },
    { type: TokenTypes.Paren,  value: ')'        },
    { type: TokenTypes.Paren,  value: ')'        }
  ];

  
  expect(tokenizer(input)).toEqual(tokens);
});