import { Component, createEffect, createSignal, For, Show, onCleanup, onMount } from 'solid-js';
import DropZone from './components/DropZone';
import ColorThief from 'colorthief';
import Editor from './components/Editor';
import { toJpeg } from 'html-to-image';

const presets = {
  twitter: {
    width: 1500,
    height: 500,
  },
  opensea: {
    width: 1400,
    height: 400,
  },
  reddit: {
    width: 1920,
    height: 384,
  },
  facebook: {
    width: 820,
    height: 312,
  },
};

export const clickOutside = (el, accessor) => {
  const onClick = (e) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener('click', onClick);
  onCleanup(() => document.body.removeEventListener('click', onClick));
};

const App: Component = () => {
  const [alignment, setAlignment] = createSignal(['justify-center', 'items-end']);
  const [properties, setProperties] = createSignal<{
    width: number;
    height: number;
    scaleX: number;
    backgroundColor: string;
  }>({
    width: 1500,
    height: 500,
    scaleX: 1,
    backgroundColor: '#F96464',
  });
  const [imageProperties, setImageProperties] = createSignal([]);
  const [activeImage, setActiveImage] = createSignal(-1);
  const [images, setImages] = createSignal([]);
  const [edit, setEdit] = createSignal(false);

  createEffect(() => {
    if (images().length > 0) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  });

  const onDimensionChange = (e: any) => {
    setProperties({
      ...properties(),
      [e.target.name]: isNaN(e.target.value) ? e.target.value : Number(e.target.value),
    });
  };

  const onPresetClick = (e: any) => {
    /*  const { width, height } = presets[e.target.name] */
    const { width, height } = presets[e];
    console.log('onPresetClick: ', { width, height });

    /* console.log('onPresetClick: ', { e}) */
    setProperties({
      ...properties(),
      width,
      height,
    });
  };

  const flipImage = () => {
    if (properties().scaleX === 1) {
      setProperties({
        ...properties(),
        scaleX: -1,
      });
    }
  };

  const dropHandler = (e: any) => {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      loadFile(e.dataTransfer.items);
    }
  };

  const loadFile = (fileList) => {
    console.log('LOAOD FILE', fileList);

    for (var i = 0; i < fileList.length; i++) {
      const file = fileList[i].kind === 'file' ? fileList[i].getAsFile() : fileList[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      let base64;
      reader.onloadend = () => {
        base64 = reader.result;
        console.log({ base64 });
        setImages([
          ...images(),
          {
            name: file.name,
            blob: base64,
            height: '100%',
            width: '100%',
          },
        ]);
      };
      /*       } else {
        const tmo = DataTransferItemList.add(fileList)
      } */
    }
  };

  function dragOverHandler(e) {
    console.log('File(s) in drop zone');
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
  }

  const deleteHandler = (i) => {
    // weird but tmp has to be here because of rerender
    const tmp = images();
    tmp.splice(i, 1);
    setActiveImage(-1);
    setImages((prev) => prev.splice(i, 1));
  };

  const download = () => {
    try {
      const node: any = document.getElementById('preview');
      const dupNode = node.cloneNode(true);

      const tmpWidth = node.style.width;
      const tmpHeight = node.style.height;
      const tmpMaxWidth = node.style.maxWidth;

      node.style.width = properties().width + 'px';
      node.style.maxWidth = properties().width + 'px';
      node.style.height = properties().height + 'px';

      console.log({ dupNode, node });
      toJpeg(node, { cacheBust: true })
        .then((dataUrl) => {
          console.log({ dataUrl });
          const link = document.createElement('a');
          link.download = 'my-image-name.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          node.style.width = tmpWidth;
          node.style.maxWidth = tmpMaxWidth;
          node.style.height = tmpHeight;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onDragHandler = () => {
    setEdit(false);
  };

  const activeImageStyles = 'border-2 border-gray-200';
  const isSelectedImage = (i) => {
    return activeImage() === i ? activeImageStyles : '';
  };

  const onRangeInputHandler = (e) => {
    const activeIndex = activeImage();

    console.log(images()[activeImage()].height);
    const mapTest = images().map((el, i) => {
      if (i === activeImage()) {
        return { ...el, [e.target.id]: e.target.value };
      }
      return { ...el };
    });
    setImages(mapTest);
  };

  return (
    <div class='px-4 bg-warm-gray-100 min-h-screen'>
      <div class='container mx-auto py-32 flex justify-center flex-col gap-y-12'>
        <header class='text-center'>
          <h1 class='text-6xl text-indigo-600 font-bold'>NFT Banner Generator</h1>
          <p class='mt-4 text-warm-gray-900 text-lg font-semibold mx-auto h lg:w-3/5'>
            Create your own twitter banner. Occaecat deserunt laborum ex adipisicing magna voluptate
            laborum laboris et est. Occaecat deserunt laborum ex adipisicing magna voluptate laborum
            laboris et est.
          </p>
        </header>
        <Show
          when={edit()}
          fallback={
            <DropZone
              dragOverHandler={dragOverHandler}
              dropHandler={dropHandler}
              images={images}
              loadFile={loadFile}
            />
          }
        >
          <section class='mx-auto w-full'>
            <div
              id='preview'
              onDragOver={onDragHandler}
              class={`flex mx-auto rounded-md shadow-lg ${alignment()[0]} ${
                alignment()[1]
              } gap-x-16`}
              style={{
                width: `${properties().width}px`,
                height: `${properties().height}px`,
                'background-color': properties().backgroundColor,
                'max-width': '100%',
              }}
            >
              <For each={images()}>
                {(image, index) => (
                  <div
                    class={`group relative hover:border-2 hover:border-gray-200 ${isSelectedImage(
                      index()
                    )}`}
                    onClick={() => setActiveImage(index())}
                    style={{ height: `${image.height}%` }}
                    use:clickOutside={() => setActiveImage(-1)}
                  >
                    <img
                      src={`${image.blob}`}
                      class='object-scale-down h-full transform rotate-0 hover:cursor-pointer'
                      style={{ 'max-height': properties().height + 'px' }}
                    />
                    <button
                      class='top-2 right-2 hidden group-hover:block absolute text-white transform hover:scale-125'
                      style={{ height: 'min-content' }}
                      onClick={() => deleteHandler(index())}
                    >
                      <svg
                        class='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                        ></path>
                      </svg>
                    </button>
                  </div>
                )}
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
              onRangeInputHandler={onRangeInputHandler}
              activeImage={activeImage}
            />
          </section>
        </Show>
      </div>
    </div>
  );
};

export default App;
