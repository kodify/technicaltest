<?php

namespace Kodify\BlogBundle\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class BaseFunctionalTest extends WebTestCase
{
    protected $entityManager;
    protected $client;

    public function setUp()
    {
        $this->client = static::createClient();
        $this->cleanDb();
    }

    public function tearDown()
    {
        $this->cleanDb();
    }

    protected function cleanDb()
    {
        $this->clearTableByName('Author');
        $this->clearTableByName('Post');
    }

    protected function entityManager()
    {
        if ($this->entityManager == null) {
            $this->entityManager = static::$kernel->getContainer()->get('doctrine')->getManager();
        }

        return $this->entityManager;
    }

    protected function clearTableByName($tableName)
    {
        $connection = $this->entityManager()->getConnection();
        $dbPlatform = $connection->getDatabasePlatform();
        $connection->beginTransaction();
        try {
            $connection->query('SET FOREIGN_KEY_CHECKS=0');
            $q = $dbPlatform->getTruncateTableSql($tableName);
            $connection->executeUpdate($q);
            $connection->query('SET FOREIGN_KEY_CHECKS=1');
            $connection->commit();
        } catch (\Exception $e) {
            $connection->rollback();
        }
    }

    protected function assertTextFound($crawler, $text, $times = 1, $message = '')
    {
        if ($message == '') {
            $message = "{$text} did not appear {$times} times";
        }
        $this->assertSame(
            $times,
            $crawler->filter('html:contains("' . $text . '")')->count(),
            $message
        );
    }

    protected function assertTextNotFound($crawler, $text, $message = null)
    {
        if (is_null($message)) {
            $message = "{$text} Should not appear on the page";
        }

        return $this->assertTextFound($crawler, $text, 0, $message);
    }
}
