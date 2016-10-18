# Welcome to the technical test @Kodify! :)

We tried to keep the test/exercise as simple as we could trying to be able to determine whether we will work fine together or not. 

## The Code

The test is based in symfony and we used a basic instalation without much plugins, feel free to add as much plugins/bundles as you require.

Everything you see is open to comments/valorations from your part, we will be glad to hear your comments!!

### Installation 

We tried to include all the tools necessary to do the test here, that's why we have composer.phar into the repo for example, so the installation is quite simple. 
The only external thing you will need is a Mysql server somewhere, as you can use symfony's bundled server if needed, but feel free to use the stack you prefer.

The steps to start with the test are: 

1. Clone this repository

2. Execute composer to install the required dependencies. (You will be required with some information, mainly about the mysql configuration)

3. Do an empty commit with the message "I'm ready to start" for us to know the timing.

4. Ready to go!! 

## The Test

There are two small user stories we'll like you to implement on the test. If you had any doubt make the assumptions you need, and just comment them as a comment on your pull request.

### User Stories

1. Right now our blog lets everyone create authors and write posts. We want to add a security layer to avoid this. The user has to be able to:
    * **Register:** Will need to introduce his name, email, password.
    * **Login:** Will be able to login using his email and password.
    * **Write Posts:** Once logged in the user will be able to write posts. Right now we can assign the autorship of a blogpost to any user. We don't want this anymore. The user who writes a post will need to be its author
    * **Post Comments:** Only a loggedin user can write comments in a post. The autorship of the comment has to work like posts.
  
2. We also want to update our comment post form. Right now we are doing a classic synchronous post to a controller. We want to ajaxify it. Do whatever necesary to make the call async via AJAX. 

### How to deliver

We ask you to deliver a pull request to this same repository with your solution to the specified user stories.

### Notes
* We encourage you to make as much commits as possible with meaninful messages instead of one big bang commit at the end.
* The blog design is quite nice. Please don't screw it up with awful styles.
* Write as much tests as you feel. This test is using PHPUnit but if you prefer another solution feel free to use it.
* If you use vagrant, docker or any other solution please include the config files so we can take a look.
* Use [symfony 2 coding standards](http://symfony.com/doc/current/contributing/code/standards.html). 
* If you see something you don't like in the code feel free to improve it.

