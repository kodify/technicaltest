Welcome to the technical test at Kodify! :)
===========================================
We tried to keep the test/exercise as simple as we could trying to be able
to determine whether we will work fine together or not. 

1) The Code
-----------

The test is based in symfony and we used a basic instalation without much
plugins, feel free to add as much plugins/bundles as you require.

Everything you see is open to comments/valorations from your part, we will
be glad to hear your comments!!

There will be two small user stories we'll like you to implement on the test.
If you had any doubt make the assumptions you need, and just comment them as
a comment on your pull request.

### What to deliver

We ask you to deliver a pull request to this same repository with your solution
to the specified user stories.

### Installation 

We tried to include all the tools necessary to do the test here, that's why
we have composer.phar into the repo for example, so the installation is quite
simple. The only external thing you will need is a Mysql server somewhere, as 
you can use symfony's bundled server if needed, but feel free to use the stack
you prefer.
The steps to start with the test are: 

1) Clone this repository

2) Execute composer to install the required dependencies. (You will be required 
with some information, mainly about the mysql configuration) 

    php composer.phar install

3) Do an empty commit with the message "I'm ready to start" for us to know the timing.

4) Ready to go!! 

2) The Test
-----------
**NOTE**: We encourage you to make as much commits as possible with meaningul messages instead of one big bang commit at the end.

**NOTE2**: We encourage you to test you code (with functional, integration or unit tests, as you feel more confortable).


1) Our frontend girl wanted to check also your capabilities in her terrain, so 
we included this part on the test. On the Home page, the blog posts (or similar) 
are shown in a single column, one on top of the other. We require you to do the 
required changes to have that list on two columns.

On the file **feature-two-columns.txt** at the root of the project you will find the definition
of the story.

2) The blog is quite simple with just a couple of entities for post and author. We would like you
to implement a simple rating system on the post page, and allow the ordering of the posts by rating or date
on the posts list. (Choose the ordering algorithm that you desire, we will discuss it later)

We don't need to know who did the rating, so the same user can vote as many times as he wants. (We want a simple option) 

In the file **feature-rating.txt** at the root of the project you will find the definition
of the story.

Extra: If you need help creating the database schema, to create the empty database
you can use:  

    php app/console doctrine:database:create
    php app/console doctrine:schema:update

Extra 2: We use a slightly modified version of the Symfony2 Coding standards, feel free 
to use the coding standards you want, but try to be consistent with the ones you choose. 
For reference: http://symfony.com/doc/current/contributing/code/standards.html
