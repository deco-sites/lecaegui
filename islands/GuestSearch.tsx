import { useState } from "preact/hooks";
import { invoke } from "site/runtime.ts";

export interface Props {
  guests: string[];
}

export default function GuestSearch(props: Props) {
  const [guestValue, setGuestValue] = useState("");

  const handleClick = async () => {
    const response = await invoke.site.actions.confirmGuest({
      name: guestValue,
    });
    console.log(response);
  };

  return (
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text text-black">Selecione o nome do convidado</span>
      </label>
      <div class="flex gap-2">
        <select
          class="select select-bordered w-full max-w-xs bg-white text-black"
          onChange={(e) => setGuestValue(e.currentTarget.value)}
        >
          <option value="">Escolha um convidado</option>
          {props.guests?.map((guest, index) => (
            <option key={index} value={guest}>{guest}</option>
          ))}
        </select>
        <button onClick={handleClick} class="btn">Confirmar</button>
      </div>
    </div>
  );
}
