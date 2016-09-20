<?php
namespace Kodify\BlogBundle\Tests\Form\Type;

use Kodify\BlogBundle\Form\Type\PostType;
use Kodify\BlogBundle\Entity\Post;
use Symfony\Component\Form\Test\TypeTestCase;

class PostTypeTest extends TypeTestCase
{
    public function testSubmitValidData()
    {
        $formData = array(
            'title'   => 'test',
            'content' => 'testcontent',
            'author'  => 1,
        );
        $type = new PostType();
        $form = $this->factory->create($type);

        $object = new Post();
        $object->setTitle('test');
        $object->setContent('testcontent');
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
