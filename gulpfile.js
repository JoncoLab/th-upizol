'use strict';

var gulp = require("gulp"),
    autoPrefix = require("gulp-autoprefixer"),
    cssComb = require("gulp-csscomb"),
    image = require("gulp-image"),
    compileSass = require("gulp-sass"),
    rigger = require("gulp-rigger"),
    rimraf = require("rimraf");

var path = {
    
    src: {
        html: 'src/*.html',
        css: 'src/styles/*.scss',
        img: 'src/images/*.png',
        docs: 'src/docs/*',
        svg: 'src/svg/*.svg',
        js: 'src/scripts/*.js'
    },
    
    build: {
        html: 'build/',
        css: 'build/styles/',
        img: 'build/images/',
        docs: 'build/docs/',
        svg: 'build/svg/',
        js: 'build/scripts/'
    },
    
    watch: {
        pages: 'src/*.html',
        scripts: 'src/scripts/*.js',
        styles: 'src/styles/*.scss',
        images: [
            'src/images/*.png',
            'src/svg/*.svg'
        ]
    },
    
    clean: 'build*'
};

//Збірка html
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

//Збірка JS
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js));
});

//Збірка документів
gulp.task('docs:build', function () {
    gulp.src(path.src.docs + '.png')
        .pipe(image())
        .pipe(gulp.dest(path.build.docs));
    gulp.src(path.src.docs + '.pdf')
        .pipe(gulp.dest(path.build.docs));
});

//Збірка СSS
gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(compileSass().on('error', compileSass.logError))
        .pipe(cssComb())
        .pipe(autoPrefix({
            'browsers': ['last 20 versions', '> 50%']
        }))
        .pipe(gulp.dest(path.build.css));
});

//Збірка картинок
gulp.task('img:build', function () {
    gulp.src(path.src.img)
        .pipe(image())
        .pipe(gulp.dest(path.build.img));
});

gulp.task('svg:build', function () {
    gulp.src(path.src.svg)
        .pipe(gulp.dest(path.build.svg));
});

//Загальна збірка
gulp.task('project:build', [
    'html:build',
    'js:build',
    'css:build',
    'img:build',
    'svg:build',
    'docs:build'
]);

gulp.task('watch', function () {
    gulp.watch(path.watch.pages, ['html:build']);
    gulp.watch(path.watch.styles, ['css:build']);
    gulp.watch(path.watch.scripts, ['js:build']);
    gulp.watch(path.watch.images, [
        'img:build',
        'svg:build'
    ]);
});

//Очистка
gulp.task('clean', function (callback) {
    rimraf(path.clean, callback);
});

//Запуск роботи з проектом
gulp.task('default', ['project:build', 'watch']);