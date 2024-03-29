const { createGlobPatternsForDependencies } = require("@nrwl/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [join(__dirname, "**/*!(*.stories|*.spec).{ts,tsx,html}"), ...createGlobPatternsForDependencies(__dirname)],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
    mode: "jit",
};
