const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    "@primary-color": "#FF8F00",
                    "@link-color": "#FF8F00",
                    "@menu-highlight-color": "#FFFFFF",
                    "@btn-primary-bg": "#FF8F00",
                }
            }
        }
    ]
};