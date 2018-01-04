Portfolio Website for Ian Arber
===============================
* Static website built with [Jekyll](https://jekyllrb.com/)
* [Gulp](https://gulpjs.com/) used to build and bundle assets
* Site hosted on Netlify
* Contentful used as CMS to add posts and articles
* Auth0 and Webtask.io used to provide authentication to certain pages

## Getting Started
### Prerequisites
* Build on Linux or Windows Subsystem for Linux
* Git, Node v4.x or above, Ruby v2.4 or above, Bundler v1 or above

### Installing
`git clone https://github.com/ianarber/ianarber-com.git`

`bundle install`

`npm install`

## Usage
### Client Area Authentication

## Deployment
The Jekyll site and assets are built by running various Gulp tasks. That main ones are:

### Default Task
`gulp`
* Used for development
* Compiles SASS, scripts, React
* Runs the __jekyll-build__ task to compile the site
* Launches BrowserSync to watch files

### Create Posts
`gulp create-post`
* Calls the Contentful Jekyll plugin to pull data into _\_data_ folder
* Need to _export_ both CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables in order to pull data from the Contentful Space (see _\_config.yml_)
* Ruby scripts in _./scripts_ folder are then called to convert returned yaml data to Jekyll posts and the Collections _quotes_ and _bioimages_

### Netlify Deploy
`gulp netlify-deploy`
* Builds a production version of the site to deploy on Netlify
* Similar to default task but minifies css/scripts
* BrowserSync not called

### Clean
`gulp clean`
* Removes files from the following directories:
  * _data/contentful/**
  * _quotes/*.md
  * _bioimages/*.md
  * assets/script/bundle/*
  * assets/css/*.css

## Attributions
<a href="https://www.netlify.com" rel="nofollow" target="_blank"><img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" width="90" hspace="10" alt="Deployed on Netlify" /></a><a href="https://www.contentful.com/" rel="nofollow" target="_blank"><img src="https://images.contentful.com/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg" width="100" hspace="10" alt="Powered by Contentful" /></a><a href="https://auth0.com" rel="nofollow" target="_blank"><img src="https://cdn.auth0.com/website/assets/pages/press/img/resources/auth0-logo-main-6001cece68.svg" width="100" hspace="10" alt="Protected by Auth0" /></a><a href="https://webtask.io" rel="nofollow" target="_blank"><img src="https://cdn.auth0.com/website/assets/pages/press/img/resources/webtask-logo-f479cae0f6.svg" width="100" hspace="10" alt="Deployed on Netlify" /></a>

## Authors
__Anthony Desmier__ - https://github.com/adesmier


