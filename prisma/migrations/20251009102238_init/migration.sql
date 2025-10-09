-- DropForeignKey
ALTER TABLE "public"."Operation" DROP CONSTRAINT "Operation_compteExploitationId_fkey";

-- AlterTable
ALTER TABLE "Operation" ADD COLUMN     "description" TEXT,
ADD COLUMN     "ecart" DOUBLE PRECISION,
ADD COLUMN     "statut" BOOLEAN DEFAULT false,
ALTER COLUMN "nom" DROP NOT NULL,
ALTER COLUMN "dateDebutPrevu" DROP NOT NULL,
ALTER COLUMN "dateFinPrevu" DROP NOT NULL,
ALTER COLUMN "coutPrevu" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ChargesFixes" (
    "id" TEXT NOT NULL,
    "clerkRef" TEXT,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "montant" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChargesFixes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_compteExploitationId_fkey" FOREIGN KEY ("compteExploitationId") REFERENCES "CompteExploitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargesFixes" ADD CONSTRAINT "ChargesFixes_clerkRef_fkey" FOREIGN KEY ("clerkRef") REFERENCES "Profile"("clerkId") ON DELETE SET NULL ON UPDATE CASCADE;
