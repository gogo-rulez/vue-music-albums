module.exports = {
    presets: [
        [
            '@vue/cli-plugin-babel/preset',
            {
                polyfills: [
                    'es.array.find',
                    'es.promise',
                    'es.promise.all-settled'
                ]
            }

        ]
    ],
};
