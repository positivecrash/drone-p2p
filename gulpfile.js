//load plugins
var gulp             = require('gulp'),
    compass          = require('gulp-compass'),
    pug              = require('gulp-pug'),
    autoprefixer     = require('gulp-autoprefixer'),
    cleancss         = require('gulp-clean-css'),
    uglify           = require('gulp-uglify'),
    merge            = require('merge-stream'),
    rename           = require('gulp-rename'),
    concat           = require('gulp-concat'),

    image            = require('gulp-image'),
    
    ttf2eot          = require('gulp-ttf2eot'),
    ttf2woff         = require('gulp-ttf2woff'),

    iconfont         = require('gulp-iconfont'),
    iconfontCss      = require('gulp-iconfont-css')

    browserSync      = require('browser-sync');

var fontName = 'CustomIcons';


//styles
gulp.task('styles', function() {
	return gulp.src(['app/styles/*.scss'])
		.pipe(compass({
			// project: 'dist/assets',
			css: 'dist/assets/css',
			sass: 'app/styles/',
			image: 'dist/assets/i',
			font: 'dist/assets/fonts'
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(cleancss({
          compatibility: 'ie8'
        }))
		.pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

//scripts
gulp.task('scripts', function() {
	return gulp.src(['app/scripts/inc/*.js', 'app/scripts/app.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/assets/js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream:true}));
});

//templates
gulp.task('templates', function() {
  return gulp.src('app/pages/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream:true}));
});

//iconfonts
gulp.task('iconfont', function(){
  gulp.src(['app/fonticons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      fontPath: '../fonts/',
      path: 'app/styles/templates/font-icons-template.scss',
      targetPath: '../../../app/styles/utilities/_icons.scss'
    }))
    .pipe(iconfont({
      fontName: fontName,
      normalize: true,
      prependUnicode: true,
      fontHeight: 1001,
      // timestamp: runTimestamp,
      // appendCodepoints: true,
      formats: ['svg', 'ttf', 'eot', 'woff']
     }))
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "dist"
    },
    port: 8080,
    open: true,
    notify: false
  });
});


// Watch
gulp.task('watch', function() {

	//watch .scss files
	gulp.watch(['app/styles/utilities/*.scss', 'app/styles/sections/*.scss', 'app/styles/pages/*.scss', 'app/styles/plugins/*.scss', 'app/styles/templates/*.scss', 'app/styles/dronep2p.scss'], ['styles']);

	//watch .js files
	gulp.watch('app/scripts/**/*.js', ['scripts']);

	//watch .jade files
	gulp.watch('app/pages/**/*.pug', ['templates']);

  //watch font icon files
  gulp.watch('app/fonticons/*.svg', ['iconfont']);


});


//default
gulp.task('default', ['scripts', 'styles', 'templates', 'iconfont', 'watch', 'browserSync']);
