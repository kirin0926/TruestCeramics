const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify-css');
const concat = require("gulp-concat");
const classPrefix = require('gulp-class-prefix');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const image = require('gulp-image');
const del = require('del');
const spritesmith = require('gulp.spritesmith');
const imagemin = require('gulp-imagemin');
 
gulp.task('js', function () {
  // gulp.src('src/js/*.js')  //获取文件，同时过滤掉.min.js文件
  //   .pipe(uglify())
  //   .pipe(babel({
  //     presets: ['env']
  //   }))
  //   .pipe(gulp.dest('public/js'));  //输出文件
  gulp.src('src/js/*.js').pipe(gulp.dest('public/js'));
});

gulp.task('vendor', function () {
  gulp.src('src/vendor/*').pipe(gulp.dest('public/vendor'))
})

gulp.task('clean', function () {
  return del([
    'public/css', 'public/js', 'public/icons', 'public/images'
  ]);
});

// 直接将icons文件导入public里面
gulp.task('icons', function () {
  gulp.src('src/icons/*.png').pipe(gulp.dest('public/icons/'));
});

gulp.task('css', () =>
  gulp.src('src/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))  //要压缩的css
    .pipe(minify())
    .pipe(gulp.dest('public/css'))
);
 
gulp.task('image', function () {
  // gulp.src('src/images/*')
  //   .pipe(imagemin())
  //   .pipe(gulp.dest('public/images'));
  return gulp.src('src/images/**/*.*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(process.env.NODE_ENV === 'production' ? 'build/images' : 'public/images'));
});

gulp.task('watch', function () {
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/images/*', ['image']);
});

gulp.task('default', ['clean', 'watch', 'js', 'vendor', 'icons', 'css', 'image'], function(){
  console.log('gulp watching');
});
