module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    plugins: [],
    // add your custom rules here
    rules: {
        indent: ['error', 4],
        curly: 0,
        'no-console': 0,
        'vue/html-indent': 0
    }
}
