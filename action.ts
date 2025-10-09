"use server"

import prisma from "./lib/prisma";
import { ChampFormData, ChargesFixesForm, CompteExploitationFrom, EditForm, OperationForm } from "./type";

// Verification et creation du profile utilisateur

export async function checkUser( email : string, nom : string, prenom: string, clerkId : string) {

  if(!email || !nom || !clerkId) return

  try {

    const existingUser = await prisma.profile.findUnique({
      where : {
        email : email
      }
    })

    if (!existingUser && nom ) {
      await prisma.profile.create({
        data : {
          clerkId,
          email, 
          prenom,
          nom,
          role : "ADMIN",
        }
      });
      console.log(`✅ Profil créé : ${prenom} ${nom} (${email})`);
    }
    else {
      console.log(`Profil déjà existant pour ${email}`);
    }
      
      
  } catch (error) {

    console.error("❌ Erreur lors de la vérification du profil :", error);
  }
}

export async function getUser(clerkId : string) {

  if(!clerkId) return

  try {

    const existingUser = await prisma.profile.findUnique({
      where : {
        clerkId : clerkId
      }
    })

      
    console.log(`✅ Profil retouver avec le clerId N0: ${clerkId})`);
  
    return existingUser
      
  } catch (error) {

    console.error("❌ Erreur lors de la vérification du profil :", error);
  }
}



// Creation, affichage, modification et suppression d'un champs


// Creer
export async function createChamps( userId : string, formData: ChampFormData) {

  const {nom, village, superficie, coordonnees, imageUrl} = formData ;

  if (!nom || !village || !superficie) {
    throw new Error("❌ Veuillez fournir toutes les informations nécessaires pour la création du champ.");
  }

  try {
    const safeImageUrl = imageUrl || "./champs.jpeg" ;
    const user = await getUser(userId);

    if (!user) {
      throw new Error("❌ Aucun utilisateur trouvé avec cet identifiant Clerk.");
    }

    await prisma.champ.create({
      data: {
        nom,
        village,
        superficie,
        coordonnees,
        imageUrl : safeImageUrl,
        clerkRef: user.clerkId, 
      },

    });

    console.log(`✅ Nouveau champ créé avec succès.`);

  } catch (error) {

    console.error("Erreur lors de la création du champ :", error);
    throw error;
  }
}

// Afficher
export async function getChampsByUser(userId: string) : Promise<ChampFormData[] | undefined> {
    
  if (!userId) {
    throw new Error("Aucun champs trouver pour cet utilisateur.");
  }

  const user = await getUser(userId);
  if (!user) return [];


  if (user){

    try {
      const champs = await prisma.champ.findMany({
        where: { 
          clerkRef: userId 
        },
        orderBy: { 
          createdAt: "desc" 
        },
      })as ChampFormData[]; 

      return champs.map((champ) => ({
        id: champ.id,
        nom: champ.nom,
        village: champ.village,
        superficie: champ.superficie,
        coordonnees: champ.coordonnees ?? undefined,
        imageUrl : champ.imageUrl,
      }));

    } catch (error) {

      console.error(error)
      return [];
    }
  }
}

//Modifier
export async function updateChamp(formData: ChampFormData) {
  if (!formData.id) throw new Error("❌ ID du champ manquant pour la modification.");

  const { nom, village, superficie, coordonnees } = formData;

  try {
    await prisma.champ.update({
      where: { id: formData.id }, // <- utilise directement formData.id
      data: {
        nom,
        village,
        superficie,
        coordonnees,
        updatedAt: new Date(),
      },
    });

    console.log(`✅ Champ ${formData.id} mis à jour avec succès`);
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du champ :", error);
    throw error;
  }
}



// Supprimer
export async function deleteChamp(champId : string) {
    if (!champId) throw new Error("❌ ID du champ manquant pour la suppression.");

    try {
      await prisma.champ.delete({
        where: { id: champId },
      });
    } catch (error) {
        
      console.error(error)
    }

}




// ------------ Compte Exploitation ------------


// Creation, affichage, modification et suppression d'un compte exploitation


