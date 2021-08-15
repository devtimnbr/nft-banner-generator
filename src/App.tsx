import { Component, createEffect, createSignal, For, Show } from "solid-js";
import DropZone from "./components/DropZone";
import ColorThief from "colorthief"
import Editor from "./components/Editor";
import { toJpeg } from 'html-to-image';

const presets = {
  twitter: {
    width: 1500,
    height: 500
  },
  opensea: {
    width: 1400,
    height: 400
  },
  reddit: {
    width: 1920,
    height: 384
  },
  facebook: {
    width: 820,
    height: 312
  },
}

const App: Component = () => {
  const [alignment, setAlignment] = createSignal('justify-center')
  const [properties, setProperties] = createSignal<{ width: number, height: number, scaleX: number, backgroundColor: string }>({
    width: 1500,
    height: 500,
    scaleX: 1,
    backgroundColor: '#F96464'
  })
  const [colorPalette, setColorPalette] = createSignal([])
  const [images, setImages] = createSignal([])
  const [edit, setEdit] = createSignal(false)

  createEffect(() => {

    if (images().length > 0) {
      setEdit(true)
    } else {
      setEdit(false)
    }
  })

  const onDimensionChange = (e: any) => {
    setProperties({
      ...properties(),
      [e.target.name]: isNaN(e.target.value) ? e.target.value : Number(e.target.value)
    })
  }

  const onPresetClick = (e: any) => {
    const { width, height } = presets[e.target.name]
    setProperties({
      ...properties(),
      width, height
    })
  }

  const flipImage = () => {
    if (properties().scaleX === 1) {
      setProperties({
        ...properties(),
        scaleX: -1
      })
    }
  }

  const dropHandler = (e: any) => {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === 'file') {
          var file = e.dataTransfer.items[i].getAsFile();
          const reader = new FileReader();
          reader.readAsDataURL(file);

          let base64;
          reader.onloadend = () => {
            base64 = reader.result;
            console.log({ base64 })
            setImages([...images(), {
              name: file.name,
              blob: base64
            }])
          }
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
        console.log('File: ', e.dataTransfer.files[i])
      }
    }
  }

  function dragOverHandler(e) {
    console.log('File(s) in drop zone');
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
  }

  const deleteHandler = (imageBlob) => {
    const tmp = images().filter((el) => el !== imageBlob)
    setImages(tmp);
  }

  const download = () => {
    try {
      const node: any = document.getElementById("preview");
      const dupNode = node.cloneNode(true)
      console.log({ dupNode, node })
      

      toJpeg(node, { cacheBust: true, })
        .then((dataUrl) => {
          console.log({ dataUrl })
          const link = document.createElement('a')
          link.download = 'my-image-name.png'
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }

  }

  createEffect(() => {
    console.log('IMAGES: ', images())

/*     var canvas: any = document.getElementById("tools_sketch");
    var ctx = canvas.getContext("2d");

    var image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
    };
 */
  })

  const onDragHandler = (e) => {
    console.log('ON DROG', e)
    setEdit(false)
  }

  return (
    <div class="px-4 bg-warm-gray-100 min-h-screen">
      <div class="container mx-auto py-32 flex justify-center flex-col gap-y-12">
        <header class="text-center">
          <h1 class="text-6xl text-indigo-600 font-bold">NFT Banner Generator</h1>
          <p class="mt-4 text-warm-gray-900 text-lg font-semibold mx-auto h lg:w-3/5">Create your own twitter banner. Occaecat deserunt laborum ex adipisicing magna voluptate laborum laboris et est. Occaecat deserunt laborum ex adipisicing magna voluptate laborum laboris et est.</p>
        </header>
        <Show when={edit()} fallback={<DropZone dragOverHandler={dragOverHandler} dropHandler={dropHandler} images={images} />} >
          <section class="mx-auto">
            <div id="preview" onDragOver={onDragHandler} class={`flex mx-auto rounded-md shadow-lg ${alignment()} gap-x-16`} style={{ width: `${properties().width}px`, height: `${properties().height}px`, "background-color": properties().backgroundColor, 'max-width': '1400px' }}>
              <For each={images()}>
                {(image) => (
                  <div class="group relative">
                    <img id="testImg" />
                    <img src={`${image.blob}`} class="object-scale-down transform rotate-0 hover:cursor-pointer" style={{ height: `${properties().height}px` }} />
                    {/*         <button class="absolute bg-white py-6 px-4 top-2 right-2" style={{ height: 'min-content'}} onClick={() => deleteHandler(image)}>
          Delete
        </button> */}
                    <button class="top-2 right-2 hidden group-hover:block absolute text-white transform hover:scale-125" style={{ height: 'min-content' }} onClick={() => deleteHandler(image)}>
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>
                  </div>)
                }
              </For>
            </div>
            <Editor
              properties={properties}
              alignment={alignment}
              setAlignment={setAlignment}
              onDimensionChange={onDimensionChange}
              onPresetClick={onPresetClick}
              flipImage={flipImage}
              presets={presets}
              images={images}
              download={download}
              
            />
          </section>
          {/* <section>
  <div class="bg-red-600 h-2 w-2">

  </div>
</section> */}
        </Show>

      </div>
    </div>
  );
};

export default App;
