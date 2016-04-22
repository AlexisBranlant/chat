var gulp = require('gulp');
//CSS et HTML et JS
var flatten = require('gulp-flatten');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

//css
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass',function(){
	console.log('sass');
	gulp.src('src/**/*.scss')
		.pipe(plumber({
			errorHandler : notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cleanCss())
		.pipe(flatten())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'));
});

//html
var twig = require('gulp-twig');
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('config/data.json', 'utf-8'));
gulp.task('html',function(){
	console.log('html');
	gulp.src('src/pages/**/*.twig')
	.pipe(plumber({
		errorHandler : notify.onError("Error: <%= error.message %>")
	}))
	.pipe(twig({data}))
	.pipe(flatten())
	.pipe(gulp.dest('dist'));
});

//js
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

gulp.task('js',function(){
	console.log('js');
	var stream = browserify({
		entries : 'src/main.js'
	})
		.bundle()
		.pipe(plumber({
			errorHandler : notify.onError("Error: <%= error.message %>")
		}))
		.pipe(source('main.js'));
	stream = stream.pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest('dist/js'));
  return stream
});

gulp.task('watch',function(){
	gulp.watch('src/**/*.scss',['sass']);
	gulp.watch('src/**/*.twig',['html']);
	gulp.watch('src/**/*.js',['js']);
});

var browserSync = require('browser-sync').create();
gulp.task('server',function(){
	browserSync.init({
		server : {
			baseDir: "./dist"
		}
	});
	gulp.start('watch');
});

gulp.task('default',['sass','html','js','server'],function(){
	
});

















