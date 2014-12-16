<?php

namespace Kodify\BlogBundle\Controller;

use Kodify\BlogBundle\Entity\Post;
use Kodify\BlogBundle\Form\Type\PostType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class PostsController extends Controller
{
    public function indexAction()
    {
        $posts      = $this->getDoctrine()->getRepository('KodifyBlogBundle:Post')->latest();
        $template   = 'KodifyBlogBundle:Post:List/empty.html.twig';
        $parameters = ['breadcrumbs' => ['home' => 'Home']];
        if (count($posts)) {
            $template            = 'KodifyBlogBundle:Post:List/index.html.twig';
            $parameters['posts'] = $posts;
        }

        return $this->render($template, $parameters);
    }

    public function createAction(Request $request)
    {
        $form = $this->createForm(new PostType(), new Post());
        $form->handleRequest($request);
        if($form->isValid()){
            die('valid!!');
        }
        return $this->render('KodifyBlogBundle:Post:create.html.twig', ['form' => $form->createView()]);
    }
}
