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
var collapse    = require('bundle-collapser/plugin'); //for building production react module

/*********************************************************************************************************/

//var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'bundle exec jekyll';

var messages = {
    jekyllBuild: 'DEV MODE: Building Jekyll Site',
    jekyllReBuild: 'DEV MODE: Jekyll Re-build triggered'
};

//to absract module version numbers
var package = JSON.parse(fs.readFileSync('./package.json'));

//External dependencies not to bundle while developing, but include in application deployment
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
 * GULP TASKS --- ENVIRONMENT SETTING
 */

gulp.task('set-node-env-dev', function(){
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-node-env-prod', function(){
    return process.env.NODE_ENV = 'production';
});


/**
 * GULP TASKS --- DEVELOPMENT
 */

/**
 * Default task, running just `gulp` will compile the sass, scripts, react
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['set-node-env-dev', 'browser-sync', 'watch']);

/**
 * Wait for all 4 tasks to complete, then launch the Server
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
    buildReact(process.env.NODE_ENV);
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
 * Build the Jekyll Site. Sass, react and scripts tasks are not dependant but jekyll-build requires these to have finished
 * so put these 3 tasks within []
 */
gulp.task('jekyll-build', ['sass', 'build-react', 'scripts'], function (done) {
    browserSync.notify(messages.jekyllBuild);
	return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload. No need to re-build any scripts or sass as they have their own watch events
 */
gulp.task('jekyll-rebuild', function () {
    browserSync.notify(messages.jekyllReBuild);
    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
        .on('close', function(){
            browserSync.reload(); //once jekyll has finished building
        });
});

/**
 * Watch scss/script files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch('assets/script/modules/**', ['scripts']);
    gulp.watch('react/**', ['build-react']);
    gulp.watch(['*.html', '_layouts/**', '_includes/**', '_posts/*'], ['jekyll-rebuild']);
});


/**
 * GULP TASKS --- PRODUCTION
 */

/**
 * task to run when building on Netlify (runs all tasks
 * appart from browser-sync)
 */
gulp.task('netlify-deploy', ['set-node-env-prod', 'clean', 'sass', 'scripts', 'build-react', 'create-posts'], function(done){
    return cp.spawn('bundle' , ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
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

function buildReact(env){

	var appBundler = browserify({
        entries: './react/script/hello.jsx',
        extensions: ['.jsx'],
    	debug: true
  	});

  	if(env === 'development' && !fs.existsSync('./assets/script/vendor/' + reactOutputName)){
        //create react vendor bundle for dev environment
        browserify({require: dependencies, debug: true})
			.bundle()
            .pipe(vsource(reactOutputName))
			.pipe(gulp.dest('assets/script/vendor'));
  	}
  	if(env === 'development'){
  		//make the dependencies external so they dont get bundled by the app bundler
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		});
  	}
    if(env === 'production'){
        //create react vendor bundle for production
        //https://facebook.github.io/react/docs/optimizing-performance.html#browserify
        browserify({
            require: dependencies,
            plugin: [collapse],
            debug: true
        })
            .transform('envify', {'global': true})
            .transform('uglifyify', {'global': true})
            .bundle()
            .pipe(vsource(reactOutputName))
            .pipe(buffer())
            .pipe(uglify({mangle: true}))
            .pipe(gulp.dest('assets/script/vendor'));
    }
    
    //now transpile and bundle the custom react code
    appBundler
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(vsource('react-app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('_site/assets/script/bundle'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/script/bundle'));
        
}

