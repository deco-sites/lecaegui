import { useState } from "preact/hooks";
import { invoke } from "site/runtime.ts";

export interface Props {
  guests: string[];
}

export default function GuestSearch(props: Props) {
  const [guestValue, setGuestValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [isChecked, setIsChecked] = useState(false)

  const [newGuest, setNewGuest] = useState('')

  const handleClick = async () => {
    setLoading(true);
    const response = await invoke.site.actions.confirmGuest({
      name: guestValue,
    });
    const response2 = await invoke.site.actions.addguests({
      name : newGuest,
      origin : guestValue  
    })
    setLoading(false);
    if(response.status === "ok" && response2.status === "ok") {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text text-black">Selecione o nome do convidado</span>
      </label>
      <div class="flex flex-col gap-8">
        <select
          class="select select-bordered w-full max-w-xs bg-white text-black"
          onChange={(e) => setGuestValue(e.currentTarget.value)}
        >
          <option value="">Escolha um convidado</option>
          {props.guests?.map((guest, index) => (
            <option key={index} value={guest}>{guest}</option>
          ))}
        </select>
        <div class="flex gap-2 align-center">
          <span>Vai levar mais um?</span>
          <input type="checkbox" class="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
        </div>
        {isChecked &&
        <div>
          <label class="label">
            <span class="label-text text-black">Digite o nome de quem vai levar</span>
          </label>
          <input class="input input-bordered w-full max-w-xs" type="text" value={newGuest} onChange={(e) => setNewGuest(e.currentTarget.value)}/>
        </div> 
        }
        <button onClick={handleClick} class="btn">Confirmar</button>
        {loading && <span class="loading loading-spinner loading-md"></span>}
        {error && <span class="text-red-500">Ocorreu um erro</span>}
      </div>
    </div>
  );
}
