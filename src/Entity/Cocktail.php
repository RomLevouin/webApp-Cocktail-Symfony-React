<?php

namespace App\Entity;

use App\Repository\CocktailRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CocktailRepository::class)]
class Cocktail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $ingredients = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $Image = null;

    #[ORM\Column(length: 255)]
    private ?string $preparation = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column]
    private ?bool $shaker = null;

    #[ORM\Column(length: 255)]
    private ?string $shakerimage = null;

    #[ORM\Column]
    private ?bool $alcool = null;

    #[ORM\OneToMany(mappedBy: 'cocktail_id', targetEntity: Cl::class)]
    private Collection $cls;

    public function __construct()
    {
        $this->cls = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getIngredients(): ?string
    {
        return $this->ingredients;
    }

    public function setIngredients(string $ingredients): static
    {
        $this->ingredients = $ingredients;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->Image;
    }

    public function setImage(?string $Image): static
    {
        $this->Image = $Image;

        return $this;
    }

    public function getPreparation(): ?string
    {
        return $this->preparation;
    }

    public function setPreparation(string $preparation): static
    {
        $this->preparation = $preparation;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function isShaker(): ?bool
    {
        return $this->shaker;
    }

    public function setShaker(bool $shaker): static
    {
        $this->shaker = $shaker;

        return $this;
    }

    public function getShakerimage(): ?string
    {
        return $this->shakerimage;
    }

    public function setShakerimage(string $shakerimage): static
    {
        $this->shakerimage = $shakerimage;

        return $this;
    }

    public function isAlcool(): ?bool
    {
        return $this->alcool;
    }

    public function setAlcool(bool $alcool): static
    {
        $this->alcool = $alcool;

        return $this;
    }

    /**
     * @return Collection<int, Cl>
     */
    public function getCls(): Collection
    {
        return $this->cls;
    }

    public function addCl(Cl $cl): static
    {
        if (!$this->cls->contains($cl)) {
            $this->cls->add($cl);
            $cl->setCocktailId($this);
        }

        return $this;
    }

    public function removeCl(Cl $cl): static
    {
        if ($this->cls->removeElement($cl)) {
            // set the owning side to null (unless already changed)
            if ($cl->getCocktailId() === $this) {
                $cl->setCocktailId(null);
            }
        }

        return $this;
    }

}
