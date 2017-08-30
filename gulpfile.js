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

//react stuff
var browserify  = require('browserify');
var vsource     = require('vinyl-source-stream');
//to uglify files from a vinyl source https://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
var buffer      = require('vinyl-buffer');
//var gutil       = require('gulp-util');
var babelify    = require('babelify');

/*********************************************************************************************************/

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'bundle exec jekyll';

var messages = {
    jekyllBuild: 'DEV MODE: Building Jekyll Site'
};

//to absract module version numbers
var package = JSON.parse(fs.readFileSync('./package.json'));

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
  	'react-dom'
];
var reactVersion = package.dependencies.react.replace('^', '');
var reactOutputName = 'vendor-react' + reactVersion + '.js';

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
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
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'scripts', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false,
        open: false
    });
});

/**
 * Compile files from assets/css/main.scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function (){
    return gulp.src('assets/css/main.scss')
        .pipe(sass({ //TODO: Not sure if thsi is doing anything
            //includePaths: ['scss'],
            //onError: browserSync.notify
        }))
        .pipe(cleanCss({compatibility: 'ie8'})) //minify main.css
        .pipe(prefix({browsers: ['last 30 versions'], cascade: false}))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});



/**
 * Concatenation of javascript files. Only common files for now
 */
var jsFiles = [
    'assets/script/mobileMenu.js',
    'assets/script/quoteSlider.js',
    'assets/script/clientAreaAuth.js'
];

gulp.task('scripts', function(){
    return gulp.src(jsFiles)
        .pipe(concat('bundle-common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/script'))
});





/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch(['*.html', '_layouts/**', '_includes/**', '_posts/*', 'assets/script/**', 'react/**'], ['jekyll-rebuild']);
});

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
 * Compile and bundle React code
 */

gulp.task('build-react', function(){
    buildReact(false);
});

/*
 * Calls the JS file as a child process to download all Contentful home page images
 * TODO: Change from using child process to using modeule exports - having issues with gulp not waiting for async
 * download to finish
 */

// gulp.task('download-images', ['projects'], function(done){
//     return cp.spawn('node' , ['./fetchContentfulImgs.js'], {stdio: 'inherit'})
//         .on('close', done);
// });

/*
 * Resize and minify downbloaded images for web. Needs download-images task to fully complete
 * TODO: Error checking:
 *         - YAML file from contentful exists
           - YAML file parsed correctly
           - ImageURL array contains 4 valid http URLs
           - Download destination exists and is writable
           - All 4 images are downloaded successfully
           - Resized images are all valid image files
           - Gulp task needs to fail of one of the above did not pass
 */
// gulp.task('resize-images', ['download-images'], function(done){
//     return gulp.src('./assets/images/home/download/*.jpg')
//         .pipe(imageResize({
//             width: 470,
//             height: 470,
//             crop: true,
//             upscale: false
//         }))
//         .pipe(imageMin({
//             progressive: true,
//             use: [jpegTran()]
//         }))
//         .pipe(gulp.dest('./assets/images/home'));
// });

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['build-react', 'browser-sync', 'watch']);

/**
 * task to run when building on Netlify (runs all tasks
 * appart from browser-sync)
 */
gulp.task('netlify-deploy', ['clean-site', 'sass', 'create-posts'], function(done){
    return cp.spawn('bundle' , ['exec', 'jekyll', 'build', '--config', '_liveConfig.yml'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * delete the _site folder
 */
gulp.task('clean-site', function(){
  return del.sync(['_site', '_data/contentful/**', '_quotes/*.md', '_bioimages/*.md', 'assets/script/bundle*']);
});


///////////////////////////////////////////////////////////////


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
  		browserify({require: dependencies, debug: true})
			.bundle()
            //.on('error', gutil.log)
            .pipe(vsource(reactOutputName))
            .pipe(buffer())
            .pipe(uglify())
			.pipe(gulp.dest('./assets/script/vendor/'));
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
        //.on('error',gutil.log)
        .pipe(vsource('bundle-react-app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./assets/script/'));
        
}