// Creation
export async function createCompteExploitation(
  userId: string,
  champId: string,
  formData: CompteExploitationFrom,

) {
  const { nomProduit, nomChamp, numeroProduit, superficie, dateDebut, dateFin, typeProduction } = formData;

  if (!numeroProduit || !nomChamp || !superficie || !typeProduction || !dateDebut || !dateFin) {

    throw new Error("❌ Veuillez fournir toutes les informations nécessaires pour la création du compte d'exploitation.");
  }

  try {

    const user = await getUser(userId);

    if (!user) {
      throw new Error("❌ Aucun utilisateur trouvé avec cet identifiant Clerk.");
    }

    const compte = await prisma.compteExploitation.create({
      data: {
        champId,
        numeroProduit, 
        superficie,
        typeProduction,
        nomChamp,
        clerkRef: user.clerkId,
        dateDebut: new Date(dateDebut), 
        dateFin: new Date(dateFin), 
      },
    });

    console.log("✅ Nouveau compte d'exploitation créé avec succès :");

    return compte;

  } catch (error) {

    console.error("🚨 Erreur lors de la création du compte d'exploitation :", error);
    throw error;
  }
}


// Modifier
export async function updateCompExploitation(
  id: string,
  editForm: EditForm,
) {
  const { numeroProduit, superficie, dateDebut, dateFin, typeProduction, nomProduit, champId, champName } = editForm;


  if(!champId || !numeroProduit || !superficie || !dateDebut || !dateFin || !typeProduction || !champName){

    throw new Error("Les informations de mise a jour sont incorrectes ✖️🚫");
 
  }

  if (!id) throw new Error("❌ L'ID du compte d'exploitation est requis. ABCD");

  try {
    const compte = await prisma.compteExploitation.update({
      where: { id },
      data: {
        champId,
        numeroProduit,
        superficie,
        typeProduction,
        nomChamp : champName,
        dateDebut: dateDebut ? new Date(dateDebut) : undefined,
        dateFin: dateFin ? new Date(dateFin) : undefined,
        nomProduit,
      },
    });

    console.log("✅ Compte d'exploitation mis à jour :", compte.id);
    return compte;
  } catch (error) {
    console.error("🚨 Erreur lors de la mise à jour du compte d'exploitation :", error);
    throw error;
  }
}


// Supprimer
export async function deleteCompteExploitation(id: string) {
  if (!id) throw new Error("❌ L'ID du compte d'exploitation est requis.");

  try {
    const compte = await prisma.compteExploitation.delete({
      where: { id },
    });

    console.log("🗑️ Compte d'exploitation supprimé avec succès :", compte.id);
    return compte;
  } catch (error) {
    console.error("🚨 Erreur lors de la suppression du compte d'exploitation :", error);
    throw error;
  }
}


