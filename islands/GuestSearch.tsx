import { GuestList } from "site/loaders/guests.ts";

export interface Props {
  guests?: GuestList
}

export default function GuestSearch(props : Props) {

  const { guests } = props

  console.log(guests)
 
  return (
    <div class="flex justify-center flex-col items-center helvetica mt-14">
          <p class="mb-6">Digite o nome do convidado</p>
          <input
            autocomplete="off"
            type="text"
            id="guest-input"
            class="border rounded p-2 w-72"
            placeholder="Ex.: Ana"
          />
        
        </div>
  ) 
}