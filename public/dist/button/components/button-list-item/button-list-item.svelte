<script context="module" lang="ts"></script>

<script lang="ts">import { ripple } from "../../../actions/ripple.js";
import Icon from "../../../icon/components/icon/icon.svelte";
import {
  mdiCheckCircle,
  mdiCheckCircleOutline,
  mdiChevronRight
} from "../../../icon/services/icon-path-service.js";
let {
  item,
  index,
  listId = "",
  className = "",
  hasCheck = false,
  uncheckIconPath = mdiCheckCircleOutline,
  checkIconPath = mdiCheckCircle,
  checkIconClassName = "",
  uncheckIconClassName = "",
  iconClassName = "",
  imgClassName = "",
  labelClassName = "",
  descClassName = "",
  checkClassName = "",
  checked = false,
  hasArrow = false,
  arrowIconPath = mdiChevronRight,
  arrowClassName = "",
  onclick = (ev, item2, index2) => {
  },
  children
} = $props();
</script>

{#snippet itemInternal()}
	<div class="flex w-full items-center gap-4">
		{#if item?.iconPath}
			<div>
				<Icon path={item?.iconPath} className="{iconClassName} {item?.iconClassName}" />
			</div>
		{/if}
		{#if item?.imgSrc}
			<div>
				<img
					src={item?.imgSrc}
					class="w-6 h-6 {imgClassName} {item?.imgClassName}"
					alt="item-img-{index}"
				/>
			</div>
		{/if}
		<div class="flex-grow">
			{#if item?.label}
				<div class="text-ellipsis overflow-hidden {labelClassName} {item?.labelClassName || ''}">
					{item?.label || ''}
				</div>
			{/if}
			{#if item?.desc}
				<div
					class="text-ellipsis overflow-hidden text-gray-400 text-sm font-light {descClassName} {item?.descClassName ||
						''}"
				>
					{item?.desc || ''}
				</div>
			{/if}
		</div>
		{#if hasCheck}
			<div>
				<Icon
					path={checked ? checkIconPath : uncheckIconPath}
					className="w-5 h-5 {checkClassName} {checked
						? `text-primary ${checkIconClassName}`
						: `text-gray-400 ${uncheckIconClassName}`}"
				/>
			</div>
		{/if}

		{#if hasArrow}
			<div>
				<Icon path={arrowIconPath} className="w-5 h-5 text-gray-500 {arrowClassName}  " />
			</div>
		{/if}
	</div>
{/snippet}

{#snippet buttonSnippet()}
	<button
		id="{listId}-item-item-{index}"
		type="button"
		class="w-full select-none block px-3 py-2 text-start leading-6 text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none {className} {item.className}"
		role="menuitem"
		onclick={(ev) => onclick(ev, item, index)}
		disabled={item?.disabled}
		use:ripple
	>
		{@render itemInternal()}
	</button>
{/snippet}

{#snippet linkSnippet()}
	<a
		id="{listId}-item-item-{index}"
		href={item?.url}
		class="block select-none px-3 py-1 w-full text-start leading-6 text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none {className} {item.className}"
		role="menuitem"
		target={item?.openInNewWindow ? '_blank' : ''}
		onclick={(ev) => onclick(ev, item, index)}
		use:ripple
	>
		{@render itemInternal()}
	</a>
{/snippet}

{#if children}
	{@render children(item, index)}
{:else if item?.url && !item?.disabled}
	{@render linkSnippet()}
{:else}
	{@render buttonSnippet()}
{/if}
