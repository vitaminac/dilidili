const generateCSSTag = (source) => `<link href="${source}" rel="stylesheet">`;
const generateScriptTag = (source) => `<script type="text/javascript" src="${source}"></script>`;

export default function (templateParams) {
    return `
    ${/*<title>${templateParams.htmlWebpackPlugin.options.title}</title>*/""}
    ${templateParams.htmlWebpackPlugin.files.webpackManifest}
    ${templateParams.htmlWebpackPlugin.files.css.map((source) => generateCSSTag(source)).join("")}
    ${templateParams.htmlWebpackPlugin.files.js.map((source) => generateScriptTag(source)).join("")}
    ${/*JSON.stringify(templateParams.htmlWebpackPlugin),JSON.stringify(templateParams.htmlWebpackPlugin.options)*/""}
`;
}
