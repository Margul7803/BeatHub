<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Musique;


class MusiqueController extends AbstractController
{
    #[Route('/musiques', name: 'list_musiques', methods: ['GET'])]
    public function listMusiques(ManagerRegistry $orm): JsonResponse
    {
        $musiques = $orm->getRepository(Musique::class)->findAll();
        $musiquesArray = [];
        foreach ($musiques as $musique) {
            $musiquesArray[] = [
                'id' => $musique->getId(),
                'titre' => $musique->getTitre(),
                'duree' => $musique->getDuree(),
                'dateSortie' => $musique->getDateSortie()->format('Y-m-d'),
                'parole' => $musique->getParole(),
            ];
        }
        return $this->json($musiquesArray);
    }

    #[Route('/musiques/{id}', name: 'list_musiques_albums', methods: ['GET'])]
    public function listMusiquesAlb(ManagerRegistry $orm, $id): JsonResponse
    {
        $musiques = $orm->getRepository(Musique::class)->findAll();
        $musiquesArray = [];
        foreach ($musiques as $musique) {
            $alb = $musique->getAlbum();
            if ($alb->getId() == $id){
            $musiquesArray[] = [
                'id' => $musique->getId(),
                'titre' => $musique->getTitre(),
                'duree' => $musique->getDuree(),
                'dateSortie' => $musique->getDateSortie()->format('Y-m-d'),
                'parole' => $musique->getParole(),
            ];
        }
        }
        
        return $this->json($musiquesArray);
    }
}

