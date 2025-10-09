

export type ChampFormData = {
  id? : string,
  nom?: string;
  village?: string;
  superficie?: string;
  coordonnees?: string;
  imageUrl? : string,
};

export type CompteExploitationFrom = {
  id?: string;
  numeroProduit?: string;
  nomProduit?: string;
  nomChamp?: string;
  superficie?: string;
  typeProduction?: string;
  dateDebut?: string;
  dateFin?: string;
  dateCreation?: Date;
};



export type CompteExploitationFull = CompteExploitationFrom & {
  champ: {
    id: string;
    nom: string;
    village: string;
    superficie: string;
    coordonnees: string | null;
    imageUrl? : string,
  };
  profile: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
  } | null;
  operations: {
    id: string;
    type: string;
    date: string;
  }[];
};


export type EditForm = {
  nomProduit?: string;
  numeroProduit?: string;
  superficie?: string;
  champId?: string;
  champName?: string;
  dateDebut?: string;
  dateFin?: string;
  typeProduction?: string;
};

export type OperationForm = {
  id?: string;
  compteExploitationId: string;
  nomOperation?: string;
  description?: string;
  dateDebutPrevu?: string;
  dateFinPrevu?: string;
  dateDebutReel?: string;
  dateFinReel?: string;
  commentaire?: string;
  coutPrevu?: number;
  coutReel?: number;
  ecart?: number;
  statut?: boolean;
};




export type ChargesFixesForm = {

  id? : string,   
  nom : string,
  description? : string,
  montant : number,

};