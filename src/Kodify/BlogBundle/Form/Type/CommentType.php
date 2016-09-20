<?php
namespace Kodify\BlogBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CommentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('text')
            ->add('post', 'hidden')
            ->add('author')
            ->add('save', 'submit', ['attr' => ['class' => 'btn btn-success']]);
        //add data transformer to use post as hidden type
        if (isset($options['post_transformer'])) {
            $builder->get('post')->addModelTransformer($options['post_transformer']);
        }
    }

    public function getName()
    {
        return 'comment';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        //added option to pass post_transformer service
        $resolver->setDefaults(
            [
                'post_transformer' => null,
            ]
        );
    }


}
