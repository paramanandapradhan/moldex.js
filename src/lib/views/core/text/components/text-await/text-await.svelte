<script lang="ts">
	import '../../../../../tailwind.css';
	type PropsType = {
		input?: Promise<any | null> | undefined;
		key?: string;
		hasTitle?: string;
	};
	let { input, key, hasTitle }: PropsType = $props();
</script>

{#if input}
	{#await input then res}
		{@const text = res && key ? res[key] : res}
		<span title={hasTitle ? text : ''}> {text}</span>
	{/await}
{/if}
