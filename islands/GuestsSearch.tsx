import { h } from "preact";
import { useState } from "preact/hooks";

export interface Prop {}
export interface GuestSelector {}

export function LoadingFallback() {
  return (
    <div class="p-4">
      <p>Carregando...</p>
    </div>
  );
}

export default function GuestSelector(props: Prop): h.JSX.Element {
  const [selectedGuest, setSelectedGuest] = useState<string | null>(null);
  const [plusOne, setPlusOne] = useState<boolean>(false);
  const [plusOneName, setPlusOneName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [guestList, setGuestList] = useState<string[]>([
    'Ana Silva',
    'Bruno Ferreira',
    'Carlos Souza',
    'Daniela Lima',
    'Eduardo Pereira',
  ]);

  const handleGuestSelect = (guest: string) => {
    setSelectedGuest(guest);
    setPlusOne(false);
    setPlusOneName("");
  };

  const filteredGuests = guestList.filter(guest =>
    guest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div class="p-4">
      {!selectedGuest ? (
        <div class="flex items-center w-full justify-center flex-col">
          <p class='mb-3 mt-20 helvetica'>Digite o nome do convidado</p>
          <input
            type="text"
            id="guest-input"
            class="border rounded p-2 w-72"
            placeholder='Ex: Ana'
            value={searchQuery}
            onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          />
          <ul id="guest-list" class="mt-2">
            {filteredGuests.length > 0 ? (
              filteredGuests.map(guest => (
                <li key={guest}>
                  <button
                    class={`${searchQuery.length >= 1 ? 'block': 'hidden'} bg-slate-50 rounded p-2 mb-1`}
                    onClick={() => handleGuestSelect(guest)}
                  >
                    {guest}
                  </button>
                </li>
              ))
            ) : (
              <li class='helvetica'>Nenhum convidado encontrado</li>
            )}
          </ul>
        </div>
      ) : (
        <div class="flex items-center w-full justify-center flex-col ">
          <p class="text-lg helvetica mt-8 mb-3">Você selecionou: {selectedGuest}</p>
          <button
            class="mt-2 p-2 helvetica border border-blue-500 rounded hover:bg-blue-100 transition-all duration-300"
            onClick={() => setPlusOne(true)}
          >
            Levar mais um
          </button>
          {plusOne && (
            <div class="mt-2">
              <input
                type="text"
                class="border rounded p-2 w-72 mb-4"
                placeholder="Nome do acompanhante"
                value={plusOneName}
                onInput={(e) => setPlusOneName((e.target as HTMLInputElement).value)}
              />
            </div>
          )}
          <button
            class="mt-2 p-2 border helvetica border-green-500 rounded hover:bg-green-100 transition-all duration-300"
            onClick={() => alert("Presença confirmada!")}
          >
            Confirmar Presença
          </button>
        </div>
      )}
    </div>
  );
}
// import { h } from "preact";
// import { useState } from "preact/hooks";

// export interface Prop {}
// export interface GuestSelector {}

// export function LoadingFallback() {
//   return (
//     <div class="p-4">
//       <p>Carregando...</p>
//     </div>
//   );
// }

// export default function 
// GuestSelector(props : Prop) :  h.JSX.Element{
//   const [selectedGuest, setSelectedGuest] = useState<string | null>(null);
//   const [plusOne, setPlusOne] = useState<boolean>(false);
//   const [plusOneName, setPlusOneName] = useState<string>("");

//   const handleGuestSelect = (guest: string) => {
//     setSelectedGuest(guest);
//     setPlusOne(false);
//     setPlusOneName("");
//   };

  
//   return (
//     <div class="p-4">
//       {!selectedGuest ? (
//         <div class="flex items-center w-full justify-center flex-col ">
//           <p class='mb-3 mt-6 helvetica'>Digite o nome do convidado</p>
//           <input
//             type="text"
//             id="guest-input"
//             name="guest"
//             class="border rounded p-2 w-72"
//             placeholder="Ex: Ana"
//             hx-get="https://localhost:8002/api/guest"
//             hx-trigger="keyup changed delay:500ms"
// />
//           <ul id="guest-list" class="mt-2">
            
//           </ul>
//         </div>
//       ) : (
//         <div class="flex items-center w-full justify-center flex-col ">
//           <p class="text-lg helvetica ">Você selecionou: {selectedGuest}</p>
//           <button
//             class="mt-2 p-2 helvetica border border-blue-500 rounded hover:bg-blue-100 transition-all duration-300"
//             onClick={() => setPlusOne(true)}
//           >
//             Levar mais um
//           </button>
//           {plusOne && (
//             <div class="mt-2">
//               <input
//                 type="text"
//                 class="border rounded p-2 w-72 mb-4"
//                 placeholder="Nome do acompanhante"
//                 value={plusOneName}
//                 onChange={(e) => setPlusOneName((e.target as HTMLInputElement).value)}
//               />
//             </div>
//           )}
//           <button
//             class="mt-2 p-2 helvetica border border-green-500 rounded hover:bg-green-100 transition-all duration-300"
//             onClick={() => alert("Presença confirmada!")}
//           >
//             Confirmar Presença
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
