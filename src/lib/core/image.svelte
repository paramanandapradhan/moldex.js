<script lang="ts">
	type PropType = {
		children?: any;
		style?: string;
		clazz?: string;
		src?:string;
		alt?: string; 
	};

	let { src, alt = 'Image Defination', style, clazz }: PropType = $props();
</script>

<img {src} {alt} {style} class="moldex {clazz}"/>


 