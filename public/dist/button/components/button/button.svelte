<script lang="ts">import { ripple } from "../../../actions/ripple.js";
import Spinner from "../../../common/components/spinner/spinner.svelte";
import Icon from "../../../icon/components/icon/icon.svelte";
let {
  id = "",
  form = void 0,
  type = "button",
  label = "",
  className = "",
  iconPath = "",
  iconClassName = "",
  rightIconPath = "",
  rightIconClassName = "",
  spinner = false,
  disabled = false,
  spinnerClassName = "",
  onlySpinner = false,
  children,
  useRipple = true,
  onclick = (ev) => {
  }
} = $props();
function maybeRipple(node, options) {
  if (useRipple) {
    return ripple(node, options);
  }
  return {
    destroy() {
    }
  };
}
</script>

{#snippet buttonContent()}
	<div class="flex w-full items-center gap-2">
		{#if spinner}
			<Spinner className="w-4 h-4 {spinnerClassName}" />
		{/if}
		{#if !onlySpinner}
			{#if iconPath}
				<Icon path={iconPath} className={iconClassName} />
			{/if}
			{#if label}
				<span>{label || ''}</span>
			{/if}
			{#if rightIconPath}
				<Icon path={rightIconPath} className={rightIconClassName} />
			{/if}
		{/if}
	</div>
{/snippet}

<button {id} {type} {form} class={className} {onclick} {disabled} use:maybeRipple>
	{#if children}
		{@render children()}
	{:else}
		{@render buttonContent()}
	{/if}
</button>
