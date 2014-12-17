<?php

namespace Kodify\BlogBundle\Tests\Controller;

use Kodify\BlogBundle\Entity\Author;
use Kodify\BlogBundle\Tests\BaseFunctionalTest;

class AuthorsControllerTest extends BaseFunctionalTest
{
    public function testIndexNoAuthors()
    {
        $crawler = $this->client->request('GET', '/authors');
        $this->assertTextFound($crawler, "There are no authors, let's create some!!");
    }

    public function testIndexWithAuthors()
    {
        $this->createAuthors(10);
        $crawler = $this->client->request('GET', '/authors');
        $this->assertTextNotFound($crawler, "There are no authors, let's create some!!");
        $this->assertSame(
            8,
            substr_count($crawler->html(), 'Name'),
            "We should find 8 authors listed"
        );
    }

    public function testCreateAuthorGetRequest()
    {
        $crawler = $this->client->request('GET', '/authors/create');
        $this->assertTextNotFound($crawler, "Author Created!");
        $this->assertTextFound($crawler, 'Name');
    }

    public function testCreateAuthorPostRequestNoData()
    {
        $crawler = $this->client->request('POST', '/authors/create');
        $this->assertTextNotFound($crawler, "Author Created!");
        $this->assertTextFound($crawler, 'Name');
    }

    protected function createAuthors($count)
    {
        for ($i = 0; $i < $count; ++$i) {
            $author = new Author();
            $author->setName("Name{$i}");
            $this->entityManager()->persist($author);
        }
        $this->entityManager()->flush();
    }

}
