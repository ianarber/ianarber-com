/*
 * REQUIRES
 */
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var cleanCss    = require('gulp-clean-css');
var prefix      = require('gulp-autoprefixer');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');
var cp          = require('child_process');
var del         = require('del');
var fs          = require('fs');

//transpiling and bundling react code
var browserify  = require('browserify');
var vsource     = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer'); //to uglify files from a vinyl source https://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
var babelify    = require('babelify');

/*********************************************************************************************************/

//var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'bundle exec jekyll';

var messages = { jekyllBuild: 'DEV MODE: Building Jekyll Site' };

//to absract module version numbers
var package = JSON.parse(fs.readFileSync('./package.json'));

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
  	'react-dom'
];
var reactVersion = package.dependencies.react.replace('^', '');
var reactOutputName = 'react' + reactVersion + '.js';

var jsFiles = [
    'assets/script/modules/mobileMenu.js',
    'assets/script/modules/quoteSlider.js',
    'assets/script/modules/clientAreaAuth.js'
];

/*********************************************************************************************************/

/**
 * GULP TASKS --- DEVELOPMENT
 */

/**
 * Default task, running just `gulp` will compile the sass, scripts, react
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync']);

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'build-react', 'scripts', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false,
        open: false
    });
});

/**
 * Compile files from assets/css/main.scss into both _site/assets/css (for browsersync live injecting) and assets/css (for future jekyll builds)
 */
gulp.task('sass', function (){
    return gulp.src('assets/css/main.scss')
        .pipe(sass())
        .pipe(cleanCss({compatibility: 'ie8'})) //minify main.css
        .pipe(prefix({browsers: ['last 30 versions'], cascade: false}))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

/**
 * Compile and bundle React code
 */
gulp.task('build-react', function(){
    buildReact(false);
});

/**
 * Concatenation of javascript files. Only common files for now
 */
gulp.task('scripts', function(){
    return gulp.src(jsFiles)
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('_site/assets/script/bundle'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/script/bundle'))
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', ['sass', 'build-react', 'scripts'], function (done) {
    browserSync.notify(messages.jekyllBuild);
	return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
// gulp.task('watch', function () {
//     gulp.watch('assets/css/**', ['sass']);
//     gulp.watch('assets/script/modules/**', ['scripts']);
//     gulp.watch('react/**', ['build-react']);
//     gulp.watch(['*.html', '_layouts/**', '_includes/**', '_posts/*'], ['jekyll-rebuild']);
// });


/**
 * GULP TASKS --- PRODUCTION
 */

/**
 * task to run when building on Netlify (runs all tasks
 * appart from browser-sync)
 */
gulp.task('netlify-deploy', ['clean', 'sass', 'create-posts'], function(done){
    return cp.spawn('bundle' , ['exec', 'jekyll', 'build', 'JEKYLL_ENV=production'], {stdio: 'inherit'})
        .on('close', done);
});


/**
 * GULP TASKS --- CONTENTFUL POST CREATION
 */

/**
 * Process Contentful YAML data into markdown files in the _projects folder
 */
gulp.task('create-posts', ['contentful', 'get-bio-images'], function(done){
    return cp.spawn('bundle' , ['exec', 'ruby', './scripts/dataToPosts.rb'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Grab data from Contentful, using Contenful gem, in YAML format and place in _data folder
 */
gulp.task('contentful', function(done){
    return cp.spawn('bundle', ['exec', 'jekyll', 'contentful'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Create MD file for bio about page images in _bioimages folder
 */
gulp.task('get-bio-images', function(done){
    return cp.spawn('bundle' , ['exec', 'ruby', './scripts/getBioImages.rb'], {stdio: 'inherit'})
        .on('close', done);
});


/**
 * GULP TASKS --- CLEANING
 */

/**
 * delete the _site folder
 */
gulp.task('clean', function(){
  return del.sync(['_site', '_data/contentful/**', '_quotes/*.md', '_bioimages/*.md', 'assets/script/bundle/*']);
});


/*********************************************************************************************************/

function buildReact(isProduction){
	// Browserify will bundle all our js files together in to one and will let
	// us use modules in the front end.
	var appBundler = browserify({
        entries: './react/script/hello.jsx',
        extensions: ['.jsx'],
    	debug: true
  	});

  	if (!isProduction && !fs.existsSync('./assets/script/vendor/' + reactOutputName)){
          // create vendors.js for dev environment.
        console.log('***Building vendor React***');
  		browserify({require: dependencies, debug: true})
			.bundle()
            .pipe(vsource(reactOutputName))
            .pipe(buffer())
            .pipe(uglify())
			.pipe(gulp.dest('assets/script/vendor'));
  	}
  	if (!isProduction){
  		// make the dependencies external so they dont get bundled by the 
		// app bundler. Dependencies are already bundled in vendor.js for
		// development environments.
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		});
  	}
 
  	appBundler.transform('babelify', {presets: ['es2015', 'react']})
	    .bundle()
        .pipe(vsource('react-app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('_site/assets/script/bundle'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/script/bundle'));
        
}
