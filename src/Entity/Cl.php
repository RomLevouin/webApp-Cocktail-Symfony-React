<?php

namespace App\Entity;

use App\Repository\ClRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClRepository::class)]
class Cl
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $value = null;

    #[ORM\ManyToOne(inversedBy: 'cls')]
    private ?cocktail $cocktail_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValue(): ?int
    {
        return $this->value;
    }

    public function setValue(int $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getCocktailId(): ?cocktail
    {
        return $this->cocktail_id;
    }

    public function setCocktailId(?cocktail $cocktail_id): static
    {
        $this->cocktail_id = $cocktail_id;

        return $this;
    }
}
