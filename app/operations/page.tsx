
// "use client"

// import { useRouter } from "next/navigation";
// import Wrapper from "../components/Wrapper"
// import { useUser } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { OperationForm } from "@/type";
// import { createOperation, getOperationsByCompte } from "@/action";
// import EmptyState from "../components/EmptyState";
// import { CircleChevronLeft } from "lucide-react";
// import { usePathname } from "next/navigation";



// const operation = () => {

//     const  router  = useRouter();
//     const pathname = usePathname();
//     const { user } = useUser();
//     const [compteExploitationId, setcompteExploitationId] = useState("");
//     const [operations, setOperations] = useState<OperationForm[] | null>(null);
//     const [loading, setLoading] = useState(false);
//     const handleChange = (field: keyof typeof formData, value: string) => {
//         setFormData((prev) => ({ ...prev, [field]: value }));
//     };
//     const [formData, setFormData] = useState<OperationForm>({
//         nomOperation : "",
//         compteExploitationId : "",
//         description : "",
//         dateDebutPrevu : "",
//         dateFinPrevu : "",
//         commentaire : "",
//         coutPrevu : 0,
//         statut : false,
//     });

//     const resetValue = () => {

//         setFormData({
//             nomOperation : "",
//             compteExploitationId : "",
//             description : "",
//             dateDebutPrevu : "",
//             dateFinPrevu : "",
//             commentaire : "",
//             coutPrevu : 0,
//             statut : false,
//         });

//     }

//     const retour = () => {

//         router.push("/compteExploitation")
//     }


//     const handleSubmit = async (e: React.FormEvent) => {

//         e.preventDefault();

//         const dataToSend = {
//             ...formData,
//         };

//         if (!dataToSend) {
//         toast.error("Veuillez remplir tous les champs du formulaire requis ❌");
//         return;
//         }

//         if (user) {
//             try {

//                 setLoading(true);
//                 await createOperation(user.id, compteExploitationId, dataToSend)
//                 toast.success("Compte d'exploitation créé avec succès✅");
//                 fetchOperations(); 
//                 resetValue();

//             } catch (error) {

//                 console.error(error);
//                 toast.error("Erreur lors de la création du compte 🍓");

//             } finally {

//                 setLoading(false);
//             }
//         }
//     };
    
    
//     // Récupération les opereations
//     const fetchOperations = async () => {

//         setLoading(true);

//         try {

//             if (user) {
//                 const operations = await getOperationsByCompte(user.id, compteExploitationId);
//                 setOperations(operations)
//             }

//         } catch (error) {
//             console.error(error)
//         }
//         setLoading(false)
//     };
    
//     useEffect(() => {
//         fetchOperations();
//     }, [user]);

//     return (

//         <Wrapper>
            
//             <div className="w-full flex flex-row items-center justify-between">
                
//                 <div className="w-1/2">
//                     <h2 className="text-center font-semibold">
//                         Ajouter une operation
//                     </h2>

//                     <button 
//                         className="btn btn-primary rounded-lg" 
//                         onClick={retour}
//                     >
//                         <CircleChevronLeft />
//                         Retour
//                     </button>

//                     <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        
//                         <input
//                             placeholder="Operation"
//                             value={formData.nomOperation}
//                             onChange={(e) => handleChange("nomOperation", e.target.value)}
//                             className="input input-bordered w-full h-10 rounded-xl"
//                         />

//                         <textarea
//                             placeholder="Nom du produit"
//                             value={formData.description}
//                             onChange={(e) => handleChange("description", e.target.value)}
//                             className="input input-bordered w-full h-10 rounded-xl"
//                         />

//                         <input
//                             type="numver"
//                             placeholder="Superficie (ha)"
//                             value={formData.coutPrevu}
//                             onChange={(e) => handleChange("coutPrevu", e.target.value)}
//                             className="input input-bordered w-full h-10 rounded-xl"
//                         />

                        
//                         <div className="flex flex-col sm:flex-row gap-3">
//                             <input
//                             type="date"
//                             value={formData.dateDebutPrevu}
//                             onChange={(e) => handleChange("dateDebutPrevu", e.target.value)}
//                             className="input input-bordered w-full"
//                             />
//                             <input
//                             type="date"
//                             value={formData.dateFinPrevu}
//                              onChange={(e) => handleChange("dateFinPrevu", e.target.value)}
//                             className="input input-bordered w-full"
//                             />
//                         </div>

//                         <button type="submit" className="btn btn-primary mt-4 h-10 rounded-[5px]" disabled={loading}>
//                             {loading ? "Création..." : "Valider"}
//                         </button>

//                     </form>
//                 </div>

//                 <div className=" w-1/2 flex items-center justify-center">
//                     { operations?.length === 0 ? 
//                         (
//                             loading ? 

//                             (
//                                 <div>
//                                     <span className="loading loading-dots loading-xl"></span>
//                                 </div>

//                             ) : (

