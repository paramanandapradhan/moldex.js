<script lang="ts">
	import { ripple } from '$lib/actions';
	import EasyScriptLoader from '@cloudparker/easy-script-loader-svelte';
	import InputField, { type InputFieldPropsType } from '../input-field/input-field.svelte';

	let {
		size,
		appearance,
		buttonClassName,
		className,
		dialCode = $bindable('+1'),
		...props
	}: InputFieldPropsType & {
		buttonClassName?: string;
		dialCode?: string;
	} = $props();

	let btnRoundedClassName = $state('');
	let btnIconSizeClassName = $state('');

	function hanleDialCodePicker() {}

	function handleCountryData(lib: any) {
		console.log(lib);
	}

	$effect(() => {
		if (size) {
			switch (size) {
				case 'lg':
					btnIconSizeClassName = '!h-7 !w-7';
					break;
				case 'md':
					btnIconSizeClassName = '!h-6 !w-6';
					break;
				case 'sm':
					btnIconSizeClassName = '!h-5 !w-5';
					break;
				case 'xs':
					btnIconSizeClassName = '!h-4 !w-4';
					break;
			}
		}
	});

	$effect(() => {
		if (!appearance || appearance == 'normal') {
			btnRoundedClassName = 'rounded-tl-lg rounded-bl-lg';
		}
	});
</script>

{#snippet showPasswordButton()}
	<button
		class="w-16 h-full hover:bg-gray-100 font-bold text-gray-400 {btnRoundedClassName} {buttonClassName}"
		use:ripple
		onclick={hanleDialCodePicker}
	>
		{dialCode}
	</button>
{/snippet}

<!-- <EasyScriptLoader
	onLoad={handleCountryData}
	scriptName="EasyCountryData"
	scriptUrl="https://cdn.jsdelivr.net/gh/paramanandapradhan/easy-countrydata@main/dist/index.js"
/> -->
<EasyScriptLoader
	scriptName="Swiper"
	scriptUrl='https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js'
	styleUrl='https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css'
	onLoad={handleCountryData}
></EasyScriptLoader>

<InputField
	{...props}
	type="phone"
	maxlength={props?.maxlength || 12}
	leftChildren={showPasswordButton}
	{size}
	{appearance}
	className="pl-16 {className}"
/>
