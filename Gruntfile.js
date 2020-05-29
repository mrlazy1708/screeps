module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'mrlazy1708@gmail.com',
                password: 'kyhbi6-qogtud-fuMcub',
                branch: 'default',
                ptr: false
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '/',
                        src: ['**/*.{js,wasm}'],
                        flatten: true
                    }
                ]
            }
        }
    });
}