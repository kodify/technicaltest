<?php

namespace Kodify\BlogBundle\Controller;

use Kodify\BlogBundle\Entity\Comment;
use Kodify\BlogBundle\Entity\Post;
use Kodify\BlogBundle\Form\Type\CommentType;
use Kodify\BlogBundle\Form\Type\PostType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class PostsController
 * @package Kodify\BlogBundle\Controller
 */
class PostsController extends Controller
{
    /**
     * Show 5 post where 5 is the limit defined in PostRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        $posts = $this->getDoctrine()->getRepository('KodifyBlogBundle:Post')->latest();

        return $this->render('KodifyBlogBundle::Post/list.html.twig', array('posts' => $posts));
    }

    /**
     * Show post title, content and latest 10 comments identified by $id and create comment form
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function viewAction($id)
    {
        $currentPost = $this->getDoctrine()->getRepository('KodifyBlogBundle:Post')->find($id);
        if (!$currentPost instanceof Post) {
            throw $this->createNotFoundException('Post not found');
        }
        //Create new object Comment and set the attribute post to make easier the creation of a new comment
        $newComment = new Comment();
        $newComment->setPost($currentPost);
        $formComment = $this->createForm(
            new CommentType(),
            $newComment,
            [
                'action'           => $this->generateUrl('create_comment', ['id' => $currentPost->getId()]),
                'method'           => 'POST',
                'post_transformer' => $this->get('kodify_blog.form.data_transformer.post_to_number'),
            ]
        );
        $parameters = [
            'post'        => $currentPost,
            'formComment' => $formComment->createView(),
        ];

        return $this->render('KodifyBlogBundle::Post/view.html.twig', $parameters);
    }

    public function createAction(Request $request)
    {
        $form = $this->createForm(
            new PostType(),
            new Post(),
            [
                'action' => $this->generateUrl('create_post'),
                'method' => 'POST',
            ]
        );

        $parameters = [];

        $form->handleRequest($request);
        if ($form->isValid()) {
            $post = $form->getData();
            $this->getDoctrine()->getManager()->persist($post);
            $this->getDoctrine()->getManager()->flush();
            $parameters['message'] = 'Post Created!';
        }

        // the form element should be passed to the view after validate it to show errors
        $parameters['form'] = $form->createView();

        return $this->render('KodifyBlogBundle:Default:create.html.twig', $parameters);
    }
}
