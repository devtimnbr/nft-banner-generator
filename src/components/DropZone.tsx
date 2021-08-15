import { Component } from "solid-js";

interface Props {
    dropHandler: any,
    dragOverHandler: any
}

const DropZone: Component<Props> = ({dropHandler, dragOverHandler}: Props) => {
    return <form class="bg-indigo-100 p-4 shadow-lg over:shadow-xl text-center rounded-md" style={{ width: '1500px', height: '500px'}}>
    <div class=" w-full h-full flex flex-col gap-y-4 justify-center items-center border-indigo-300 border-dashed border-3 hover:cursor-pointer hover:border-indigo-500 text-indigo-700" onDrop={dropHandler} onDragOver={dragOverHandler}>
    <img src="https://siasky.net/icons/icon-512x512.png" class="w-8 h-8 self-end justify-self-end"/>
      {/* <input class="box__file" type="file" name="files[]" id="file" /> */}
      <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
      <div>
      <p class="text-xl font-bold" >Drag & Drop to Upload File</p>
      <span class="text-lg">OR</span>
      </div>
      <button class="px-8 py-2 text-lg font-bold bg-warm-gray-900 text-white rounded-md" type="submit">Browse File</button>
    </div>
   </form>
}

export default DropZone;