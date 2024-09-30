import { useRef } from "preact/hooks";
import { invoke } from "site/runtime.ts";

export interface Props {
  guests: string[]
}

export default function GuestSearch(props: Props) {
  const selectedGuestRef = useRef<HTMLSelectElement>(null);

  const handleSelectChange = () => {
    console.log("Selected guest:", selectedGuestRef.current?.value);
  };

  const handleClick = async () => {
    await invoke['deco-sites/lecaegui'].actions.confirmGuest({name: selectedGuestRef.current?.value})
  }

  return (
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text text-black">Selecione o nome do convidado</span>
      </label>
      <div class="flex gap-2">
        <select
          class="select select-bordered w-full max-w-xs bg-white text-black"
          ref={selectedGuestRef}
          onChange={handleSelectChange}
        >
          <option value="" disabled>Escolha um convidado</option>
          {props.guests?.map((guest, index) => (
            <option key={index} value={guest}>{guest}</option>
          ))}
        </select>
        {selectedGuestRef.current?.value && (
          <p>Convidado selecionado: {selectedGuestRef.current.value}</p>
        )}
        <button onClick={handleClick} class="btn">Confirmar</button>
      </div>
    </div>
  ) 
}