<?php

namespace Kodify\BlogBundle\Controller;

use Kodify\BlogBundle\Entity\Author;
use Kodify\BlogBundle\Form\Type\AuthorType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class AuthorsController
 * @package Kodify\BlogBundle\Controller
 */
class AuthorsController extends Controller
{
    /**
     * Show 5 authors where 5 is the limit defined in AuthorRepository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        $authors = $this->getDoctrine()->getRepository('KodifyBlogBundle:Author')->latest();

        return $this->render('KodifyBlogBundle::Author/list.html.twig', array('authors' => $authors));
    }

    /**
     * Function to create a new author
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function createAction(Request $request)
    {
        $form = $this->createForm(
            new AuthorType(),
            new Author(),
            [
                'action' => $this->generateUrl('create_author'),
                'method' => 'POST',
            ]
        );
        $parameters = [];

        $form->handleRequest($request);
        if ($form->isValid()) {
            $author = $form->getData();
            $this->getDoctrine()->getManager()->persist($author);
            $this->getDoctrine()->getManager()->flush();
            $parameters['message'] = 'Author Created!';
        }

        // the form element should be passed to the view after validate it to show errors
        $parameters['form'] = $form->createView();

        return $this->render('KodifyBlogBundle:Default:create.html.twig', $parameters);
    }
}
