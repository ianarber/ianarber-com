require 'yaml'
require 'psych'

#read in YAML file into has variable
postData = begin
  YAML.load(File.open("_data/contentful/spaces/posts.yaml"))
rescue ArgumentError => e
  puts "Could not parse YAML: #{e.message}"
end

#get number of newsArticle and creditPost elements
num_of_credits = "#{postData['creditPost'].length}"
num_of_articles = "#{postData['newsArticle'].length}"

credits_counter = 0
articles_counter = 0

#create credit posts in _posts/credits
begin
	#create filename for post MD file in the format 'yyyy-mm-dd-some-title.md'
	credits_date = "#{postData['creditPost'][credits_counter]['credit_date']}".partition('T').first

	title_slug = "#{postData['creditPost'][credits_counter]['title']}".downcase.gsub("-", " ")
    #remove all quotes and then replace multiple spaces with a dash
    title_slug = title_slug.gsub(/["':;]/, "")
    title_slug = title_slug.gsub(/[ ]{1,}/, "-")

	filename = credits_date + "-" + title_slug + ".md"

	#create post file and append YAML front matter data
	File.open("_posts/credits/#{filename}", "w") do |f|
		f.puts "---"
		f.puts "layout: credit-info"
		f.puts "category: credits"
		f.puts "headerstatus: shrunk-header"
		f.puts "title: #{postData['creditPost'][credits_counter]['title']}"
		f.puts "identity: #{postData['creditPost'][credits_counter]['identity']}"
		f.puts "image_cover: #{postData['creditPost'][credits_counter]['image_cover']['url']}"
		f.puts "image_social: #{postData['creditPost'][credits_counter]['image_social']['url']}"
		f.puts "role: #{postData['creditPost'][credits_counter]['role']}"
		f.puts "credit_type: #{postData['creditPost'][credits_counter]['credit_type']}"
		f.puts "imdb: #{postData['creditPost'][credits_counter]['imdb']}"
		f.puts "genre: #{postData['creditPost'][credits_counter]['genre']}"
		f.puts "director: #{postData['creditPost'][credits_counter]['director']}"
		f.puts "synopsis: |"

        #print out each line of the synopsis prepended with a space to be able to handle a multi-line yaml item
        synopsis = "#{postData['creditPost'][credits_counter]['synopsis']}"
        synopsis.each_line do |line|
            f.puts " " + line
        end

		begin
			f.puts "audio_sample: #{postData['creditPost'][credits_counter]['audio_sample']['url']}"
			rescue NoMethodError
		end

		short_title = "#{postData['creditPost'][credits_counter]['short_title']}"
		if short_title != ''
			f.puts "short_title: #{short_title}"
		end
		showreel_weight = "#{postData['creditPost'][credits_counter]['showreel_weight']}"
		if showreel_weight != ''
			f.puts "showreel_weight: #{showreel_weight}"
		end
		credits_weight = "#{postData['creditPost'][credits_counter]['credits_weight']}"
		if credits_weight != ''
			f.puts "credits_weight: #{credits_weight}"
		end
		soundcloud = "#{postData['creditPost'][credits_counter]['soundcloud']}"
		if soundcloud != ''
			f.puts "soundcloud: #{soundcloud}"
		end
		writers = "#{postData['creditPost'][credits_counter]['writers']}"
		if writers != ''
			f.puts "writers: #{writers}"
		end
		producers = "#{postData['creditPost'][credits_counter]['producers']}"
		if producers != ''
			f.puts "producers: #{producers}"
		end

		f.puts "---"

		body = "#{postData['creditPost'][credits_counter]['body']}"
		if body != ''
			f.puts "#{body}"
		end
	end

	credits_counter+=1
end while credits_counter < num_of_credits.to_i

#create news article posts in _posts/news
begin
	#create filename for post MD file in the format 'yyyy-mm-dd-some-title.md'
	news_date = "#{postData['newsArticle'][articles_counter]['article_date']}".partition('T').first

    #remove all non-alphanumeric characters
	title_slug = "#{postData['newsArticle'][articles_counter]['title']}".downcase.gsub("-", " ")
    #remove all quotes and then replace multiple spaces with a dash
    title_slug = title_slug.gsub(/["']/, "")
    title_slug = title_slug.gsub(/[ ]{1,}/, "-")

	filename = news_date + "-" + title_slug + ".md"

	#create post file and append YAML front matter data
	File.open("_posts/news/#{filename}", "w") do |f|
		f.puts "---"
		f.puts "layout: news"
		f.puts "category: news"
		f.puts "headerstatus: shrunk-header"
		f.puts "title: #{postData['newsArticle'][articles_counter]['title']}"
		f.puts "film_show: #{postData['newsArticle'][articles_counter]['film_show']}"
		f.puts "image_header: #{postData['newsArticle'][articles_counter]['image_header']['url']}"
		f.puts "image_social: #{postData['newsArticle'][articles_counter]['image_social']['url']}"
		f.puts "heading: #{postData['newsArticle'][articles_counter]['heading']}"
		f.puts "post_excerpt: #{postData['newsArticle'][articles_counter]['post_excerpt']}"

		intro_weight = "#{postData['newsArticle'][articles_counter]['intro_weight']}"
		if intro_weight != ''
			f.puts "intro_weight: #{intro_weight}"
		end
		video_link = "#{postData['newsArticle'][articles_counter]['video_link']}"
		if video_link != ''
			f.puts "video_link: #{video_link}"
		end
		video_width = "#{postData['newsArticle'][articles_counter]['video_width']}"
		if video_width != ''
			f.puts "video_width: #{video_width}"
		end
		video_height = "#{postData['newsArticle'][articles_counter]['video_height']}"
		if video_height != ''
			f.puts "video_height: #{video_height}"
		end

		f.puts "---"

		body = "#{postData['newsArticle'][articles_counter]['body']}"
		if body != ''
			f.puts "#{body}"
		end
	end

	articles_counter+=1
end while articles_counter < num_of_articles.to_i


