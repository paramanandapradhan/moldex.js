<script lang="ts">
	type PropsType = {
		input?: Promise<any | null> | undefined;
		key?: string;
		hasTitle?: string;
		placeholder?: string;
		emptyText?: string;
	};
	let { input, key, hasTitle, placeholder, emptyText = '-' }: PropsType = $props();
</script>

{#if input}
	{#await input}
		<span>{@html placeholder}</span>
	{:then res}
		{#if res}
			{@const text = res && key ? res[key] : res}
			<span title={hasTitle ? text : ''}> {text}</span>
		{:else}
			<span>{emptyText}</span>
		{/if}
	{/await}
{/if}
