<?php
namespace Kodify\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ReactController extends Controller
{
    protected function getBaseProps(Request $request)
    {
        return array(
            'baseUrl'  => $this->generateUrl('home'),
            'location' => $request->getRequestUri(),
        );
    }

    protected function getContentAsArray(Request $request){
        $content = $request->getContent();

        if(empty($content)){
            throw new BadRequestHttpException("Content is empty");
        }

        return json_decode($content, true);
    }
}
