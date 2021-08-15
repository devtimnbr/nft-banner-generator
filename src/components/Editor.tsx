import { Component, createEffect, createSignal, For } from 'solid-js'
import { Twitter, Facebook, Reddit, Opensea } from "../icons/SocialMediaIcons"
import { AlignLeft, AlignCenter, AlignRight, AlignTop, AlignMiddle, AlignBottom } from "../icons/AlignIcons"
interface Props {
    onPresetClick: any;
    properties: any;
    alignment: any
    setAlignment: any;
    onDimensionChange: any;
    flipImage: any;
    presets: any;
    images: any;
    download: any;
}

const Editor: Component<Props> = ({ onPresetClick, alignment, properties, setAlignment, images, onDimensionChange, presets, download }: Props) => {
    const [activePreset, setActivePreset] = createSignal('')

    createEffect(() => {
        const { width, height } = properties()
        for (let preset in presets) {
            if (presets[preset].width === width && presets[preset].height === height) {
                setActivePreset(preset)
            } else {
                setActivePreset('')
            }
        }
    })

    const isPresetActive = (presetName: string) => activePreset() === presetName && `bg-${presetName} text-warm-gray-50`;

    createEffect(() => {
        console.log(activePreset())
        console.log(images())
    })

    const testChange = (e) => {
        console.log(e.target.value)
        
    }

    const activeStyles = 'bg-indigo-600 text-white'
    const isActive = (alignmentCheck: string) => alignment() === alignmentCheck && activeStyles;
    return (
        <div class="mt-4 flex gap-x-2 justify-center">
            <div class="border-1 border-solid border-warm-gray-400 bg-warm-gray-100 rounded-md p-4 flex flex-col gap-y-2 font-semibold">

                <p class="text-lg">Basics</p>
                <div class="flex flex-row gap-x-6">

                    <div class="flex gap-y-2 flex-col">
                        <div class="flex flex-col gap-y-1">
                            <p class="text-sm">Background Color</p>
                            <div class="flex hover:cursor-pointer">
                            <input type="color" name="backgroundColor" value={properties().backgroundColor} onInput={onDimensionChange} class="h-auto" />
                            <input type="text" name="backgroundColor" class="p-3" value={properties().backgroundColor} onInput={onDimensionChange} />
                            </div>
                        </div>
                        {/*                         <div class="flex flex-col gap-y-1">
                            <p class="text-sm">Height</p>
                            <input type="number" name="height" class="p-3" placeholder="Width" value={properties().height} onInput={onDimensionChange} />
                        </div>
 */}                     <div class="flex flex-col gap-y-1">
                            {/* <p class="text-sm">Background Color</p> */}
                            <For each={images()}>
                                {(image: any) => <p>{image.name}</p>}
                            </For>
                        </div>
                        <div>
                            <button class=" px-4 py-2 bg-indigo-600 rounded-sm font-bold text-gray-50 shadow-sm" onClick={download}>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="border-1 border-solid border-warm-gray-400 bg-warm-gray-100 rounded-md p-4 flex flex-col gap-y-2 font-semibold">
                <p class="text-lg">Alignment</p>
                <div class="flex flex-row gap-x-6 w-48">
                    <div class="flex gap-y-2 flex-col w-full">
                        <div class="flex flex-col gap-y-1">
                            <p class="text-sm">Horizontal</p>
                            <div class="flex flex-row justify-between p-3">
                                <button class={`p-1 active:bg-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white ${isActive('justify-start')} active:bg-red-300`} classList={{ active: 'twitter' === 'twitter'}}  onClick={() => setAlignment('justify-start')}>
                                    <AlignLeft />
                                </button>
                                <button class={`p-1 active:bg-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white ${isActive('justify-center')}`} onClick={() => setAlignment('justify-center')} >
                                    <AlignCenter />
                                </button>
                                <button class={`p-1 active:bg-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white ${isActive('justify-end')}`} onClick={() => setAlignment('justify-end')}>
                                    <AlignRight />
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-col gap-y-1">
                            <p class="text-sm">Vertical</p>
                            <div class="flex flex-row justify-between p-3">
                                <AlignTop />
                                <AlignMiddle />
                                <AlignBottom />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="border-1 border-solid border-warm-gray-400 bg-warm-gray-100 rounded-md p-4 flex flex-col gap-y-2 font-semibold">

                <p class="text-lg">Dimensions</p>
                <div class="flex flex-row gap-x-6">

                    <div class="flex gap-y-2 flex-col">
                        <div class="flex flex-col gap-y-1">
                            <p class="text-sm">Width</p>
                            <input type="number" name="width" class="p-3" placeholder="Width" value={properties().width} onInput={onDimensionChange} />
                        </div>
                        <div class="flex flex-col gap-y-1">
                            <p class="text-sm">Height</p>
                            <input type="number" name="height" class="p-3" placeholder="Width" value={properties().height} onInput={onDimensionChange} />
                        </div>


                    </div>
                    <div>
                        <p class="text-sm">Templates</p>
                        <div class="flex flex-row gap-2 flex-wrap w-66 text-warm-gray-900" style={{ flex: '1 1 50%' }}>

                            <button name="twitter" class={`w-32 flex items-center gap-x-2 py-2 px-1 bg-gray-200 rounded-md justify-center hover:bg-twitter hover:text-gray-50 ${isPresetActive('twitter')}`} onClick={onPresetClick}>
                                <Twitter />
                                Twitter
                            </button>
                            <button name="opensea" class={`w-32 flex items-center gap-x-2 py-2 px-1 bg-gray-200  rounded-md justify-center hover:bg-opensea hover:text-gray-50 ${isPresetActive('opensea')}`} onClick={onPresetClick}>
                                <Opensea />
                                Opensea
                            </button>
                            <button name="reddit" class={`w-32 flex items-center gap-x-2 py-2 px-1 bg-gray-200 rounded-md justify-center hover:bg-reddit hover:text-white ${isPresetActive('reddit')}`} onClick={onPresetClick}>
                                <Reddit />
                                Reddit
                            </button>
                            <button name="facebook" class="w-32 flex items-center gap-x-2 py-2 px-1 bg-gray-200 rounded-md justify-center  hover:bg-facebook hover:text-white " onClick={onPresetClick} >
                                <Facebook />
                                Facebook
                            </button>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default Editor;