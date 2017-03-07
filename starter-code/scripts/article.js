var articles = [];

function Article (blogArticles) {
/* WIP: This is our Model constructor. It will take in
   our source data from blogArticles and instantiate a
   new Object according to this new definition. options is
   a placeholder for the object that will ultimately be
   passed in. Use all of the properties in blogArticles
   to populate the new Article data that we'll use.  */
   this.title = blogArticles.title;
   this.category = blogArticles.category;
   this.author = blogArticles.author;
   this.authorUrl = blogArticles.authorUrl;
   this.publishedOn = blogArticles.publishedOn;
   this.body = blogArticles.body;
};

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.attr('data-category', this.category);
  // WIP: We also need to fill in:
  // 1. author name
  $newArticle.children('.byline address').text(this.author);
  // 2. author url
  // $newArticle.attr('.byline a', this.authorUrl);
  // // 3. article title
  $newArticle.find('h1').text(this.title);
  // // 4. article body
  // $newArticle.attr('.article-body', this.body);
  // // 5. publication
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
/* DONE: This cloned article is no longer a template, as it now
has real data attached to it. Remove the class from this new article! */
  $newArticle.removeClass('template');
  return $newArticle;
};

/* This sort method is a standard JavaScript Array function
   that will iterate over an array and compare its values,
   and then arrange them in ascending or descending order
   according to the return value. We are comparing the
   publishedOn properties to arrange the blog posts in
   descending order (most recent first). */
blogArticles.sort(function(currentObject, nextObject) {
  return (new Date(nextObject.publishedOn)) - (new Date(currentObject.publishedOn));
});

blogArticles.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});
