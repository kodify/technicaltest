<?php

namespace Kodify\BlogBundle\Controller;

use Kodify\BlogBundle\Entity\Author;
use Kodify\BlogBundle\Form\Type\AuthorType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Class AuthorsController
 * @package Kodify\BlogBundle\Controller
 */
class AuthorsController extends ReactController
{
    /**
     * Function to create a new author
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function createAction(Request $request)
    {
        $serializer = $this->get('serializer');

        return $this->render('base.html.twig', ['props' => $serializer->serialize(
                $this->getBaseProps($request)
            ,'json')
        ]);
    }

    public function apiCreateAuthorAction(Request $request)
    {
        $content = $this->getContentAsArray($request);
        $serializer = $this->get('serializer');

        if(empty($content['authorName']))
        {
            throw new BadRequestHttpException("Invalid author name");
        }

        $manager = $this->getDoctrine()->getManager();
        $author = new Author($content['authorName']);
        $manager->persist($author);
        $manager->flush();

        return new Response(
            $serializer->serialize($author,'json'),
            Response::HTTP_OK,
            array('Content-Type' => 'application/json')
        );
    }

    public function apiAuthorsAction()
    {
        $serializer = $this->get('serializer');
        $authors = $this->getDoctrine()->getRepository('KodifyBlogBundle:Author')->findAll();

        return new Response(
            $serializer->serialize($authors,'json'),
            Response::HTTP_OK,
            array('Content-Type' => 'application/json')
        );
    }
}
