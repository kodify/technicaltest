<?php

namespace Kodify\BlogBundle\Tests\Controller;

use Kodify\BlogBundle\Entity\Comment;
use Kodify\BlogBundle\Entity\Post;
use Kodify\BlogBundle\Entity\Author;
use Kodify\BlogBundle\Tests\BaseFunctionalTest;

/**
 * Class PostsControllerTest
 * @package Kodify\BlogBundle\Tests\Controller
 */
class PostsControllerTest extends BaseFunctionalTest
{
    /**
     * test index withou post, should show a message
     */
    public function testIndexNoPosts()
    {
        $crawler = $this->client->request('GET', '/');
        $this->assertTextFound($crawler, "There are no posts, let's create some!!");
    }

    /**
     * Text index with post, should show only the number of post defined in $countToCheck
     * @param int $postsToCreate
     * @param int $countToCheck
     *
     * @dataProvider countDataProvider
     */
    public function testIndexWithPosts($postsToCreate, $countToCheck)
    {
        $this->createPosts($postsToCreate);
        $crawler = $this->client->request('GET', '/');
        $this->assertTextNotFound(
            $crawler,
            "There are no posts, let's create some!!",
            'Empty list found, it should have posts'
        );

        $this->assertSame(
            $countToCheck,
            substr_count($crawler->html(), 'Posted by'),
            "We should find $countToCheck messages from the author"
        );
        for ($i = 0; $i < $countToCheck; ++$i) {
            $this->assertTextFound($crawler, "Title{$i}");
            $this->assertTextFound($crawler, "Content{$i}");
        }
    }

    /**
     * Function to creates as much post as indicated in $count
     * @param $count
     */
    protected function createPosts($count)
    {
        $author = new Author('Author');
        $this->entityManager()->persist($author);
        $this->entityManager()->flush();
        for ($i = 0; $i < $count; ++$i) {
            $post = new Post();
            $post->setTitle('Title' . $i);
            $post->setContent('Content' . $i);
            $post->setAuthor($author);
            $this->entityManager()->persist($post);
        }
        $this->entityManager()->flush();
    }

    /**
     * test access to no existing post
     */
    public function testViewNonExistingPost()
    {
        $crawler = $this->client->request('GET', '/posts/1');
        $this->assertTextFound($crawler, 'Post not found', 1);
    }

    /**
     * test access to existing post
     */
    public function testViewPost()
    {
        $this->createPosts(2);
        $crawler = $this->client->request('GET', '/posts/1');
        $this->assertTextFound($crawler, 'Title0');
        $this->assertTextFound($crawler, 'Content0');
        $this->assertTextNotFound($crawler, 'Title1');
        $this->assertTextNotFound($crawler, 'Content1');
    }

    public function testPostNew()
    {
        $crawler = $this->client->request('GET', '/posts/create');
        $this->assertTextFound($crawler, "Validation is based on string length.");
        $this->assertTextFound($crawler, "New Post");
    }

    public function testApiPost(){
        $this->createPosts(2);
        $crawler = $this->client->request('GET', '/api/post/1');

        $this->assertTextFound($crawler, 'id');
    }

    public function testApiPosts(){
        $this->createPosts(2);
        $crawler = $this->client->request('GET', '/api/posts');

        $this->assertTextFound($crawler, "Title0");
        $this->assertTextFound($crawler, "Title1");
    }

    public function testApiCreatePost(){
        $crawler = $this->client->request(
            "POST",
            "/api/post/new",
            array(),
            array(),
            array(),
            json_encode(array("title" => 'testTitle', "author" => 1, "content" => "test content"))
        );

        $this->assertTextFound($crawler, '"id":1,"name":"testAuthor","posts":[]');
    }

    public function countDataProvider()
    {
        $rand = rand(1, 5);

        return [
            'lessThanLimit' => ['count' => $rand, 'expectedCount' => $rand],
            'moreThanLimit' => ['count' => rand(6, 9), 'expectedCount' => 5],
        ];
    }
}
