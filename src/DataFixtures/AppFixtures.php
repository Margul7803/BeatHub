<?php

namespace App\DataFixtures;

use App\Entity\Album;
use App\Entity\Artiste;
use App\Entity\Genre;
use App\Entity\Musique;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Uid\Uuid;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $genres = ["Rap", "Pop", "Rock", "Jazz", "Reggae", "Country", "Hip Hop", "Classique", "Funk", "Electro"];
        $names = [
            "Alice",
            "Bob",
            "Charlie",
            "David",
            "Eva",
            "Frank",
            "Grace",
            "Hannah",
            "Isaac",
            "Julia",
            "Kevin",
            "Lily",
            "Michael",
            "Nora",
            "Olivia",
            "Peter",
            "Quinn",
            "Rachel",
            "Samuel",
            "Taylor",
            "Ursula",
            "Victor",
            "Wendy",
            "Xavier",
            "Yvonne",
            "Zachary"
        ];
        $albumNames = [
            "Dark Side of the Moon",
            "Abbey Road",
            "Thriller",
            "The Wall",
            "Nevermind",
            "Hotel California",
            "Back in Black",
            "Rumours",
            "Led Zeppelin IV",
            "The Joshua Tree",
            "Sgt. Pepper's Lonely Hearts Club Band",
            "Born to Run",
            "Pet Sounds",
            "A Night at the Opera",
            "Blood on the Tracks",
            "OK Computer",
            "Hunky Dory",
            "Achtung Baby",
            "The Rise and Fall of Ziggy Stardust and the Spiders from Mars",
            "Bridge over Troubled Water",
            "Goodbye Yellow Brick Road",
            "The Chronic",
            "Exile on Main St.",
            "In the Court of the Crimson King",
            "Kind of Blue",
            "The Velvet Underground & Nico"
        ];
        $songNames = [
            "Bohemian Rhapsody",
            "Stairway to Heaven",
            "Imagine",
            "Like a Rolling Stone",
            "Hey Jude",
            "Hallelujah",
            "Hotel California",
            "Let It Be",
            "Smells Like Teen Spirit",
            "Yesterday",
            "Wonderwall",
            "Billie Jean",
            "Purple Haze",
            "All Along the Watchtower",
            "Brown Eyed Girl",
            "Sweet Child o' Mine",
            "I Will Always Love You",
            "Blackbird",
            "Every Breath You Take",
            "No Woman, No Cry",
            "Born to Run",
            "I Want to Hold Your Hand",
            "The Sound of Silence",
            "Wish You Were Here",
            "Blowin' in the Wind",
            "Bridge Over Troubled Water"
        ];
        function randomDate()
        {
            $startDate = strtotime('2022-01-01'); // Date de début
            $endDate = strtotime('2023-12-31'); // Date de fin
            $randomTimestamp = rand($startDate, $endDate);

            // Convertir le timestamp en objet DateTime
            $randomDate = new \DateTime();
            $randomDate->setTimestamp($randomTimestamp);
            return $randomDate;
        }
        for ($i = 0; $i < 10; $i++) {
            $genre = new Genre();
            $genre->setLibelle($genres[$i]);
            $manager->persist($genre);
            $artiste = new Artiste();
            $artiste->setNom($names[$i]);
            $artiste->setGenre($genres[rand(0, 9)]);
            $artiste->setBio("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
            $artiste->setreseau("Insta, Youtube, Facebook");
            $manager->persist($artiste);
            $album = new Album();
            $album->setNom($albumNames[$i]);
            $album->setImage("Image $albumNames[$i]");
            $album->setDateSortie(randomDate());
            $manager->persist($album);
            $musique = new Musique();
            $musique->settitre($songNames[$i]);
            $musique->setduree(rand(1, 3) * 60);
            $musique->setDateSortie(randomDate());
            $musique->setParole("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
            $musique->setGenre($genre);
            $musique->setAlbum($album);
            $musique->addArtiste($artiste);
            $manager->persist($musique);
        }

        $manager->flush();
    }
}
