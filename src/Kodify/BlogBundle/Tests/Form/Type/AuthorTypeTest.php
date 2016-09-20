<?php
namespace Kodify\BlogBundle\Tests\Form\Type;

use Kodify\BlogBundle\Form\Type\AuthorType;
use Kodify\BlogBundle\Entity\Author;
use Symfony\Component\Form\Test\TypeTestCase;

class AuthorTypeTest extends TypeTestCase
{
    public function testSubmitValidData()
    {
        $formData = array(
            'name' => 'test',
        );
        $type = new AuthorType();
        $form = $this->factory->create($type);

        $object = new Author();
        $object->setName('test');
        $form->submit($formData);
        $this->assertTrue($form->isSynchronized());
        $this->assertEquals($formData, $form->getData());

        $view = $form->createView();
        $children = $view->children;

        foreach (array_keys($formData) as $key) {
            $this->assertArrayHasKey($key, $children);
        }
    }
}
