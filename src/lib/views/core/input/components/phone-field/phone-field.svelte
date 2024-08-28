<script lang="ts">
	import { ripple } from '$lib/actions';
	import EasyScriptLoader from '@cloudparker/easy-script-loader-svelte';
	import InputField, { type InputFieldPropsType } from '../input-field/input-field.svelte';
	import { isMobileScreen, openListPickerDialog } from '$lib/services';
	import { DialogSizeEnum } from '$lib/views/core/dialog';

	let {
		value,
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

	let inputFieldRef: InputField;

	let EasyCountryData: any;

	async function hanleDialCodePicker() {
		if (EasyCountryData) {
			let items = EasyCountryData.getCountries();
			// console.log('Countries', items);
			let size = isMobileScreen() ? DialogSizeEnum.FULL : DialogSizeEnum.SM;
			let res: string = await openListPickerDialog<string>({
				items,
				itemTitle: 'dialCode',
				itemSubtitle: 'name',
				size,
				hasCheck: true,
				identity: 'dialCode',
				value: '+93'
			});

			if (res) {
				dialCode = res;
				inputFieldRef && inputFieldRef.focus();
			}
		}
	}

	function handleScriptLoad(lib: any) {
		console.log(lib);
		EasyCountryData = lib;
	}

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

<EasyScriptLoader
	scriptName="EasyCountryData"
	scriptUrl="https://cdn.jsdelivr.net/gh/paramanandapradhan/easy-countrydata@main/dist/index.js"
	onLoad={handleScriptLoad}
/>

<InputField
	bind:this={inputFieldRef}
	{...props}
	type="tel"
	maxlength={props?.maxlength || 12}
	leftChildren={showPasswordButton}
	{size}
	{appearance}
	className="pl-16 {className}"
/>
