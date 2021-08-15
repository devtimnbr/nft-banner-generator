import { Component, For, Show } from "solid-js";

interface Props {
    dropHandler: any,
    dragOverHandler: any,
    images: any
}

const DropZone: Component<Props> = ({dropHandler, dragOverHandler, images}: Props) => {
    return (<form class="h-112 bg-indigo-100 p-4 shadow-lg over:shadow-xl text-center rounded-md flex justify-center items-center" onDrop={dropHandler} onDragOver={dragOverHandler}>
      <Show when={images().length > 0} fallback={
        <label for="load-file" class="flex h-full w-full flex-col gap-y-4 justify-center items-center border-indigo-300 border-dashed border-3 hover:cursor-pointer hover:border-indigo-500 text-indigo-700" >
              <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <div>
              <p class="text-xl font-bold" >Drag & Drop to Upload File</p>
              <span class="text-lg">OR</span>
              </div>
              <input id="load-file" type="file" class="hidden" />
              <label class="px-8 py-2 text-lg font-bold bg-warm-gray-900 text-white rounded-md hover:cursor-pointer" for="load-file">Browse File</label>
              </label>
      }>
        <div class="flex gap-x-16 h-64 w-auto justify-center items-center">
        <For each={images()}>
         {(image: any) => (<>
          <img src={image.blob} style={{ height: 'inherit'}} />
         </>)}
        </For>
        </div>
      </Show>
   </form>)
}

export default DropZone;