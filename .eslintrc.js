module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        "plugin:@typescript-eslint/recommended"
    ],
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        "indent": ["off"],
        "prefer-const": ["off"],
        "no-use-before-define": ["off"],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "eol-last": ["error", "never"],
        "comma-dangle": ["error", "never"],
        "@typescript-eslint/ban-ts-ignore": ["off"],
        "@typescript-eslint/ban-ts-comment": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/no-unused-vars": ["off"],
        "@typescript-eslint/no-use-before-define": ["error"],
        "@typescript-eslint/no-inferrable-types": ["off"],
        "@typescript-eslint/no-empty-interface": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/member-delimiter-style": ["off"],
        "@typescript-eslint/type-annotation-spacing": [2, {
            "before": false,
            "after": false,
            "overrides": {
                "arrow": {
                    "before": true,
                    "after": true,
                },
                "colon": {
                    "before": false,
                    "after": false,
                }
            }
        }]
    }
};
