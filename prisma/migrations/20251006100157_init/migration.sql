-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'INGENIEUR', 'TECHNICIEN', 'INVESTISSEUR');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nom" TEXT,
    "prenom" TEXT,
    "role" "Role" NOT NULL DEFAULT 'INVESTISSEUR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Champ" (
    "id" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "superficie" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "coordonnees" TEXT,
    "clerkRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Champ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompteExploitation" (
    "id" TEXT NOT NULL,
    "champId" TEXT NOT NULL,
    "numeroProduit" TEXT NOT NULL,
    "superficie" TEXT NOT NULL,
    "typeProduction" TEXT NOT NULL,
    "nomChamp" TEXT NOT NULL,
    "clerkRef" TEXT,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompteExploitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operation" (
    "id" TEXT NOT NULL,
    "compteExploitationId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "dateDebutPrevu" TIMESTAMP(3) NOT NULL,
    "dateFinPrevu" TIMESTAMP(3) NOT NULL,
    "dateDebutReel" TIMESTAMP(3),
    "dateFinReel" TIMESTAMP(3),
    "commentaire" TEXT,
    "coutPrevu" DOUBLE PRECISION NOT NULL,
    "coutReel" DOUBLE PRECISION,
    "clerkRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_clerkId_key" ON "Profile"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- AddForeignKey
ALTER TABLE "Champ" ADD CONSTRAINT "Champ_clerkRef_fkey" FOREIGN KEY ("clerkRef") REFERENCES "Profile"("clerkId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompteExploitation" ADD CONSTRAINT "CompteExploitation_champId_fkey" FOREIGN KEY ("champId") REFERENCES "Champ"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompteExploitation" ADD CONSTRAINT "CompteExploitation_clerkRef_fkey" FOREIGN KEY ("clerkRef") REFERENCES "Profile"("clerkId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_compteExploitationId_fkey" FOREIGN KEY ("compteExploitationId") REFERENCES "CompteExploitation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_clerkRef_fkey" FOREIGN KEY ("clerkRef") REFERENCES "Profile"("clerkId") ON DELETE SET NULL ON UPDATE CASCADE;
