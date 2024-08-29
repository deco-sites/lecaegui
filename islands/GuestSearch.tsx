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
        <div class="flex justify-center flex-col items-center helvetica mt-14">
          <p class="mb-6">Digite o nome do convidado</p>
          <input
            autocomplete="off"
            type="text"
            id="guest-input"
            class="border rounded p-2 w-72"
            placeholder="Ex.: Ana"
            value={searchQuery}
            onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          />
          <ul id="guest-list" class="mt-2">
            {searchQuery && filteredGuests.length > 0 ? (
              filteredGuests.map(guest => (
                <li key={guest}>
                  <button
                    class="bg-slate-100 rounded mb-1 p-1"
                    onClick={() => handleGuestSelect(guest)}
                  >
                    {guest}
                  </button>
                </li>
              ))
            ) : (
              <li></li>
            )}
          </ul>
        </div>
      ) : (
        <div class="helvetica flex justify-center items-center flex-col mt-14">
          <p class="text-lg mb-6">Você selecionou: {selectedGuest}</p>
          <button
            class="mt-2 p-2 mb-4 bg-blue-500 text-white rounded"
            onClick={() => setPlusOne(true)}
          >
            Levar mais um
          </button>
          {plusOne && (
            <div class="mt-2">
              <input
                type="text"
                class="border rounded p-2 w-72 mb-6"
                placeholder="Nome do acompanhante"
                value={plusOneName}
                onInput={(e) => setPlusOneName((e.target as HTMLInputElement).value)}
              />
            </div>
          )}
          <button
            class="mt-2 p-2 bg-green-500 text-white rounded"
            onClick={() => alert("Presença confirmada!")}
          >
            Confirmar Presença
          </button>
        </div>
      )}
    </div>
  );
}

// export default function GuestSelector(props : Prop) : GuestSelector{
//     const [selectedGuest, setSelectedGuest] = useState<string | null>(null);
//     const [plusOne, setPlusOne] = useState<boolean>(false);
//     const [plusOneName, setPlusOneName] = useState<string>("");
  
//     const handleGuestSelect = (guest: string) => {
//       setSelectedGuest(guest);
//       setPlusOne(false);
//       setPlusOneName("");
//     };
  
//     return (
//       <div class="p-4">
//         {!selectedGuest ? (
//           <div>
//             <input
//               type="text"
//               id="guest-input"
//               class="border rounded p-2"
//               placeholder="Digite o nome do convidado"
//               hx-get="/api/guests"
//               hx-trigger="keyup changed delay:500ms"
//               hx-target="#guest-list"
//             />
//             <ul id="guest-list" class="mt-2">
              
//             </ul>
//           </div>
//         ) : (
//           <div>
//             <p class="text-lg">Você selecionou: {selectedGuest}</p>
//             <button
//               class="mt-2 p-2 bg-blue-500 text-white rounded"
//               onClick={() => setPlusOne(true)}
//             >
//               Levar mais um
//             </button>
//             {plusOne && (
//               <div class="mt-2">
//                 <input
//                   type="text"
//                   class="border rounded p-2"
//                   placeholder="Nome do acompanhante"
//                   value={plusOneName}
//                   onChange={(e) => setPlusOneName((e.target as HTMLInputElement).value)}
//                 />
//               </div>
//             )}
//             <button
//               class="mt-2 p-2 bg-green-500 text-white rounded"
//               onClick={() => alert("Presença confirmada!")}
//             >
//               Confirmar Presença
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }