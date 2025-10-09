
// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import { CompteExploitationFull } from "@/type";

// type Props = {
//   onClose: () => void;
//   isOpen: boolean;
//   selectedCompte: CompteExploitationFull | null;
// };

// const DetailModal: React.FC<Props> = ({ onClose, isOpen, selectedCompte }) => {

//   if (!selectedCompte) return null;

//   const Info = ({ label, value }: { label: string; value: string | number | null }) => (
//     <div className="flex flex-col">
//       <span className="text-sm text-gray-500">{label}</span>
//       <span className="font-medium text-gray-800">{value ?? "-"}</span>
//     </div>
//   );

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="relative bg-white/80 backdrop-blur-md w-full max-w-2xl rounded-3xl shadow-xl p-8 border border-blue-100"
//             initial={{ scale: 0.9, opacity: 0, y: 30 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.95, opacity: 0, y: 20 }}
//             transition={{ type: "spring", duration: 0.5 }}
//           >
       
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 transition"
//             >
//               <X className="w-6 h-6" />
//             </button>

//             <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-3">
//              {selectedCompte.nomProduit} : {selectedCompte.nomChamp ?? selectedCompte.nomProduit}
//             </h2>

           
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
//               <Info label="Numéro" value={selectedCompte.numeroProduit!} />
//               <Info
//                 label="Date début"
//                 value={
//                   selectedCompte.dateDebut
//                     ? new Date(selectedCompte.dateDebut).toLocaleDateString()
//                     : "-"
//                 }
//               />
//               <Info
//                 label="Date fin"
//                 value={
//                   selectedCompte.dateFin
//                     ? new Date(selectedCompte.dateFin).toLocaleDateString()
//                     : "-"
//                 }
//               />
//               <Info label="Superficie" value={`${selectedCompte.superficie} ha`} />
//               <Info label="Village" value={selectedCompte.champ?.village ?? "-"} />
//               <Info
//                 label="Responsable"
//                 value={`${selectedCompte.profile?.nom ?? ""} ${
//                   selectedCompte.profile?.prenom ?? ""
//                 }`}
//               />
//               <Info label="Email" value={selectedCompte.profile?.email ?? "-"} />
//               <Info
//                 label="Date de création"
//                 value={
//                   selectedCompte.dateCreation?.toDateString()!
//                 }
//               />
//             </div>

//             {/* Liste des opérations */}
//             <div className="mt-8">
//               <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
//                 ⚙️ Opérations
//               </h4>

//               {selectedCompte.operations && selectedCompte.operations.length > 0 ? (
//                 <ul className="space-y-2">
//                   {selectedCompte.operations.map((op) => (
//                     <motion.li
//                       key={op.id}
//                       className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-gray-700 hover:bg-blue-100/70 transition"
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <span className="font-medium text-blue-600">{op.type}</span>{" "}
//                       — {new Date(op.date).toLocaleDateString()}
//                     </motion.li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-400 italic">Aucune opération enregistrée.</p>
//               )}
//             </div>

//             {/* Bouton Fermer */}
//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={onClose}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-all"
//               >
//                 Fermer
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };



// export default DetailModal;











"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileImage, X } from "lucide-react";
import { CompteExploitationFrom, CompteExploitationFull } from "@/type";
import ProductImage from "./ProductImage";
import { div } from "framer-motion/client";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  selectedCompte: CompteExploitationFull | null;
  dataCompteUnique: CompteExploitationFrom[];
};

const Info = ({ label, value }: { label: string; value: string | number | null }) => (
  <motion.div
    className="flex flex-col"
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    <span className="text-xs uppercase tracking-wide text-gray-400">{label}</span>
    <span className="font-medium text-gray-900 mt-1">{value ?? "-"}</span>
  </motion.div>
);

