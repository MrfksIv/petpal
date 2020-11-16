module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                    javascriptEnabled: true
                },
                files: {
                    "src/themes/theme-1.css": "src/themes/custom-theme-1.less" // destination file and source file
                }
            }
        },
        watch: {
            styles: {
                files: ['src/themes/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
};
