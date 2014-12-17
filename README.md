Welcome to the technical test at Kodify! :)
===========================================
We tried to keep the test/exercise as simple as we could trying to be able
to determine whether we will work fine together or not. 

1) The Test
--------

The test is based in symfony and we used a basic instalation without much
plugins, feel free to add as much plugins/bundles as you require.

Everything you see is open to comments/valorations from your part, we will
be glad to hear your comments!!

There will be two small user stories we'll like you to implement on the test.
If you had any doubt: INSERT WHAT TO DO HERE! ;)

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
3) Ready to go!! * 

### The test
1) Our frontend girl wanted to check also your capabilities in her terrain, so 
we included this part on the test. On the Home page, the blog posts (or similar) 
are shown in a single column, one on top of the other. We require you to do the 
required changes to have that list on two columns.
2) This blog is that simple that we forgot to include the hability do comment on 
the posts. We want to add the hability to create comments on the post page, and 
show the previous comments on that same post page. 
Every comment should be related to an author (the same way as the post is related
to an author, we don't need anything more complicated).


* If you need help creating the database schema, to create the empty database 
you can use:  
    php app/console doctrine:database:create
    php app/console doctrine:schema:update