const DetailModal: React.FC<Props> = ({ onClose, isOpen, selectedCompte, dataCompteUnique }) => {
  if (!selectedCompte) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          
          {/* <motion.div
            className="absolute w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          /> */}

          
          <motion.div
            className="relative bg-white/80 backdrop-blur-2xl border border-blue-100/70 shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
            w-full max-w-2xl rounded-3xl p-8 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              boxShadow: "0 0 30px rgba(59,130,246,0.3)",
            }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
         
            <motion.div
              className="absolute inset-0 rounded-3xl border border-blue-300/30 pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59,130,246,0.0)",
                  "0 0 40px rgba(59,130,246,0.3)",
                  "0 0 20px rgba(59,130,246,0.0)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 4 }}
            />

       
            <motion.button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-500 hover:text-blue-600 transition cursor-pointer"
              whileHover={{ rotate: 90, scale: 1.1 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

        
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
                {/* {selectedCompte.nomProduit} */}
                {(selectedCompte.superficie)?.substring(0, 2)}ha{(selectedCompte.champ?.village ?? "-")}{ selectedCompte.dateDebut
                ? new Date(selectedCompte.dateDebut).getFullYear().toString()
                : "Inconnue"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Détails du compte d’exploitation
              </p>
            </motion.div>

         
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-gray-700"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              <Info label="Nom produit" value={selectedCompte.nomProduit!} />

              <Info label="Type production" value={`${selectedCompte.typeProduction}`} />

              <Info label="Numéro" value={selectedCompte.numeroProduit!} />

              <Info label="Superficie" value={`${selectedCompte.superficie} ha`} />


              <Info
                label="Date début"
                value={
                  selectedCompte.dateDebut
                    ? new Date(selectedCompte.dateDebut).toLocaleDateString()
                    : "-"
                }
              />

              <Info
                label="Date fin"
                value={
                  selectedCompte.dateFin
                    ? new Date(selectedCompte.dateFin).toLocaleDateString()
                    : "-"
                }
              />

              <Info
                label="Responsable"
                value={`${selectedCompte.profile?.nom ?? ""} ${
                  selectedCompte.profile?.prenom ?? ""
                }`}
              />

              <Info label="Email" value={selectedCompte.profile?.email ?? "-"} />

              <Info label="Village" value={selectedCompte.champ?.village ?? "-"} />

              {dataCompteUnique ? 
                (
                  dataCompteUnique
                    .filter((data) => data.id === selectedCompte.id)
                    .map((data) => (
                      <div key={data.id}>
                        <Info
                          label="Date de création"
                          // value={
                          //   data.dateCreation
                          //     ? new Date(data.dateCreation).toLocaleDateString()
                          //     : "Inconnue"
                          // }
                          value={
                            data.dateCreation!.toUTCString()
                          }
                        />
                      </div>
                    ))

                ) : (

                  <div>
                    <Info label="Date de création" value="Inconnue" />
                  </div>
                )}

            </motion.div>

            
            <div className="mt-10">
              
              <h2 className="font-medium text-gray-800 mb-4  text-center text-[25px]">
                ♻️ Champs
              </h2>

              <div className="flex md:flex-row items-center justify-between w-full">

                <div className="w-1/2 space-y-2">
                  <Info
                    label="Nom du champs"
                    value={
                      selectedCompte.champ.nom
                    }
                  />
                  <Info
                    label="Village"
                    value={
                      selectedCompte.champ.village
                    }
                  />
                  <motion.div
                    className="flex flex-col"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <span className="text-xs uppercase tracking-wide text-gray-400">{"superficie"}</span>
                    <span className="font-medium text-gray-900 mt-1">{selectedCompte.champ.superficie ?? "-"} ha</span>
                  </motion.div>

                </div>
                <div className="flex items-center justify-center w-1/2">

                  {selectedCompte.champ.imageUrl ? 
                    (
                      <ProductImage 
                        src={selectedCompte.champ.imageUrl} 
                        alt={"Pas d'image du champ disponible"}  
                        heightClass="h-40"
                        widthClass="w-40"       
                      />
                    ) :
                    (
                      
                      <div className=""> 
                        <span className="text-xs uppercase tracking-wide text-gray-400">{"Pas d'image disponible"}</span>
                        <div className="h-[150px] w-[150px] border border-slate-500 rounded-2xl flex items-center justify-center"> 
                          <FileImage  
                            strokeWidth={1} 
                            className="h-10 w-10 text-primary"
                          />
                        </div>
                      </div>
                    )
                  }
                </div>

              </div>

            </div>

            <div className="mt-10">
              <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                ⚙️ Opérations
              </h4>

              {selectedCompte.operations && selectedCompte.operations.length > 0 ? (
                <ul className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300/60">
                  {selectedCompte.operations.map((op, index) => (
                    <motion.li
                      key={op.id}
                      className="p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-100 text-sm text-gray-700 shadow-sm hover:shadow-md transition"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="font-medium text-blue-600">{op.type}</span>{" "}
                      — {new Date(op.date).toLocaleDateString()}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">Aucune opération enregistrée.</p>
              )}
            </div>

            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={onClose}
                className="px-8 py-2 hover:bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-blue-300/50 hover:scale-105 transition-all duration-500 cursor-pointer bg-gray-500 "
              >
                Fermer
              </button>
            </motion.div>

          </motion.div>

        </motion.div>
      )}
      
    </AnimatePresence>
  );
};



export default DetailModal;
