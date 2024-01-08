<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface; // Importez la classe EntityManagerInterface
use App\Entity\Musique; // Importez la classe Musique

class DashboardController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/dashboard', name: 'app_dashboard')]
    public function index(): Response
    {
        // Récupérez les données de la base de données (par exemple, toutes les musiques)
        $musiques = $this->entityManager->getRepository(Musique::class)->findAll();

        return $this->render('Dashboard/acceuil.html.twig', [
            'controller_name' => 'DashboardController',
            'musiques' => $musiques, // Transmettez les musiques à la vue
        ]);
    }
}