// Afficher
export async function getCompteExploitationById(userId: string) {

  if (!userId) throw new Error("❌ L'ID de l'utilisateur est requis afficher vos compte d'exploitation.");

  try {

    const comptes = await prisma.compteExploitation.findMany({
      where: { clerkRef : userId }, 
      include: {
        champ: true,
        profile: true,
        operations: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!comptes || comptes.length === 0) {
      throw new Error("❌ Aucun compte d'exploitation trouvé pour cet utilisateur.");
    }

    return comptes;

  } catch (error) {

    console.error("🚨 Erreur lors de la récupération du compte d'exploitation :", error);
    throw error;
  }
}



// Creation, affichage, mise a jour et suppression des operations


// Creation
export async function createOperation(
  userId: string,
  compteId: string,
  formData: OperationForm
) {
  const {
    nomOperation,
    description,
    dateDebutPrevu,
    dateFinPrevu,
    dateDebutReel,
    dateFinReel,
    commentaire,
    coutPrevu,
    coutReel,
    ecart,
    statut,
  } = formData;

  if (!nomOperation || !compteId) {
    throw new Error("❌ Le nom de l'opération et le compte d'exploitation sont obligatoires.");
  }

  try {
    const user = await getUser(userId);

    if (!user) {
      throw new Error("❌ Aucun utilisateur trouvé avec cet identifiant Clerk.");
    }

    const operation = await prisma.operation.create({
      data: {
        compteExploitationId: compteId,
        nom : nomOperation,
        description,
        dateDebutPrevu: dateDebutPrevu ? new Date(dateDebutPrevu) : null,
        dateFinPrevu: dateFinPrevu ? new Date(dateFinPrevu) : null,
        dateDebutReel: dateDebutReel ? new Date(dateDebutReel) : null,
        dateFinReel: dateFinReel ? new Date(dateFinReel) : null,
        commentaire,
        coutPrevu: coutPrevu ?? 0,
        coutReel,
        ecart,
        statut: statut ?? false,
        clerkRef: userId,
      },
    });

    console.log("✅ Nouvelle opération créée avec succès !");
    return operation;

  } catch (error) {
    console.error("🧯 Erreur lors de la création de l'opération :", error);
    throw error;
  }
}

export async function updateOperation(
  operationId: string,
  userId: string,
  formData: OperationForm
) {
  const {
    nomOperation,
    description,
    dateDebutPrevu,
    dateFinPrevu,
    dateDebutReel,
    dateFinReel,
    commentaire,
    coutPrevu,
    coutReel,
    ecart,
    statut,
  } = formData;

  if (!operationId) {
    throw new Error("❌ L'identifiant de l'opération est requis pour la mise à jour.");
  }

  try {

    const user = await getUser(userId);
    if (!user) {
      throw new Error("❌ Aucun utilisateur trouvé avec cet identifiant Clerk.");
    }

    const existingOperation = await prisma.operation.findUnique({
      where: { id: operationId },
    });

    if (!existingOperation) {
      throw new Error("❌ Aucune opération trouvée avec cet identifiant.");
    }

    const updatedOperation = await prisma.operation.update({

      where: { id: operationId },
      data: {
        nom: nomOperation ?? existingOperation.nom,
        description: description ?? existingOperation.description,
        dateDebutPrevu: dateDebutPrevu ? new Date(dateDebutPrevu) : existingOperation.dateDebutPrevu,
        dateFinPrevu: dateFinPrevu ? new Date(dateFinPrevu) : existingOperation.dateFinPrevu,
        dateDebutReel: dateDebutReel ? new Date(dateDebutReel) : existingOperation.dateDebutReel,
        dateFinReel: dateFinReel ? new Date(dateFinReel) : existingOperation.dateFinReel,
        commentaire: commentaire ?? existingOperation.commentaire,
        coutPrevu: coutPrevu ?? existingOperation.coutPrevu,
        coutReel: coutReel ?? existingOperation.coutReel,
        ecart: ecart ?? existingOperation.ecart,
        statut: statut ?? existingOperation.statut,
        clerkRef: userId,
      },
    });

    console.log("🔁 Opération mise à jour avec succès ✅");
    return updatedOperation;

  } catch (error) {
    console.error("🧯 Erreur lors de la mise à jour de l'opération :", error);
    throw error;
  }
}

// Afficher operations
export async function getOperations(userId: string) {
  try {
    const user = await getUser(userId);
    if (!user) {
      throw new Error("❌ Aucun utilisateur trouvé avec cet identifiant Clerk.");
    }

    const operations = await prisma.operation.findMany({
      where: {
        clerkRef: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        compteExploitation: {
          select: { id: true, nomProduit: true },
        },
      },
    });

    return operations;

  } catch (error) {
    console.error("🧯 Erreur lors de la récupération des opérations :", error);
    throw error;
  }
}

// Afficher les operations par ID


// export async function getOperationById(userId : string, compteExploitationIdId: string) : Promise<OperationForm[] | undefined> {

//   if (!userId || !compteExploitationIdId) {
//     throw new Error("Aucun champs trouver pour cet utilisateur.");
//   }

//   const user = await getUser(userId);

//   if (!user) return [];

//   if(user) {

//     try {

//       const operation = await prisma.operation.findMany({
//         where: { 
//           clerkRef : userId,
//           compteExploitationId : compteExploitationId
//         },
//       }) as OperationForm[]; 

//       return operation.map((op) => ({
//         id: op.id,
//         compteExploitationId : op.compteExploitationId,
//         nomOperation: op.nomOperation,
//         description : op.description,
//         dateDebutPrevu : op.dateDebutPrevu,
//         dateFinPrevu : op.dateFinPrevu,
//         coutPrevu : op.coutPrevu,
//       }));



//     } catch (error) {
//       console.error("🧯 Erreur lors de la récupération de l'opération :", error);
//       throw error;
//     }
//   }

// }


// export async function getOperationsByCompte(
//   userId: string,
//   compteExploitationId: string
// ): Promise<OperationForm[]> {

//   if (!userId || !compteExploitationId) {
//     throw new Error("❌ Aucun champ trouvé pour cet utilisateur.");
//   }

//   // 🔹 Vérifie si l'utilisateur existe
//   const user = await getUser(userId);
//   if (!user) return [];

//   try {
//     const operations = await prisma.operation.findMany({
//       where: {
//         clerkRef: userId,
//         compteExploitationId: compteExploitationId,
//       },
//       orderBy: { createdAt: "desc" }, // trie du plus récent au plus ancien
//     });

//     // 🔹 Mapping vers le type OperationForm
//     return operations.map((op) => ({
//       id: op.id,
//       compteExploitationId: op.compteExploitationId,
//       nom: op.nom,
//       description: op.description ?? undefined,
//       dateDebutPrevu: op.dateDebutPrevu,
//       dateFinPrevu: op.dateFinPrevu,
//       dateDebutReel: op.dateDebutReel ?? undefined,
//       dateFinReel: op.dateFinReel ?? undefined,
//       commentaire: op.commentaire ?? undefined,
//       coutPrevu: op.coutPrevu,
//       coutReel: op.coutReel ?? undefined,
//       ecart: op.ecart ?? undefined,
//       statut: op.statut ?? undefined,
//     }));

//   } catch (error) {
//     console.error("🧯 Erreur lors de la récupération des opérations :", error);
//     throw error;
//   }
// }



// // Afficher les opérations par compte pour un utilisateur
// export async function getOperationsByCompte(
//   userId: string,
//   compteExploitationId: string
// ){

//   if (!userId || !compteExploitationId) {
//     throw new Error("❌ Aucun champ trouvé pour cet utilisateur.");
//   }

//   // Vérifie si l'utilisateur existe
//   const user = await getUser(userId);
//   if (!user) return [];

//   if (user){

//     try {
//       const operations = await prisma.operation.findMany({
//         where: {
//           clerkRef: userId,
//           compteExploitationId: compteExploitationId,
//         },
//         orderBy: { createdAt: "desc" }, 
//     });

// const operationsFormatted: OperationForm[] = operations.map((op) => ({
//   id: op.id,
//   compteExploitationId: op.compteExploitationId,
//   nom: op.nom ?? undefined,
//   description: op.description ?? undefined,
//   dateDebutPrevu: op.dateDebutPrevu ? op.dateDebutPrevu.toISOString() : undefined,
//   dateFinPrevu: op.dateFinPrevu ? op.dateFinPrevu.toISOString() : undefined,
//   dateDebutReel: op.dateDebutReel ? op.dateDebutReel.toISOString() : undefined,
//   dateFinReel: op.dateFinReel ? op.dateFinReel.toISOString() : undefined,
//   commentaire: op.commentaire ?? undefined,
//   coutPrevu: op.coutPrevu ?? undefined,  // <- conversion null -> undefined
//   coutReel: op.coutReel ?? undefined,    // <- conversion null -> undefined
//   ecart: op.ecart ?? undefined,          // <- conversion null -> undefined
//   statut: op.statut ?? undefined,
// }));



//     return operationsFormatted;

//   } catch (error) {
//     console.error("🧯 Erreur lors de la récupération des opérations :", error);
//     throw error;
//   }
//   }
// }



export async function getOperationsByCompte(
  userId: string,
  compteExploitationId: string
): Promise<OperationForm[]> {
   
  if (!userId || !compteExploitationId) {
    throw new Error("❌ Aucun champ trouvé pour cet utilisateur.");
  }

  const user = await getUser(userId);
  if (!user) return [];

  try {

    const operations = await prisma.operation.findMany({
      where: {
        clerkRef: userId,
        compteExploitationId: compteExploitationId,
      },
      orderBy: { createdAt: "desc" }, 

    });

    const operationsFormatted: OperationForm[] = operations.map((op) => ({
      id: op.id,
      compteExploitationId: op.compteExploitationId,
      nom: op.nom ?? undefined,
      description: op.description ?? undefined,
      dateDebutPrevu: op.dateDebutPrevu ? op.dateDebutPrevu.toISOString() : undefined,
      dateFinPrevu: op.dateFinPrevu ? op.dateFinPrevu.toISOString() : undefined,
      dateDebutReel: op.dateDebutReel ? op.dateDebutReel.toISOString() : undefined,
      dateFinReel: op.dateFinReel ? op.dateFinReel.toISOString() : undefined,
      commentaire: op.commentaire ?? undefined,
      coutPrevu: op.coutPrevu ?? undefined,
      coutReel: op.coutReel ?? undefined,
      ecart: op.ecart ?? undefined,
      statut: op.statut ?? undefined,
    }));

    return operationsFormatted;

  } catch (error) {
    console.error("🧯 Erreur lors de la récupération des opérations :", error);
    throw error;
  }
}




// Supprimer
export async function deleteOperation(operationId: string, userId: string) {
  if (!operationId) {
    throw new Error("❌ L'identifiant de l'opération est requis pour la suppression.");
  }

  try {
    const user = await getUser(userId);
    if (!user) {
      throw new Error("❌ Aucun utilisateur trouvé avec cet identifiant Clerk.");
    }

    const existingOperation = await prisma.operation.findUnique({
      where: { id: operationId },
    });

    if (!existingOperation) {
      throw new Error("❌ Aucune opération trouvée avec cet identifiant.");
    }

    await prisma.operation.delete({
      where: { id: operationId },
    });

    console.log(`🗑️ Opération supprimée avec succès (ID: ${operationId})`);
    return { success: true };

  } catch (error) {
    console.error("🧯 Erreur lors de la suppression de l'opération :", error);
    throw error;
  }
}





// Creation, affichage, mise a jour et suppression des charges fixes


// Creation
export async function creationCharge( userId : string, formData: ChargesFixesForm) {

  const {nom, description, montant} = formData ;

  if (!nom || !description || !montant) {
    throw new Error("❌ Veuillez fournir toutes les informations nécessaires pour la création de la Dépenses.");
  }

  if (isNaN(montant) || montant <= 0) {
    throw new Error("Le montant doit être un nombre positif.");
  } 

  
  try {


    const user = await getUser(userId);

    if (!user) {
      throw new Error("❌ Aucun utilisateur trouvé avec cet identifiant Clerk.");
    }

    const chargeFixe = await prisma.chargesFixes.create({
      data: {
        clerkRef: user.clerkId, 
        nom,
        description,
        montant,
      },

    });

    console.log(`✅ Nouvelle Dépenses créé avec succès.`);

    return chargeFixe;

  } catch (error) {

    console.error("Erreur lors de la création de la Dépenses :", error);
    throw error;
  }
}


// export async function createChargeFixe(data: {
//   nom: string;
//   montant: number;
//   description?: string;
//   clerkRef?: string;
// }) {
//   try {
//     // ✅ Vérifications basiques
//     if (!data.nom || typeof data.nom !== "string") {
//       throw new Error("Le nom de la charge est requis et doit être une chaîne de caractères.");
//     }

//     if (isNaN(data.montant) || data.montant <= 0) {
//       throw new Error("Le montant doit être un nombre positif.");
//     }

//     const chargeFixe = await prisma.chargesFixes.create({
//       data: {
//         nom: data.nom,
//         description: data.description || null,
//         montant: data.montant,
//         clerkRef: data.clerkRef || null,
//       },
//     });

//     return { success: true, chargeFixe };

//   } catch (error: any) {
//     console.error("❌ Erreur lors de la création de la charge fixe :", error);
//     return { success: false, message: error.message || "Erreur inconnue." };
//   }
// }



// Affichage
export async function getChargesFixes(userId: string) {

  const user = await getUser(userId);

  if (!user) {
    throw new Error("❌ Aucun utilisateur trouvé avec cet identifiant Clerk.");
  }

  try {
   
    const charges = await prisma.chargesFixes.findMany({
      where: {
        id : user.id
      },
      orderBy: { createdAt: "desc" },
    });

    return  charges;

  } catch (error: any) {

    console.error("❌ Erreur lors de la récupération des charges fixes :", error);

    return { message: error.message || "Erreur inconnue." };
  }
}



// Suppression
export async function deleteChargeFixe(id: string) {
  try {
    const existingCharge = await prisma.chargesFixes.findUnique({ where: { id } });
    if (!existingCharge) {
      throw new Error("Aucune charge fixe trouvée avec cet identifiant.");
    }

    await prisma.chargesFixes.delete({ where: { id } });

    return { success: true };
  } catch (error: any) {
    console.error("❌ Erreur lors de la suppression de la charge fixe :", error);
    return { success: false, message: error.message || "Erreur inconnue." };
  }
}


// Mise a jour
export async function updateChargeFixe(id: string, formData : ChargesFixesForm) {
  try {
    const existingCharge = await prisma.chargesFixes.findUnique({ where: { id } });

    if (!existingCharge) {

      throw new Error("Aucune charge fixe trouvée avec cet identifiant.");
    }

    const updatedCharge = await prisma.chargesFixes.update({
      where: { id },
      data: {
        nom: formData.nom ?? existingCharge.nom,
        montant: formData.montant ?? existingCharge.montant,
        description: formData.description ?? existingCharge.description,
      },
    });

    return { success: true, updatedCharge };
  } catch (error: any) {
    console.error("❌ Erreur lors de la mise à jour de la charge fixe :", error);
    return { success: false, message: error.message || "Erreur inconnue." };
  }
}
