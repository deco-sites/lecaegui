import { GuestList } from "site/loaders/guests.ts";

export default function GuestSearch(guest : string[]) {

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