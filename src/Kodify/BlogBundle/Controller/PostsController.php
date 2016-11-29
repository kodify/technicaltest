<?php

namespace Kodify\BlogBundle\Controller;

use Kodify\BlogBundle\Entity\Comment;
use Kodify\BlogBundle\Entity\Post;
use Kodify\BlogBundle\Form\Type\CommentType;
use Kodify\BlogBundle\Form\Type\PostType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class PostsController
 * @package Kodify\BlogBundle\Controller
 */
class PostsController extends ReactController
{
    /**
     * Show 5 post where 5 is the limit defined in PostRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request)
    {
        $posts = $this->getDoctrine()->getRepository('KodifyBlogBundle:Post')->latest();
        $serializer = $this->get('serializer');

        return $this->render('base.html.twig', ['props' => $serializer->serialize(
            array_merge(
                $this->getBaseProps($request),
                ['posts' => $posts]
            )
            ,'json')
        ]);
    }

    public function apiPostsAction()
    {
        $serializer = $this->get('serializer');
        $posts = $this->getDoctrine()->getRepository('KodifyBlogBundle:Post')->latest();

        return new Response($serializer->serialize($posts,'json'),200);
    }

    /**
     * Show post title, content and latest 10 comments identified by $id and create comment form
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function viewAction($id, Request $request)
    {
        $serializer = $this->get('serializer');
        $currentPost = $this->getDoctrine()->getRepository('KodifyBlogBundle:Post')->find($id);

        if (!$currentPost instanceof Post) {
            throw $this->createNotFoundException('Post not found');
        }

        return $this->render('base.html.twig', ['props' => $serializer->serialize(
            array_merge(
                $this->getBaseProps($request),
                ['post' => $currentPost]
            )
            ,'json')
        ]);
    }

    public function apiPostAction($id)
    {
        $currentPost = $this->getDoctrine()->getRepository('KodifyBlogBundle:Post')->find($id);
        $serializer = $this->get('serializer');

        if (!$currentPost instanceof Post) {
            throw $this->createNotFoundException('Post not found');
        }

        return new Response($serializer->serialize($currentPost,'json'),200);
    }

    public function createAction(Request $request)
    {
        $serializer = $this->get('serializer');

        $authors = $this->getDoctrine()->getRepository('KodifyBlogBundle:Author')->findAll();

        return $this->render('base.html.twig', ['props' => $serializer->serialize(
            array_merge(
                $this->getBaseProps($request),
                array('authors' => $authors)
            )
            ,'json')
        ]);
    }

    public function apiCreatePostAction(Request $request)
    {
        $content = $this->getContentAsArray($request);
        $serializer = $this->get('serializer');

        $manager = $this->getDoctrine()->getManager();
        $post = new Post();
        $post->setTitle($content['title']);
        $post->setAuthor($manager->getReference('KodifyBlogBundle:Author',$content['author']));
        $post->setContent($content['content']);
        $manager->persist($post);
        $manager->flush();

        return new Response($serializer->serialize($post,'json'),200);
    }
}
