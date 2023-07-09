<?php

namespace App\Controller;

use App\Entity\Cocktail;
use App\Repository\CocktailRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class HomeController extends AbstractController
{
    private $cocktailRepository;
    
    public function __construct(private readonly EntityManagerInterface $em, CocktailRepository $cocktailRepository)
    {
        $this->cocktailRepository = $cocktailRepository;
    }

    #[Route('/', name: 'app_home')]
    public function index(): Response
    {

        return $this->render('home/index.html.twig', []);
    }

    #[Route('/cocktail/{id}', name: 'cocktail_detail', methods: ["HEAD", "GET"])]
    public function showCocktailDetail(Cocktail $cocktail): Response
    {

        return $this->render('home/detail.html.twig', [
            'cocktail' => $cocktail
        ]);
    }
}
