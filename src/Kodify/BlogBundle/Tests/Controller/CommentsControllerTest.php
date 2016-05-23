<?php
namespace Kodify\BlogBundle\Tests\Controller;


use Kodify\BlogBundle\Entity\Author;
use Kodify\BlogBundle\Entity\Comment;
use Kodify\BlogBundle\Entity\Post;
use Kodify\BlogBundle\Tests\BaseFunctionalTest;

/**
 * Class CommentsControllerTest
 * @package Kodify\BlogBundle\Tests\Controller
 */
class CommentsControllerTest extends BaseFunctionalTest
{
    /**
     * Function to creates as much comments as indicated in $count
     * @param $count
     */
    protected function createComments($count)
    {
        //create author
        $author = new Author();
        $author->setName('Author');
        $this->entityManager()->persist($author);
        //create post
        $post = new Post();
        $post->setTitle('Title');
        $post->setContent('Content');
        $post->setAuthor($author);
        $this->entityManager()->persist($post);

        $author->addPost($post);
        $this->entityManager()->flush();

        for ($i = 0; $i < $count; ++$i) {
            $comment = new Comment();
            $comment->setAuthor($author);
            $comment->setPost($post);
            $comment->setText('Comment text');
            $this->entityManager()->persist($comment);

            $author->addComment($comment);
            $post->addComment($comment);
        }
        $this->entityManager()->flush();
    }

    public function countDataProvider()
    {
        $rand = rand(1, 10);

        return [
            'lessThanLimit' => ['count' => $rand, 'expectedCount' => $rand],
            'moreThanLimit' => ['count' => rand(11, 20), 'expectedCount' => 10],
        ];
    }

    /**
     * test an existing post view without comments
     */
    public function testPostWithoutComments()
    {
        //create author
        $author = new Author();
        $author->setName('Author');
        $this->entityManager()->persist($author);
        //create post
        $post = new Post();
        $post->setTitle('Title');
        $post->setContent('Content');
        $post->setAuthor($author);
        $this->entityManager()->persist($post);

        $author->addPost($post);
        $this->entityManager()->flush();

        $crawler = $this->client->request('GET', '/posts/1');
        $this->assertTextFound($crawler, "There are no comments, let's create some!!");
    }

    /**
     * test an existing post view with comments
     * @dataProvider countDataProvider
     */
    public function testPostWithComments($commentsToCreate, $countToCheck)
    {
        $this->createComments($commentsToCreate);

        $crawler = $this->client->request('GET', '/posts/1');
        $this->assertTextNotFound($crawler, "There are no comments, let's create some!!");

        $this->assertSame(
            $countToCheck,
            $crawler->filter('span[class="glyphicon glyphicon-user"]')->count(),
            "We should find $countToCheck messages from the author"
        );
    }

}