const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

// __projectname 工程名
const [__projectname] = __dirname.split('\\').reverse();

// scss文件所在的目录文件，按照个人的路径来更改，如果是sass文件的将扩展名更改为.sass即可
// 路径规则可以参考 gulp 官网的 glob 规则（类似于正则表达式 regexp）
const entry = ['./pages/**/*.scss', './**/pages/**/*.scss'];

// 文件输出目录处理函数
const output = (vinyl) => {
  let [, , pname] = vinyl.dirname.split('\\').reverse();

  let [filename, filedir, ,bname] = vinyl.path.split('\\').reverse();

  const fname = pname === __projectname ? filename : `${bname}:${filedir}/${filename}`;
  console.log(fname);

  return pname === __projectname ? './pages' : './';
};

const buildScss = function (a) {
  return gulp.src(entry)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ extname: '.wxss' }))
    .pipe(gulp.dest(output));
};

exports.default = function () {
  // 监听 scss 文件的变化，只要发生变化整个自动化过程就会重新被执行，相当于模块热替换吧
  gulp.watch(entry, buildScss);
};