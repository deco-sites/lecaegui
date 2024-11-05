import { useState } from "preact/hooks";
import { invoke } from "site/runtime.ts";

export interface Props {
  guests: string[];
}

export default function GuestSearch(props: Props) {
  const [guestValue, setGuestValue] = useState("");
  const [newGuest, setNewGuest] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [filteredGuests, setFilteredGuests] = useState<string[]>([]);

  const handleClick = async () => {
    setLoading(true);
    const response = await invoke.site.actions.confirmGuest({
      name: guestValue,
    });
    let response2;
    if (isChecked) {
      response2 = await invoke.site.actions.addguests({
        name: newGuest,
        origin: guestValue,
      });
    }
    setLoading(false);
    if (
      response.status === "ok" && response2?.status === "ok" && isChecked ||
      response.status === "ok" && !isChecked
    ) {
      setError(false);
      setSuccess(true);
    } else {
      setError(true);
      setSuccess(false);
    }
  };

  const handleInputChange = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setGuestValue(inputValue);

    if (inputValue) {
      const filtered = props.guests
        .filter((guest) =>
          guest.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, 5);
      setFilteredGuests(filtered);
    } else {
      setFilteredGuests([]);
    }
  };

  const handleSelect = (guest: string) => {
    setGuestValue(guest);
    setFilteredGuests([]);
  };

  return (
    <div class="form-control w-full max-w-xs">
      {success && (
        <div class="alert alert-success shadow-lg mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Convidado confirmado com sucesso!</span>
          </div>
        </div>
      )}
      <div class="flex flex-col gap-2 relative">
        <div class="relative flex items-center">
          <input
            type="text"
            class="input input-bordered rounded-full w-full max-w-xs bg-transparent text-[#333D29]"
            placeholder="Digite seu nome"
            value={guestValue}
            onInput={handleInputChange}
          />
          {!isChecked && (
            <button
              onClick={handleClick}
              class="btn rounded-full bg-[#656D4A] text-white hover:bg-[#4A4F3A] ml-2 hidden sm:block"
            >
              {loading
                ? <span class="loading loading-spinner loading-md"></span>
                : "Confirmar"}
            </button>
          )}
        </div>
        {filteredGuests.length > 0 && (
          <ul class="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto z-10">
            {filteredGuests.map((guest, index) => (
              <li
                key={index}
                class="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(guest)}
              >
                {guest}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div class="flex gap-2 align-center mt-4">
        <span>Irá levar um convidado?</span>
        <input
          type="checkbox"
          class="custom-checkbox mb-4"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      </div>
      {isChecked && (
        <div class="flex flex-col sm:flex-row items-center">
          <input
            class="input input-bordered rounded-full w-full max-w-xs bg-transparent text-[#333D29]"
            placeholder="Escreva o nome do convidado"
            type="text"
            value={newGuest}
            onChange={(e) => setNewGuest(e.currentTarget.value)}
          />
          <div class="mt-2 sm:mt-0 sm:ml-2">
            <button
              onClick={handleClick}
              class="btn rounded-full w-full bg-[#656D4A] text-white hover:bg-[#4A4F3A] hidden sm:block"
            >
              {loading
                ? <span class="loading loading-spinner loading-md"></span>
                : "Confirmar"}
            </button>
          </div>
        </div>
      )}
      <div class="mt-2 sm:mt-0 sm:ml-2">
        <button
          onClick={handleClick}
          class="btn rounded-full w-full bg-[#656D4A] text-white hover:bg-[#4A4F3A] sm:hidden"
        >
          {loading
            ? <span class="loading loading-spinner loading-md"></span>
            : "Confirmar"}
        </button>
      </div>
      {error && (
        <span class="text-red-500">Ocorreu um erro. Tente novamente</span>
      )}
    </div>
  );
}
