<script lang="ts">
	import { ColorField, mdiBellOutline, ripple, TextField, TimeField } from '$lib';
	import DateField from '$lib/views/core/input/components/date-field/date-field.svelte';
	import DatetimeField from '$lib/views/core/input/components/datetime-field/datetime-field.svelte';
	import EmailField from '$lib/views/core/input/components/email-field/email-field.svelte';
	import FileField from '$lib/views/core/input/components/file-field/file-field.svelte';
	import InputField from '$lib/views/core/input/components/input-field/input-field.svelte';
	import NumberField from '$lib/views/core/input/components/number-field/number-field.svelte';
	import RangeField from '$lib/views/core/input/components/range-field/range-field.svelte';
	import TextareaField from '$lib/views/core/input/components/textarea-field/textarea-field.svelte';
</script>

<div class="p-10">
	<div>
		<TextField label="Enter Name" name="name" />
	</div>
	<div>
		<NumberField label="Enter Age" name="age" floatingLabel />
	</div>
	<div class="my-3">
		<EmailField label="Enter Email" name="email" floatingLabel />
	</div>
	<div class="my-3">
		<DateField label="Enter Date" name="date" floatingLabel />
	</div>
	<div class="my-3">
		<DatetimeField label="Enter Date Time" name="datetime" floatingLabel />
	</div>
	<div class="my-3">
		<TimeField label="Enter Time" name="time" floatingLabel />
	</div>
	<div class="my-3">
		<ColorField label="Enter Color" name="color" size="lg" appearance="normal" value="#00bbcc" />
	</div>
	<div class="my-3">
		<RangeField name="range" size="xs" step={10} />
	</div>
	<div class="my-3">
		<TextareaField name="textarea" label="Txtarea" />
	</div>

	<div class="my-3">
		<FileField name="file1" label="File1" appearance="fill" size="lg" />
	</div>
	<div class="my-3">
		<FileField name="file2" label="File2" appearance="normal" multiple />
	</div>
	<div class="my-3">
		<FileField name="file3" label="File3" appearance="box" size="xs" accept="video/*"  floatingLabel/>
	</div>
</div>
