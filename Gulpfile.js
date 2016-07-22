"use strict";
const gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    ff = require('gulp-connect-multi')(),
    safari = require('gulp-connect-multi')(),
    connect = require('gulp-connect-multi')(),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    merge = require('merge-stream'),
    fs = require('fs'),
    path = require('path'),
    del = require('del'),
    removeCode = require('gulp-remove-code'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    sassLint = require('gulp-sass-lint'),
    cache = require('gulp-cache'),
    zip = require('gulp-zip'),
    merge2 = require('merge2'),
    runSequence = require('run-sequence'),
    chalk = require('chalk'),
    shell = require('gulp-shell'),
    filter = require('gulp-filter'),
    vinylPaths = require('vinyl-paths'),
    autoprefixer = require('gulp-autoprefixer'),
    data = require('./sizes.json'),
    src = 'src',
    folders = getFolders(src);

const appRoot = process.cwd();
const sizesFile = fs.readFileSync(`${appRoot}/sizes.json`, `utf8`);
var sizes = JSON.parse(sizesFile);
var Celtra = sizes.Celtra;
var DoubleClick = sizes.DoubleClick;
var Dynamic = sizes.Dynamic;
var Master = sizes.Master;
var Static = sizes.Static;

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

function checkSettingsAndRun(setting, execute, usingPath) {
    if (setting) {
        execute(usingPath);
    }
}

function isStatic(ad) {
    if (ad === 'static' && Master && Static && !DoubleClick && !Celtra ||
        ad === 'static' && !Master && Static) return true;
}

//loop through the folders to get to the right sub-directories and apply their custom copy tasks to them
var sizeFolder;

function getSubDirectories(fileType, copyFunc, type) {
    return folders.map(function(sizeFolder) {
        var ad;
        if ("static" === type) {
            ad = 'static';
            var srcSizeAd = `${src}/${sizeFolder}/${ad}`;
            var typeFolder = getFolders(srcSizeAd); // Static or Dynamic
            return typeFolder.map(function(versionFolder) {
                var srcSizeAdVersion = `${src}/${sizeFolder}/${ad}/${versionFolder}`;
                var dest = `prod/${ad}/${sizeFolder}-${versionFolder}`;
                var source = fileType === 'scss' ? [`${srcSizeAdVersion}/*.${fileType}`, `!src/*.scss`] :
                    fileType === 'html' ? `${srcSizeAdVersion}/*.${fileType}` :
                    fileType === 'img' ? [
                        `${srcSizeAdVersion}/**/*`,
                        `!${srcSizeAdVersion}/*.js`,
                        `!${srcSizeAdVersion}/*.html`,
                        `!${srcSizeAdVersion}/*.scss`
                    ] :
                    fileType === 'js' ? [
                        `${src}/${sizeFolder}/*.${fileType}`,
                        `${srcSizeAd}/*.${fileType}`,
                        `${srcSizeAdVersion}/*.${fileType}`
                    ] :
                    false;
                return copyFunc(source, dest, path);
            });

        } else {
            ad = type;
            var dest = `prod/${ad}/${sizeFolder}`;
            var source =
                fileType === 'js' ? [path.join(src, sizeFolder, '/**/' + ad + '.js'),
                    path.join(src, sizeFolder, '/**/main.js')
                ] :
                fileType === 'img' ? [path.join(src, sizeFolder, ad, '/**/img/*'),
                    path.join(src, sizeFolder, ad, '/**/img/*')
                ] :
                fileType === 'scss' ? [`${src}/${sizeFolder}/${ad}/*.scss`, `!${src}/*.scss`] :
                fileType === 'html' ?
                `${src}/${sizeFolder}/${ad}/*.html` :
                false;
            return copyFunc(source, dest);
        }
    });
}

// Convert scss to css, minimise and copy into appropriate production folders
gulp.task('sass', () => {

    var copyAndPipe = (gulpSrc, gulpDest) => {
        return gulp.src(gulpSrc)
            .pipe(autoprefixer({
                browsers: ['IE >= 10', 'last 2 Firefox versions', 'Safari >= 6', 'last 2 Chrome versions']
            }))
            .pipe(sassLint())
            .pipe(sassLint.format())
            .pipe(sassLint.failOnError())
            .pipe(sourcemaps.init())
            .pipe(sass({
                includePaths: ['src']
            }).on('error', sass.logError))
            .pipe(cleanCSS())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(gulpDest));
    };


    var runSass = (ad_type) => {
        return getSubDirectories('scss', copyAndPipe, ad_type);
    };

    checkSettingsAndRun(Static, runSass, 'static');
    checkSettingsAndRun(Celtra, runSass, 'celtra');
    checkSettingsAndRun(DoubleClick, runSass, 'doubleclick');
});


