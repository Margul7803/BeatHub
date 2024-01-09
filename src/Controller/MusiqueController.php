<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Musique;


class MusiqueController extends AbstractController
{
    #[Route('/musiques', name: 'list_musiques', methods: ['GET'])]
    public function listMusiques(ManagerRegistry $orm): Response
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

        // Utilisez la classe Response pour retourner une réponse classique
        return new Response(json_encode($musiquesArray), 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/musiques/{id}', name: 'list_musiques_albums', methods: ['GET'])]
    public function listMusiquesAlb(ManagerRegistry $orm, $id): Response
    {
        $musiques = $orm->getRepository(Musique::class)->findAll();
        $musiquesArray = [];
        foreach ($musiques as $musique) {
            $alb = $musique->getAlbum();
            if ($alb->getId() == $id) {
                $musiquesArray[] = [
                    'id' => $musique->getId(),
                    'titre' => $musique->getTitre(),
                    'duree' => $musique->getDuree(),
                    'dateSortie' => $musique->getDateSortie()->format('Y-m-d'),
                    'parole' => $musique->getParole(),
                ];
            }
        }

        // Utilisez la classe Response pour retourner une réponse classique
        return $this->render('musique/index.html.twig',
                            ['liste' => $musiquesArray]);
    }
}

