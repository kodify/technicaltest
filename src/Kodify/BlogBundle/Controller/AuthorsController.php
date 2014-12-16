<?php

namespace Kodify\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AuthorsController extends Controller
{
    public function indexAction()
    {
        $authors    = $this->getDoctrine()->getRepository('KodifyBlogBundle:Author')->latest();
        $template   = 'KodifyBlogBundle:Author:List/empty.html.twig';
        $parameters = ['breadcrumbs' => ['home' => 'Home', 'authors' => 'Authors']];
        if (count($authors)) {
            $template              = 'KodifyBlogBundle:Author:List/index.html.twig';
            $parameters['authors'] = $authors;
        }

        return $this->render($template, $parameters);
    }
}
