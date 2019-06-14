module.exports = (ctx) => ({
    "exec": true,
    "parser": console.log(ctx) && ctx.file.extname === ".sss" ? "sugarss" : "postcss-scss",
    "syntax": "postcss-scss",
    "sourceMap": true,
    plugins: {
        "postcss-import": {},
        "postcss-cssnext": {},
        "cssnano": {},
        "postcss-flexbugs-fixes": {}
    }
});
