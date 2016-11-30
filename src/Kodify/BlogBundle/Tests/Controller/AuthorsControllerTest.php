<?php

namespace Kodify\BlogBundle\Tests\Controller;

use Kodify\BlogBundle\Entity\Author;
use Kodify\BlogBundle\Tests\BaseFunctionalTest;

class AuthorsControllerTest extends BaseFunctionalTest
{
    public function testApiAuthorsNoAuthors()
    {
        $crawler = $this->client->request('GET', '/api/authors');
        $this->assertTextFound($crawler, "[]");
    }

    public function testApiAuthorsxWithAuthors()
    {
        $this->createAuthors(10);
        $crawler = $this->client->request('GET', '/api/authors');

        $this->assertSame(
            10,
            substr_count($crawler->html(), 'id')
        );
    }

    public function testAuthorNew()
    {
        $crawler = $this->client->request('GET', '/author/new');
        $this->assertTextFound($crawler, "Validation is based on string length");
        $this->assertTextFound($crawler, "New Author");
    }

    public function testApiCreateAuthor(){
        $crawler = $this->client->request(
            "POST",
            "/api/author/new",
            array(),
            array(),
            array(),
            json_encode(array("authorName" => 'testAuthor'))
        );

        $this->assertTextFound($crawler, '"id":1');
    }

    protected function createAuthors($count)
    {
        for ($i = 0; $i < $count; ++$i) {
            $author = new Author("Name{$i}");
            $this->entityManager()->persist($author);
        }
        $this->entityManager()->flush();
    }
}
