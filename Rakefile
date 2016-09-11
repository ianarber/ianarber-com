require 'tmpdir'

desc "Generate jekyll site"
task :generate do

  puts "## Grabbing data from Contentful..."
  system "bundle exec jekyll contentful"

  puts "## Creating posts from data files..."
  system "ruby dataToPosts.rb"

  puts "## Generating Site with Jekyll..."
  system "bundle exec jekyll build"
  
end

desc "Generate and publish blog to Bitbucket"
task :publish do
  Dir.mktmpdir do |tmp|
    system "mv _site/* #{tmp}"
    system "mv aerobaticConfig.json #{tmp}"
    system "git checkout -b aerobatic"
    system "rm -rf *"
    system "mv #{tmp}/* ."
    system "mv aerobaticConfig.json package.json"
    system 'git config --global user.email "adesmier@gmail.com"'
    system 'git config --global user.name "adesmier"'
    system "git add ."
    system "git commit -am 'Rebuild triggered from Contentful webhook'"
    system "git remote add bb git@bitbucket.org:adesmier/ianarber.git"
    system "git push -f bb aerobatic"
  end
end