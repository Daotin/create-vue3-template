/**
 * 
- `Level` ：为0，1，2三个数的其中一值。0代表让本规则无效；1代表以警告提示，不影响编译运行；2代表以错误提示，阻止编译运行。以上面的例子则代表该规则不会起作用。
- `Applicable`**：**第二位为应用与否，为always和never其中一值。
- `Value`：适用于该规则的值。
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // case可选值
    // 'lower-case' 小写 lowercase
    // 'upper-case' 大写 UPPERCASE
    // 'camel-case' 小驼峰 camelCase
    // 'kebab-case' 短横线 kebab-case
    // 'pascal-case' 大驼峰 PascalCase
    // 'sentence-case' 首字母大写 Sentence case
    // 'snake-case' 下划线 snake_case
    // 'start-case' 所有首字母大写 start-case
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "ui",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ], // type的类型只能从中取值
    "type-case": [2, "always", "lower-case"], // <type>格式小写
    "type-empty": [2, "never"], // <type> 不能为空
    "type-min-length": [0, "always", 0],
    "type-max-length": [0, "always", Infinity],

    "scope-enum": [0, "always", []],
    "scope-case": [0, "always", "lower-case"], // <scope> 格式 小写
    "scope-empty": [2, "never"], // <scope>为空
    "scope-min-length": [0, "always", 0],
    "scope-max-length": [0, "always", Infinity],

    "subject-case": [0, "always", "lower-case"],
    "subject-empty": [2, "never"], // <subject> 不能为空 (默认)
    "subject-full-stop": [0, "always", "."], // <subject> 以.为结束标志
    "subject-min-length": [0, "always", 0],
    "subject-max-length": [0, "always", Infinity],
    "subject-exclamation-mark": [0, "always"], // 在:前有感叹号

    "header-case": [0, "always", "lower-case"],
    "header-full-stop": [0, "always", "."],
    "header-min-length": [0, "always", 0],
    "header-max-length": [0, "always", Infinity],

    "body-case": [0, "always", "lower-case"],
    "body-leading-blank": [2, "always"], // body前导空行
    "body-empty": [0, "never"], // body为空
    "body-min-length": [0, "always", 0],
    "body-max-length": [0, "always", Infinity],
    "body-max-line-length": [0, "always", Infinity],

    "footer-leading-blank": [2, "always"], // <footer> 前导空行
    "footer-empty": [0, "never"],
    "footer-min-length": [0, "always", 0],
    "footer-max-length": [0, "always", Infinity],
    "footer-max-line-length": [0, "always", Infinity],

    "references-empty": [0, "never"], // 参考至少有一个
    "signed-off-by": [0, "always", "Signed-off-by:"], // message中含有value
    "trailer-exists": [0, "always", "Signed-off-by:"], // message尾部含有value
  },
};
