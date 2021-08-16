import { Component, createEffect, createSignal, For } from 'solid-js';
import { Twitter, Facebook, Reddit, Opensea } from '../icons/SocialMediaIcons';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignTop,
  AlignMiddle,
  AlignBottom,
} from '../icons/AlignIcons';
interface Props {
  onPresetClick: any;
  properties: any;
  alignment: any;
  setAlignment: any;
  onDimensionChange: any;
  flipImage: any;
  presets: any;
  images: any;
  download: any;
  onRangeInputHandler: any;
  activeImage: any;
}

/* const Button: Component<{ active: boolean }> = ({ active }: any) => {

} */

const Editor: Component<Props> = ({
  onPresetClick,
  alignment,
  properties,
  setAlignment,
  images,
  onDimensionChange,
  presets,
  download,
  onRangeInputHandler,
  activeImage,
}: Props) => {
  const [activePreset, setActivePreset] = createSignal('');

  createEffect(() => {
    const { width, height } = properties();
    for (let preset in presets) {
      if (presets[preset].width === width && presets[preset].height === height) {
        return setActivePreset(preset);
      }
    }
    return setActivePreset('');
  });

  const onPresetClickHandler = (e) => {
    e.preventDefault();
    setActivePreset(e.currentTarget.id);
    onPresetClick(e.currentTarget.id);
  };

  const horizontal = ['justify-start', 'justify-center', 'justify-end'];
  const vertical = ['items-start', 'items-center', 'items-end'];
  const onAnlignmentChange = (e) => {
    const { id } = e.currentTarget;
    let tmp = [...alignment()];
    if (horizontal.indexOf(id) > -1) {
      tmp[0] = id;
    } else if (vertical.indexOf(id) > -1) {
      tmp[1] = id;
    }
    setAlignment(tmp);
  };

  const activeStyles = 'bg-indigo-600 text-white';
  const disabledStyles = `bg-warm-gray-200 text-black`;
  const isActive = (alignmentCheck: string) =>
    alignment().indexOf(alignmentCheck) > -1 && activeStyles;
  const isPresetActive = (presetName: string) =>
    activePreset() === presetName ? activeStyles : disabledStyles;

  createEffect(() => console.log('alignment: ', alignment()));

  const isDisbaled = () =>
    activeImage() < 0 ? 'text-gray-300 border-warn-gray-300' : 'border-warm-gray-400';

  return (
    <div class='mt-4 flex gap-x-2 gap-y-4 justify-center flex-wrap'>
      <div
        id='image-details'
        class={`border-1 border-solid bg-warm-gray-100 rounded-md p-4 flex flex-col gap-y-2 font-semibold ${isDisbaled()}`}
      >
        <p class='text-lg'>Image Details</p>
        <div class='flex flex-row gap-x-6'>
          <div class='flex gap-y-2 flex-col'>
            <div class='flex flex-col gap-y-1'>
              <p class='text-sm'>Height</p>
              <div class='flex hover:cursor-pointer'>
                <input
                  disabled={activeImage() < 0}
                  id='height'
                  name='height'
                  type='range'
                  class='bg-indigo-600'
                  min='1'
                  max='100'
                  step='1'
                  value={activeImage() > -1 ? images()[activeImage()].height : '100'}
                  onInput={onRangeInputHandler}
                />
              </div>
            </div>
            {/* <div class='flex flex-col gap-y-1'>
              <For each={images()}>{(image: any) => <p>{image.name}</p>}</For>
            </div> */}
            {/*             <div>
              <button
                class=' px-4 py-2 bg-indigo-600 rounded-sm font-bold text-gray-50 shadow-sm'
                onClick={download}
              >
                Download
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div class='border-1 border-solid border-warm-gray-400 bg-warm-gray-100 rounded-md p-4 flex flex-col gap-y-2 font-semibold'>
        <p class='text-lg'>Basics</p>
        <div class='flex flex-row gap-x-6'>
          <div class='flex gap-y-2 flex-col'>
            <div class='flex flex-col gap-y-1'>
              <p class='text-sm'>Background Color</p>
              <div class='flex hover:cursor-pointer'>
                <input
                  type='color'
                  name='backgroundColor'
                  value={properties().backgroundColor}
                  onInput={onDimensionChange}
                  class='h-auto'
                />
                <input
                  type='text'
                  name='backgroundColor'
                  class='p-3'
                  value={properties().backgroundColor}
                  onInput={onDimensionChange}
                />
              </div>
            </div>
            <div class='flex flex-col gap-y-1'>
              <For each={images()}>{(image: any) => <p>{image.name}</p>}</For>
            </div>
            <div>
              <button
                class=' px-4 py-2 bg-indigo-600 rounded-sm font-bold text-gray-50 shadow-sm'
                onClick={download}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class='border-1 border-solid border-warm-gray-400 bg-warm-gray-100 rounded-md p-4 flex flex-col gap-y-2 font-semibold'>
        <p class='text-lg'>Alignment</p>
        <div class='flex flex-row gap-x-6 w-48'>
          <div class='flex gap-y-2 flex-col w-full'>
            <div class='flex flex-col gap-y-1'>
              <p class='text-sm'>Horizontal</p>
              <div class='flex flex-row justify-between p-3'>
                <button
                  id='justify-start'
                  class={`p-1 active:bg-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white ${isActive(
                    'justify-start'
                  )}`}
                  onClick={onAnlignmentChange}
                >
                  <AlignLeft />
                </button>
                <button
                  id='justify-center'
                  class={`p-1 active:bg-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white ${isActive(
                    'justify-center'
                  )}`}
                  onClick={onAnlignmentChange}
                >
                  <AlignCenter />
                </button>
                <button
                  id='justify-end'
                  class={`p-1 active:bg-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white ${isActive(
                    'justify-end'
                  )}`}
                  onClick={onAnlignmentChange}
                >
                  <AlignRight />
                </button>
              </div>
            </div>
            <div class='flex flex-col gap-y-1'>
              <p class='text-sm'>Vertical</p>
              <div class='flex flex-row justify-between p-3'>
                <button
                  id='items-start'
                  class={`p-1 active:bg-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white ${isActive(
                    'items-start'
                  )}`}
                  onClick={onAnlignmentChange}
                >
                  <AlignTop />
                </button>
                <button
                  id='items-center'
                  class={`p-1 active:bg-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white ${isActive(
                    'items-center'
                  )}`}
                  onClick={onAnlignmentChange}
                >
                  <AlignMiddle />
                </button>
                <button
                  id='items-end'
                  class={`p-1 active:bg-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white ${isActive(
                    'items-end'
                  )}`}
                  onClick={onAnlignmentChange}
                >
                  <AlignBottom />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='border-1 border-solid border-warm-gray-400 bg-warm-gray-100 rounded-md p-4 flex flex-col gap-y-2 font-semibold'>
        <p class='text-lg'>Dimensions</p>
        <div class='flex flex-row gap-x-6'>
          <div class='flex gap-y-2 flex-col'>
            <div class='flex flex-col gap-y-1'>
              <p class='text-sm'>Width</p>
              <input
                type='number'
                name='width'
                class='p-3'
                placeholder='Width'
                value={properties().width}
                onInput={onDimensionChange}
              />
            </div>
            <div class='flex flex-col gap-y-1'>
              <p class='text-sm'>Height</p>
              <input
                type='number'
                name='height'
                class='p-3'
                placeholder='Width'
                value={properties().height}
                onInput={onDimensionChange}
              />
            </div>
          </div>
          <div>
            <p class='text-sm'>Templates</p>
            <div class='flex flex-row gap-2 flex-wrap w-66 text-warm-gray-900 text-sm'>
              <button
                id='twitter'
                name='twitter'
                onclick={onPresetClickHandler}
                class={`w-28 flex items-center justify-center gap-x-2 py-1 rounded-md hover:bg-indigo-600 hover:text-white ${isPresetActive(
                  'twitter'
                )}`}
              >
                <Twitter />
                Twitter
              </button>
              <button
                id='opensea'
                name='opensea'
                onclick={onPresetClickHandler}
                class={`w-28 flex items-center justify-center gap-x-2 py-1 rounded-md hover:bg-indigo-600 hover:text-white ${isPresetActive(
                  'opensea'
                )}`}
              >
                <Opensea />
                Opensea
              </button>
              <button
                id='reddit'
                name='reddit'
                onclick={onPresetClickHandler}
                class={`w-28 flex items-center justify-center gap-x-2 py-1 rounded-md hover:bg-indigo-600 hover:text-white ${isPresetActive(
                  'reddit'
                )}`}
              >
                <Reddit />
                Reddit
              </button>
              <button
                id='facebook'
                name='facebook'
                onclick={onPresetClickHandler}
                class={`w-28 flex items-center justify-center gap-x-2 py-1 rounded-md hover:bg-indigo-600 hover:text-white ${isPresetActive(
                  'facebook'
                )}`}
              >
                <Facebook />
                Facebook
              </button>
              {/*                             <button id="twitter" name="twitter" onClick={onPresetClickHandler}
                                class={ `flex items-center justify-center px-3 py-1 gap-x-2 rounded-md bg-red-200 w-28 hover:bg-twitter ${isActive('justify-start')}` }
                                classList={{['bg-red-600']: activePreset() === 'twitter'}}
                                >    
                                <Twitter />
                                Twitter</button> */}
              {/*                             <button id="twitter" name="twitter" onClick={onPresetClickHandler} class={`w-32 flex items-center gap-x-2 py-2 px-1 bg-gray-200 rounded-md justify-center hover:bg-twitter active:bg-red-300 hover:text-gray-50 ${ activePreset() === 'twitter' ? 'bg-red-200': ''}`} >
                                <Twitter />
                                Twitter
                            </button> */}
              {/*    <button id="opensea" name="opensea" onClick={onPresetClickHandler} class={`w-32 flex items-center gap-x-2 py-2 px-1 bg-gray-200 active:text-red-600 rounded-md justify-center hover:bg-opensea hover:text-gray-50 ${isPresetActive('opensea')}`} >
                                <Opensea />
                                Opensea
                            </button>
                            <button id="reddit" name="reddit" onClick={onPresetClickHandler} class={`w-32 flex items-center gap-x-2 py-2 px-1 bg-gray-200 rounded-md justify-center hover:bg-reddit hover:text-white ${isPresetActive('reddit')}`}>
                                <Reddit />
                                Reddit
                            </button>
                            <button id="facebook" name="facebook" onClick={onPresetClickHandler} class="w-32 flex items-center gap-x-2 py-2 px-1 bg-gray-200 rounded-md justify-center  hover:bg-facebook hover:text-white "  >
                                <Facebook />
                                Facebook
                            </button>  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
