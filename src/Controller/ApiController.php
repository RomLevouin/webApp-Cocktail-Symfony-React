<?php

namespace App\Controller;

use App\Repository\CocktailRepository;
use App\Entity\Cocktail;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    private $entityManager;
    private $cocktailRepository;

    public function __construct(EntityManagerInterface $entityManager, CocktailRepository $cocktailRepository)
    {
        $this->cocktailRepository = $cocktailRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/api/cocktails', name: 'api_cockails', methods: ["HEAD", "GET"])]
    public function cocktails(): JsonResponse
    {
        $repository = $this->entityManager->getRepository(Cocktail::class);

        $query = $repository->createQueryBuilder('e')
            ->addOrderBy('e.alcool', false) // Place null values at the beginning
            ->getQuery();

        $results = $query->getResult();

        return $this->json($results, Response::HTTP_OK, []);
    }

    #[Route('/api/cocktail/{id}', name: 'api_cockails_detail', methods: ["HEAD", "GET"])]
    public function cocktailDetail(String $id): JsonResponse
    {
        $cocktail_id = $this->cocktailRepository->find($id);

        return $this->json($cocktail_id, Response::HTTP_OK, [$id]);
    }
    
}