<script lang="ts">
	import ComboboxField from '$lib/views/core/input/components/combobox-field/combobox-field.svelte';
	import PasswordField from '$lib/views/core/input/components/password-field/password-field.svelte';
	let comboValue: string = $state('');
	let comboValue2: string = $state('');
	let comboItems = [
		'Item1',
		'Item2',
		'Item3',
		'Item4',
		'Item5',
		'Item6',
		'Item7',
		'Item8',
		'Item9',
		'Item10',
		'Item11',
		'Item12'
	];

	let comboItems2 = [
		{
			qty: 1,
			name: 'John Doe',
			age: 30,
			email: 'john.doe@example.com',
			address: '123 Main St, Anytown, USA',
			description: 'A software developer.',
			_id: '001'
		},
		{
			qty: 2,
			name: 'Jane Smith',
			age: 25,
			email: 'jane.smith@example.com',
			address: '456 Elm St, Othertown, USA',
			description: 'A graphic designer.',
			_id: '002'
		},
		{
			qty: 3,
			name: 'Alice Johnson',
			age: 28,
			email: 'alice.johnson@example.com',
			address: '789 Oak St, Sometown, USA',
			description: 'A project manager.',
			_id: '003'
		},
		{
			qty: 4,
			name: 'Bob Brown',
			age: 35,
			email: 'bob.brown@example.com',
			address: '101 Pine St, Anytown, USA',
			description: 'A product manager.',
			_id: '004'
		},
		{
			qty: 5,
			name: 'Carol White',
			age: 32,
			email: 'carol.white@example.com',
			address: '202 Birch St, Othertown, USA',
			description: 'A marketing specialist.',
			_id: '005'
		},
		{
			qty: 6,
			name: 'David Black',
			age: 27,
			email: 'david.black@example.com',
			address: '303 Cedar St, Sometown, USA',
			description: 'A sales manager.',
			_id: '006'
		},
		{
			qty: 7,
			name: 'Emily Green',
			age: 29,
			email: 'emily.green@example.com',
			address: '404 Spruce St, Anytown, USA',
			description: 'A content writer.',
			_id: '007'
		},
		{
			qty: 8,
			name: 'Frank Blue',
			age: 31,
			email: 'frank.blue@example.com',
			address: '505 Maple St, Othertown, USA',
			description: 'A customer support specialist.',
			_id: '008'
		},
		{
			qty: 9,
			name: 'Grace Pink',
			age: 26,
			email: 'grace.pink@example.com',
			address: '606 Redwood St, Sometown, USA',
			description: 'A UX designer.',
			_id: '009'
		},
		{
			qty: 10,
			name: 'Henry Gray',
			age: 34,
			email: 'henry.gray@example.com',
			address: '707 Cypress St, Anytown, USA',
			description: 'A DevOps engineer.',
			_id: '010'
		},
		{
			qty: 11,
			name: 'Ivy Orange',
			age: 33,
			email: 'ivy.orange@example.com',
			address: '808 Willow St, Othertown, USA',
			description: 'A data analyst.',
			_id: '011'
		},
		{
			qty: 12,
			name: 'Jack Violet',
			age: 24,
			email: 'jack.violet@example.com',
			address: '909 Palm St, Sometown, USA',
			description: 'A front-end developer.',
			_id: '012'
		},
		{
			qty: 13,
			name: 'Kathy Yellow',
			age: 29,
			email: 'kathy.yellow@example.com',
			address: '1010 Bamboo St, Anytown, USA',
			description: 'A content strategist.',
			_id: '013'
		},
		{
			qty: 14,
			name: 'Leo Indigo',
			age: 37,
			email: 'leo.indigo@example.com',
			address: '1111 Aspen St, Othertown, USA',
			description: 'A full-stack developer.',
			_id: '014'
		},
		{
			qty: 15,
			name: 'Mia Brown',
			age: 30,
			email: 'mia.brown@example.com',
			address: '1212 Juniper St, Sometown, USA',
			description: 'A database administrator.',
			_id: '015'
		},
		{
			qty: 16,
			name: 'Noah Black',
			age: 28,
			email: 'noah.black@example.com',
			address: '1313 Poplar St, Anytown, USA',
			description: 'A mobile app developer.',
			_id: '016'
		},
		{
			qty: 17,
			name: 'Olivia White',
			age: 27,
			email: 'olivia.white@example.com',
			address: '1414 Fir St, Othertown, USA',
			description: 'A social media manager.',
			_id: '017'
		},
		{
			qty: 18,
			name: 'Paul Red',
			age: 36,
			email: 'paul.red@example.com',
			address: '1515 Pinecone St, Sometown, USA',
			description: 'A network administrator.',
			_id: '018'
		},
		{
			qty: 19,
			name: 'Quinn Blue',
			age: 32,
			email: 'quinn.blue@example.com',
			address: '1616 Sequoia St, Anytown, USA',
			description: 'A security specialist.',
			_id: '019'
		},
		{
			qty: 20,
			name: 'Riley Green',
			age: 35,
			email: 'riley.green@example.com',
			address: '1717 Redwood St, Othertown, USA',
			description: 'A system architect.',
			_id: '020'
		}
	];
</script>

<div class="p-10">
	<div class="my-3">
		<PasswordField label="Enter Password" name="password" />
	</div>

	<div class="my-3">
		<ComboboxField
			bind:value={comboValue}
			label="Combobox"
			name="combobox"
			items={comboItems}
			hasPrimitiveData
			hasItemsCheckbox
			hasDropdownHeaderSearch
			hasDropdownHeader
			searchClassName="!rounded-full"
			floatingLabel
			displayItemsCount={2}
			multiple
		/>
	</div>

	<div class="my-3">
		<ComboboxField
			bind:value={comboValue2}
			displayFieldName="name"
			displayItemsCount={3}
			floatingLabel
			hasDropdownHeader
			hasDropdownHeaderSearch
			hasItemsCheckbox
			identityFieldName="_id"
			items={comboItems2}
			itemSubtitleFieldName="description"
			itemTitleFieldName="name"
			label="Combobox2"
			multiple
			name="combobox2"
			searchClassName="!rounded-full"
			searchFieldName="name"
			showChip
			chipClassName="text-xs"
			size="xs"
		/>
	</div>
</div>
