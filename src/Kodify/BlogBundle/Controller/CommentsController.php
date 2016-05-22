<?php

namespace Kodify\BlogBundle\Controller;

use Kodify\BlogBundle\Entity\Comment;
use Kodify\BlogBundle\Entity\Post;
use Kodify\BlogBundle\Form\Handler\CommentCreateHandler;
use Kodify\BlogBundle\Form\Type\CommentType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class CommentsController extends Controller
{
    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function createAction(Request $request, Post $post)
    {
        $form = $this->createForm(
            new CommentType(),
            new Comment(),
            [
                'action' => $this->generateUrl('create_comment', ['id' => $post->getId()]),
                'method' => 'POST',
                'post_transformer' => $this->get('kodify_blog.form.data_transformer.post_to_number')
            ]
        );
        $parameters = [
            'form'        => $form->createView(),
            'breadcrumbs' => ['home' => 'Home']
        ];

        /** @var CommentCreateHandler $handler */
        $handler = $this->get('kodify.blog.create_comment');

        if ($handler->process($request, $form)) {
            //save success message to show it on post view
            $request->getSession()->getFlashBag()->add('comment-success', 'Comment Created!');

            //if everything goes well redirect to the comments area in the post
            $viewPostUrl = $this->generateUrl('view_post', ['id' => $post->getId()]). '#comments-area';

            return $this->redirect($viewPostUrl);
        }

        return $this->render('KodifyBlogBundle:Default:create.html.twig', $parameters);
    }
}
