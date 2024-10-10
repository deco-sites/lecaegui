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
        <div class="alert alert-success shadow-lg">
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
      <label class="label">
        <span class="label-text text-black">Selecione o nome do convidado</span>
      </label>
      <div class="flex flex-col gap-2 relative">
        <div class="relative">
          <input
            type="text"
            class="input input-bordered w-full max-w-xs bg-white text-black"
            placeholder="Escolha um convidado"
            value={guestValue}
            onInput={handleInputChange}
          />
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
          <span>Vai levar mais um?</span>
          <input
            type="checkbox"
            class="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </div>
        {isChecked && (
          <div>
            <label class="label">
              <span class="label-text text-black">
                Digite o nome de quem vai levar
              </span>
            </label>
            <input
              class="input input-bordered w-full max-w-xs"
              type="text"
              value={newGuest}
              onChange={(e) => setNewGuest(e.currentTarget.value)}
            />
          </div>
        )}
        <div class="flex flex-col gap-4">
          <button onClick={handleClick} class="btn">
            {loading
              ? <span class="loading loading-spinner loading-md"></span>
              : (
                "Confirmar"
              )}
          </button>
          {error && (
            <span class="text-red-500">Ocorreu um erro. Tente novamente</span>
          )}
        </div>
      </div>
    </div>
  );
}
