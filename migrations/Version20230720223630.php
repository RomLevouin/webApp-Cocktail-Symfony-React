<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230720223630 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cl ADD cocktail_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE cl ADD CONSTRAINT FK_4B0D07E8570B8DB6 FOREIGN KEY (cocktail_id_id) REFERENCES cocktail (id)');
        $this->addSql('CREATE INDEX IDX_4B0D07E8570B8DB6 ON cl (cocktail_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cl DROP FOREIGN KEY FK_4B0D07E8570B8DB6');
        $this->addSql('DROP INDEX IDX_4B0D07E8570B8DB6 ON cl');
        $this->addSql('ALTER TABLE cl DROP cocktail_id_id');
    }
}