//                                 <div>
//                                     {operations.map((op) => {
//                                         return (
//                                             <div
//                                                 className=""
//                                                 key={op.id}
//                                             >
//                                                 <p>
//                                                     {op.nomOperation}
//                                                 </p>
//                                                 <p>
//                                                     {op.commentaire}
//                                                 </p>
//                                                 <p>
//                                                     {op.dateDebutPrevu}
//                                                 </p>
//                                                 <p>
//                                                     {op.dateFinPrevu}
//                                                 </p>
//                                                 <p>
//                                                     {op.coutPrevu} FCFA
//                                                 </p>
//                                                 <p>
//                                                     {op.statut  false ? <P className="bg-red-500">En cours</p> : <P className="bg-green-500">Terminer</p>}
//                                                 </p>
                                                
//                                             </div>
//                                         )
//                                     })}
//                                 </div>
//                             )
                            
//                         ) 
//                         :
//                         (
//                             <div className="flex items-center justify-center h-screen">

//                                 <EmptyState 
//                                     IconComponent={"MonitorX"}
//                                     message={"Aucune operation pour le moment."}
//                                 />

//                             </div>
//                         )
//                     }
//                 </div>
//             </div>

//         </Wrapper>
//     )
// }

// export default operation;






















"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OperationForm } from "@/type";
import { createOperation, getOperationsByCompte } from "@/action";
import EmptyState from "../components/EmptyState";
import { CircleChevronLeft } from "lucide-react";

const OperationPage = () => {


  const router = useRouter();
  const { user } = useUser();

  const searchParams = useSearchParams();
  const compteId = searchParams.get("compteId") || "";
  const [compteExploitationId, setCompteExploitationId] = useState(compteId);
  const [operations, setOperations] = useState<OperationForm[] | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<OperationForm>({
    nomOperation: "",
    compteExploitationId: "",
    description: "",
    dateDebutPrevu: "",
    dateFinPrevu: "",
    commentaire: "",
    coutPrevu: 0,
    statut: false,
  });

  useEffect(() => {
    setCompteExploitationId(compteId);
    fetchOperations();
  }, [compteId]);

  // --- Gestion du formulaire ---
  const handleChange = (field: keyof OperationForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      nomOperation: "",
      compteExploitationId: "",
      description: "",
      dateDebutPrevu: "",
      dateFinPrevu: "",
      commentaire: "",
      coutPrevu: 0,
      statut: false,
    });
  };

  // --- Retour ---
  const handleRetour = () => router.push("/compteExploitation");

  // --- Soumission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;
    // Validation minimale
    if (
      !formData.nomOperation ||
      !formData.coutPrevu ||
      !formData.dateDebutPrevu ||
      !formData.dateFinPrevu
    ) {
      toast.error("Veuillez remplir tous les champs requis ❌");
      return;
    }

    try {
      setLoading(true);
      await createOperation(user.id, compteExploitationId, formData);
      toast.success("Opération créée avec succès ✅");
      fetchOperations();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la création de l'opération ❌");
    } finally {
      setLoading(false);
    }
  };

  // --- Récupération des opérations ---
  const fetchOperations = async () => {
    if (!user || !compteExploitationId) return;

    setLoading(true);
    try {
      const ops = await getOperationsByCompte(user.id, compteExploitationId);
      setOperations(ops);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des opérations ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperations();
  }, [user, compteExploitationId]);

  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* --- Formulaire --- */}
        <div className="md:w-1/2 w-full bg-base-200 p-6 rounded-xl shadow-lg glassmorphism">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Ajouter une opération</h2>
            <button
              className="btn btn-sm btn-primary flex items-center gap-2"
              onClick={handleRetour}
            >
              <CircleChevronLeft /> Retour
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              placeholder="Nom de l'opération"
              value={formData.nomOperation}
              onChange={(e) => handleChange("nomOperation", e.target.value)}
              className="input input-bordered w-full"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="input input-bordered w-full"
            />

            <input
              type="number"
              placeholder="Coût prévu (FCFA)"
              value={formData.coutPrevu}
              onChange={(e) =>
                handleChange("coutPrevu", parseFloat(e.target.value))
              }
              className="input input-bordered w-full"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="date"
                value={formData.dateDebutPrevu}
                onChange={(e) => handleChange("dateDebutPrevu", e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="date"
                value={formData.dateFinPrevu}
                onChange={(e) => handleChange("dateFinPrevu", e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-2 w-full"
              disabled={loading}
            >
              {loading ? "Création..." : "Valider"}
            </button>
          </form>
        </div>

        {/* --- Liste des opérations --- */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-dots loading-xl"></span>
            </div>
          ) : operations && operations.length > 0 ? (
            operations.map((op) => (
              <div
                key={op.id}
                className="p-4 rounded-xl shadow-md bg-base-200 glassmorphism flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{op.nomOperation}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      op.statut ? "bg-green-500 text-white" : "bg-yellow-400 text-black"
                    }`}
                  >
                    {op.statut ? "Terminé" : "En cours"}
                  </span>
                </div>
                <p className="text-sm">{op.description}</p>
                <p className="text-sm">
                  Début prévu : {op.dateDebutPrevu}
                </p>
                <p className="text-sm">
                  Fin prévu : {op.dateFinPrevu}
                </p>
                <p className="text-sm font-medium">{op.coutPrevu} FCFA</p>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <EmptyState
                IconComponent={"MonitorX"}
                message={"Aucune opération pour le moment."}
              />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default OperationPage;

















