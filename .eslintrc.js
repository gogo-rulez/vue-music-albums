module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        // Only allow debugger in development
        'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
        // Only allow `console.log` in development
        'no-console': process.env.PRE_COMMIT ? ['error', { allow: ['warn', 'error'] }] : 'off',
        'arrow-parens': ['error', 'as-needed'],
        'indent': ['error', 4, { 'ignoredNodes': ['TemplateLiteral'] }],
        'no-multiple-empty-lines': ['error', { 'max': 3 }],
        'no-multi-spaces': ['error', { ignoreEOLComments: true, exceptions: { Property: true, ImportDeclaration: true, VariableDeclarator: true } }],
        'key-spacing': [0, { mode: 'minimum', align: 'value' }],
        'quote-props': ['error', 'consistent'],
        'comma-dangle': ['error', 'only-multiline'],
        'no-param-reassign': [0],
        'padded-blocks': [0],
        'max-len': [0],
        'semi': [2, 'always'],
        'linebreak-style': 0,
        'no-shadow': [0],
        'no-plusplus': [0],
        'space-before-function-paren': ['error', 'always'],
        'func-call-spacing': [0, 'never'],
        'no-spaced-func': [0],
        'import/prefer-default-export': [0],
        'import/extensions': [0],
        'consistent-return': [0],
        'import/no-cycle': [0],
        'arrow-body-style': ['error', 'as-needed'],
        'no-underscore-dangle': [0],
        'template-curly-spacing': ['off'],
        'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
        'array-callback-return': ['error', { 'allowImplicit': true }],
        'prefer-destructuring': ['error', { 'object': true, 'array': false }],
        'vue/max-attributes-per-line': 1,
        'vue/no-confusing-v-for-v-if': 'off',
        'vue/no-v-html': 'off',
        'vue/multiline-html-element-content-newline': ['error', { 'allowEmptyLines': true }],
        'vue/html-indent': ['error', 4]
    },
};
