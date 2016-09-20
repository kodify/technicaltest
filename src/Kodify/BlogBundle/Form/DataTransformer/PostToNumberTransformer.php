<?php

namespace Kodify\BlogBundle\Form\DataTransformer;

use Doctrine\ORM\EntityManagerInterface;
use Kodify\BlogBundle\Entity\Post;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

class PostToNumberTransformer implements DataTransformerInterface
{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Transforms an object (post) to a string (number).
     *
     * @param  Post $post
     * @return string
     */
    public function transform($post)
    {
        if (null === $post) {
            return '';
        }

        return $post->getId();
    }

    /**
     * Transforms a string (number) to an object (post).
     *
     * @param  string $postNumber
     * @return Post|null
     * @throws TransformationFailedException if object (post) is not found.
     */
    public function reverseTransform($postNumber)
    {
        // no post number? It's optional, so that's ok
        if (!$postNumber) {
            return;
        }

        $post = $this->entityManager->getRepository('KodifyBlogBundle:Post')->find($postNumber);

        if (null === $post) {
            // causes a validation error
            // this message is not shown to the user
            // see the invalid_message option
            throw new TransformationFailedException(
                sprintf(
                    'An post with number "%s" does not exist!',
                    $postNumber
                )
            );
        }

        return $post;
    }

}
