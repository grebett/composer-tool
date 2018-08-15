const gulp = require('gulp');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const filter = require('gulp-filter');
const fn = require('gulp-fn');
const { spawn } = require('child_process');

let launchProcess = null;
const launchTests = () => {
  if (launchProcess) {
    launchProcess.kill();
  }
  launchProcess = spawn('npm', ['--', 'test', '_all.test.js']);
  launchProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  launchProcess.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  launchProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

gulp.task('concat', () => gulp
  .src(['./tests/*.test.js', '!./tests/_all.test.js'])
  .pipe(concat('_all.test.js'))
  .pipe(gulp.dest('./tests/')));

gulp.task('watch', () => gulp
  .src('./data/*.musicxml')
  .pipe(watch('./data/*.musicxml'))
  .pipe(filter(file => file.event === 'add'))
  .pipe(fn(launchTests))
);