// Minimise html files and copy into appropriate folders.
// Also remove enabler script tag for GDN versions.
gulp.task('html', () => {

    var copyAndPipe = (gulpSrc, gulpDest, Static) => {
        return Static ?
            gulp.src(gulpSrc)
            .pipe(removeCode({
                Static: true
            }))
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest(gulpDest)) :

            gulp.src(gulpSrc)
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest(gulpDest));
    };

    var runHtml = (ad_type) => {
      return getSubDirectories('html', copyAndPipe, ad_type);
    };

    checkSettingsAndRun(Static, runHtml, 'static');
    checkSettingsAndRun(Celtra, runHtml, 'celtra');
    checkSettingsAndRun(DoubleClick, runHtml, 'doubleclick');
});


// Combine various javascript files and minimise them before copying into relevant production folders.
gulp.task('scripts', () => {

    var copyAndPipe = (gulpSrc, gulpDest) => {
        return gulp.src(gulpSrc)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(sourcemaps.init())
            .pipe(concat(sizeFolder + '.js'))
            .pipe(uglify())
            .pipe(rename('ad.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(gulpDest));
    };

    var runJS = (ad_type) => {
        return getSubDirectories('js', copyAndPipe, ad_type);
    };

    checkSettingsAndRun(Static, runJS, 'static');
    checkSettingsAndRun(Celtra, runJS, 'celtra');
    checkSettingsAndRun(DoubleClick, runJS, 'doubleclick');
});

// Optimise and copy images across into production GDN folders
gulp.task('img', () => {

    var copyAndPipe = (gulpSrc, gulpDest) => {
        return gulp.src(gulpSrc)
            .pipe(imagemin({
                // jpg
                progressive: true,

                // gif
                interlaced: true,

                // png
                optimizationLevel: 3,

                // svg
                multipass: true
            }))
            .pipe(gulp.dest(gulpDest));
    };

    if (Master && Static && !DoubleClick && !Celtra ||
        !Master && Static) {
        getSubDirectories('img', copyAndPipe, 'static');
    }
    if (Celtra === true && DoubleClick === false && Dynamic === false) {
        getSubDirectories('img', copyAndPipe, 'celtra');
    }
    if (DoubleClick === true && Celtra === false && Dynamic === false) {
        getSubDirectories('img', copyAndPipe, 'doubleclick');
    }
});

// open in browsers
function connectOptions(browser, port, live) {
    return {
        root: ['./prod/'],
        port: port,
        livereload: {
            port: live
        },
        open: {
            browser: browser
        }
    };
}

// Setup localhost server to view production files.
gulp.task('connect', connect.server(connectOptions('Google Chrome', 8000, 35729))); //default
gulp.task('ff', ff.server(connectOptions('firefox', 1337, 35727)));
gulp.task('safari', safari.server(connectOptions('safari', 8080, 35722)));


gulp.task('clear', () => {
    cache.clearAll();
});

// Zip the static folder and zip all individual static banners
gulp.task('zip', () => {
    var folders = getFolders('prod/static');

    function applyZip(source, name) {
        return gulp.src(source)
            .pipe(zip(name + '.zip'))
            .pipe(gulp.dest('zipped-banners'));
    }
    applyZip('prod/static/**', 'static');
    for (var folder in folders) {
        console.log(folders[folder]);
        applyZip('prod/static/' + folders[folder] + '/**', folders[folder].toString());
    }
});

// Overwrite base-template files with approved Master adjustments
gulp.task('overwrite', () => {
    var sources = [
        'src/**/index.html',
        'src/**/main.js',
        'src/global.scss',
        'src/normalize.scss'
    ];
    DoubleClick === true ? sources.push('src/**/doubleclick.js') : sources.push('src/**/image-paths.js');

    function copyScripts(source) {
        //css might be specific to the size of the master banner size, so keep a copy of it when overwriting base-template files in gulp master
        var name = `${sizes.dimensions[0].width}x${sizes.dimensions[0].height}-overwrite.scss`;
        return merge2(
                gulp.src(source),
                gulp.src(`src/${sizes.dimensions[0].width}x${sizes.dimensions[0].height}/doubleclick/overwrite.scss`)
                .pipe(rename(name))
            )
            .pipe(rename(function(path) {
                path.dirname = "/";
            }))
            .pipe(gulp.dest('./base-template'));
    }

    return copyScripts(sources);
});


gulp.task('del', () => {
    return del(['src', 'prod']);
});

gulp.task('master', (callback) => {
    if (Master) {
        runSequence('overwrite', 'del', callback);
        console.info(chalk.green("'src' and 'prod' are successfully deleted. Now change 'Master' to false and run 'npm run generate' and 'gulp'"));
    } else {
        console.info(chalk.yellow("Unable to run this command as 'Master' is false"));
    }
});


// Setup watch tasks
gulp.task('watch', () => {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch(['src/**/img', 'src/**/img/*'], ['img']);
});

//gulp.task('default', ['connect', 'html', 'sass', 'img', 'scripts', 'watch', 'watch-deleted-images']);
gulp.task('default', ['connect', 'html', 'sass', 'img', 'scripts', 'watch']);
gulp.task('dev', ['html', 'sass', 'img', 'scripts']);
gulp.task('test', ['connect', 'ff', 'safari']);