<script lang="ts">
	import type { ListItemType } from '$lib/button/components/button-list-item/button-list-item.svelte';
	import ButtonMenu from '$lib/button/components/button-menu/button-menu.svelte';
	import Button from '$lib/button/components/button/button.svelte';
	import VerticcalRule from '$lib/common/components/vertical-rule/verticcal-rule.svelte';
	import { mdiBellOutline } from '$lib/icon/services/icon-path-service.js';

	function handleMenuClick(ev: MouseEvent, menu: string | ListItemType, index: number) {
		console.log('handleMenuClick', { menu, index });
	}
</script>

<div>
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<div class="relative lg:hidden" role="dialog" aria-modal="true">
		<!--
        Off-canvas menu backdrop, show/hide based on off-canvas menu state.
  
        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
		<div class="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div>

		<div class="fixed inset-0 flex">
			<!--
          Off-canvas menu, show/hide based on off-canvas menu state.
  
          Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
          Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
        -->
			<div class="relative mr-16 flex w-full max-w-xs flex-1">
				<!--
            Close button, show/hide based on off-canvas menu state.
  
            Entering: "ease-in-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in-out duration-300"
              From: "opacity-100"
              To: "opacity-0"
          -->
				<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
					<button type="button" class="-m-2.5 p-2.5">
						<span class="sr-only">Close sidebar</span>
						<svg
							class="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Sidebar component, swap this element with another sidebar if you like -->
				<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
					mobile sidebar
				</div>
			</div>
		</div>
	</div>

	<!-- Static sidebar for desktop -->
	<div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div
			class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
		>
			<p>desktop sidebar</p>
		</div>
	</div>

	<div class="lg:pl-72">
		<div
			class="sticky top-0 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
		>
			<button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
				<span class="sr-only">Open sidebar</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>

			<!-- Separator -->
			<div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true"></div>

			<div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
				<form class="relative flex flex-1" action="#" method="GET">
					<label for="search-field" class="sr-only">Search</label>
					<svg
						class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
							clip-rule="evenodd"
						/>
					</svg>
					<input
						id="search-field"
						class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
						placeholder="Search..."
						type="search"
						name="search"
					/>
				</form>
				<div class="flex items-center gap-x-4 lg:gap-x-6">
					<Button
						iconPath={mdiBellOutline}
						className="text-gray-400 hover:text-gray-900"
						spinner
						disabled
					/>

					<!-- Separator -->
					<!-- <VerticcalRule /> -->

					<ButtonMenu
						menus={['Open Profile', 'Signout']}
						label="Tom Cook"
						dropdownClassName="right-0"
						labelClassName="font-semibold"
						imgClassName="h-8 w-8 rounded-full bg-gray-50"
						imgSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						screenOnlyDesc="User Menu"
						onmenuclick={handleMenuClick}
					/>
					<ButtonMenu
						menus={['Open Profile', 'Signout']}
						label="Tom Cook"
						dropdownClassName="right-0"
						labelClassName="font-semibold"
						imgClassName="h-8 w-8 rounded-full bg-gray-50"
						imgSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						screenOnlyDesc="User Menu"
						onmenuclick={handleMenuClick}
					/>
				</div>
			</div>
		</div>

		<main class="py-10">
			<div class="px-4 sm:px-6 lg:px-8">
				Your content

				<div class="flex">
					<ButtonMenu
						menus={['Open', 'Close', '', 'Delete']}
						label="Dropdown"
						hasCheck={false}
						onmenuclick={handleMenuClick}
					/>
					<button type="button" class="relative"> hello</button>
				</div>

				<div>
					<Button className="border px-3 py-1" label="btn" iconPath={mdiBellOutline} iconClassName="h-4 w-4" spinner spinnerClassName="h-4 w-4">
						 
					</Button> 
				</div>
			</div>
		</main>
	</div>
</div>
