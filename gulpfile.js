/**
 *
 * @authors YoukeWJP (wjp@youkeonline.cn)
 * @date    2016-06-30 17:56:12
 * @version 1.0.0
 */

'use strict';
var gulp = require('gulp');
var debug = require('gulp-debug');                  //调试
var clean = require('gulp-clean');                  //删除文件夹
var imagemin = require('gulp-imagemin');            //压缩图片
var base64 = require('gulp-base64');                //图片转换为base64格式
var uglify = require('gulp-uglify');                //压缩JS文件
var cleanCss = require('gulp-clean-css');           //压缩CSS文件
var htmlmin = require('gulp-htmlmin');              //压缩HTML文件
var sequence = require('gulp-sequence');            //按顺序执行task
var rev = require('gulp-rev');                      //给文件加上MD5后缀
var revCollector = require('gulp-rev-collector');   //路径替换
var cssSpriter = require('gulp-css-spriter');       //制作雪碧图并替换CSS
var autoprefixer = require('gulp-autoprefixer');    //给CSS增加前缀

var zip = require('gulp-zip');                      //压缩成ZIP文件
var fs = require('fs');
var crypto = require('crypto');
var md5sum = crypto.createHash('md5');

var debugMsg = 'youkeonline:';                      //调试信息

var colors = require('colors');                     //控制台颜色
var log = console.log,
    warn = function (s) {
        log(s.yellow);
    },
    error = function (s) {
        log(s.red);
    },
    success = function (s) {
        log(s.green);
    };

var paths = {
    images: [
        'images/**/*.*'
    ],
    js: [
        'js/youke/*.js',
        'js/widget/*.js',
        'page/**/*.js',
        '!page/common/*.js'
    ],
    'js-third': 'js/third-party/*.js',
    fonts: 'fonts/*.+(eot|svg|ttf|woff)',
    css: '+(css|page)/**/*.css',
    config: 'js/config/*.js',
    common: 'page/common/*.js',
    pageHTML: 'page/**/*.html',
    dest: '../build/',
    rev: 'rev/'
};

//删除文件夹
gulp.task('clean', function () {
    return gulp.src(paths.dest, {read: false})
        .pipe(debug({title: debugMsg}))
        .pipe(clean({force: true}));
});

//字体复制
gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(debug({title: debugMsg}))
        .pipe(gulp.dest(function(file){
            var base = file.base,
                cwd = file.cwd;
            if(base.indexOf(cwd) === -1){
                return paths.dest + base;
            }
            return paths.dest + base.substring(cwd.length + 1);
        }));
});

//给CSS增加前缀
gulp.task('autoprefixer', function(){
    return gulp.src(paths.css)
        .pipe(debug({title: debugMsg}))
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'ie >= 9'],
            cascade: false
        }))
        .pipe(gulp.dest(function(file){
            var base = file.base,
                cwd = file.cwd;
            if(base.indexOf(cwd) === -1){
                return base;
            }
            return base.substring(cwd.length + 1);
        }));
});

//制作雪碧图并替换CSS
gulp.task('css-sprite', function () {
    gulp.src('css/*.css')
        .pipe(debug({title: debugMsg}))
        .pipe(cssSpriter({
            'spriteSheet': './images/sprite/spritecss.png',
            'pathToSpriteSheetFromCSS': '../images/sprite/spritecss.png',
            'spritesmithOptions': {
                padding: 10,
                algorithm: 'binary-tree'
            }
        }))
        .pipe(gulp.dest('css/'));
    return gulp.src('page/**/*.css')
        .pipe(debug({title: debugMsg}))
        .pipe(cssSpriter({
            'spriteSheet': './images/sprite/spritepage.png',
            'pathToSpriteSheetFromCSS': '../../images/sprite/spritepage.png',
            'spritesmithOptions': {
                padding: 10,
                algorithm: 'binary-tree'
            }
        }))
        .pipe(gulp.dest('page/'));
});

//压缩图片并加上MD5值
gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(debug({title: debugMsg}))
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest(function(file){
            var base = file.base,
                cwd = file.cwd;
            if(base.indexOf(cwd) === -1){
                return paths.dest + base;
            }
            return paths.dest + base.substring(cwd.length + 1);
        }))
        .pipe(rev.manifest('images-rev-manifest.json'))      //- 生成一个images-rev-manifest.json
        .pipe(gulp.dest(paths.dest + paths.rev));           //- 将images-rev-manifest.json保存到目录rev下;
});

//css后缀加上MD5值
gulp.task('css', function () {
    return gulp.src([paths.dest + paths.rev + '*-rev-manifest.json', paths.css])   //- 读取rev-manifest.json文件以及需要进行js/css名替换的文件
        .pipe(debug({title: debugMsg}))
        .pipe(base64({//小图片进行base64编码
            // debug: true,
            extensions: ['png', 'jpg', 'ico', 'gif'],
            maxImageSize: 5 * 1024 // bytes
        }))
        .pipe(revCollector())
        .pipe(cleanCss())
        .pipe(rev())
        .pipe(gulp.dest(function(file){
            var base = file.base,
                cwd = file.cwd;
            if(base.indexOf(cwd) === -1){
                return paths.dest + base;
            }
            return paths.dest + base.substring(cwd.length + 1);
        }))
        .pipe(rev.manifest('css-rev-manifest.json'))
        .pipe(gulp.dest(paths.dest + paths.rev));
});

//第三方JS文件只是复制，不做其他处理
gulp.task('js-third', function() {
    return gulp.src(paths['js-third'])
        .pipe(debug({title: debugMsg}))
        .pipe(gulp.dest(function(file){
            var base = file.base,
                cwd = file.cwd;
            if(base.indexOf(cwd) === -1){
                return paths.dest + base;
            }
            return paths.dest + base.substring(cwd.length + 1);
        }));
});

//js后缀加上MD5值
gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(debug({title: debugMsg}))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(function(file){
            var base = file.base,
                cwd = file.cwd;
            if(base.indexOf(cwd) === -1){
                return paths.dest + base;
            }
            return paths.dest + base.substring(cwd.length + 1);
        }))
        .pipe(rev.manifest('js-rev-manifest.json'))      //- 生成一个js-rev-manifest.json
        .pipe(gulp.dest(paths.dest + paths.rev));           //- 将js-rev-manifest.json保存到目录rev下
});

//先执行config.js中的文件替换，然后计算MD5值，以便给文件script.js替换
gulp.task('rev-config', function() {
    return gulp.src([paths.dest + paths.rev + '*-rev-manifest.json', paths.config])   //- 读取rev-manifest.json文件以及需要进行js/css名替换的文件
        .pipe(debug({title: debugMsg}))
        .pipe(revCollector())         //- 执行文件内文件名的替换
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(function(file){
            var base = file.base,
                cwd = file.cwd;
            if(base.indexOf(cwd) === -1){
                return paths.dest + base;
            }
            return paths.dest + base.substring(cwd.length + 1);
        }))
        .pipe(rev.manifest('config-rev-manifest.json'))
        .pipe(gulp.dest(paths.dest + paths.rev));
});

//先执行公共文件中的js替换，然后计算MD5值，以便给html文件替换
gulp.task('rev-common', function() {
    return gulp.src([paths.dest + paths.rev + '*-rev-manifest.json', paths.common])   //- 读取rev-manifest.json文件以及需要进行js/css名替换的文件
        .pipe(debug({title: debugMsg}))
        .pipe(revCollector())         //- 执行文件内文件名的替换
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(function(file){
            var base = file.base,
                cwd = file.cwd;
            if(base.indexOf(cwd) === -1){
                return paths.dest + base;
            }
            return paths.dest + base.substring(cwd.length + 1);
        }))
        .pipe(rev.manifest('common-rev-manifest.json'))
        .pipe(gulp.dest(paths.dest + paths.rev));
});

//执行html文件中的js/css替换
gulp.task('rev-pageHTML', function() {
    return gulp.src([paths.dest + paths.rev + '*-rev-manifest.json', paths.pageHTML])     //- 读取rev-manifest.json 文件以及需要进行js/css名替换的文件
        .pipe(debug({title: debugMsg}))
        .pipe(revCollector())    //- 执行文件内文件名的替换
        .pipe(htmlmin({
            removeComments: true, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
            removeScriptTypeAttributes: true //删除<script>的type="text/javascript"
        }))
        .pipe(gulp.dest(function(file){
            var base = file.base,
                cwd = file.cwd;
            if(base.indexOf(cwd) === -1){
                return paths.dest + base;
            }
            return paths.dest + base.substring(cwd.length + 1);
        }));
});

//删除多余的文件
gulp.task('clean-other', function(){
    return gulp.src(['images/sprite', paths.dest + paths.rev, paths.dest + 'images/!(sprite)'], {read: false})
        .pipe(debug({title: debugMsg}))
        .pipe(clean({force: true}));
});

//压缩dest文件夹为zip文件并计算md5值
gulp.task('zip', function(){
    var zipfilename = 'static.zip';
    return gulp.src(paths.dest + '**/*')
        .pipe(debug({title: debugMsg}))
        .pipe(zip(zipfilename))
        .pipe(gulp.dest(paths.dest))
        .on('end', function(){
            var stream = fs.createReadStream(paths.dest + zipfilename);
            stream.on('data', function(chunk) {
                md5sum.update(chunk);
            });
            stream.on('end', function() {
                success(zipfilename + ' --md5--> ' + md5sum.digest('hex').toUpperCase());
            });
        });
});

//默认任务
gulp.task('default', sequence('clean', 'fonts', 'autoprefixer', 'css-sprite', 'images', 'css', 'js-third', 'js', 'rev-config', 'rev-common', 'rev-pageHTML', 'clean-other', 'zip'));

//任务监控
gulp.task('watch', function() {
    gulp.watch(paths.fonts, ['fonts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.js, ['js']);
});