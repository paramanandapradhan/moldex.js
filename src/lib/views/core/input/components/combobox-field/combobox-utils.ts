/**
 * Pure selection helpers for ComboboxField. Kept framework-free so the
 * selection rules (single vs multiple, add/toggle/remove, value shape) can be
 * unit-tested deterministically without a browser.
 *
 * Value shape contract (matches the component):
 *  - single mode  → the selected id, or `null` when nothing is selected
 *  - multiple mode → an array of ids (always an array, even for one item), or
 *    `null` when the selection becomes empty
 */

type SelectionArgs = { currentValue: unknown; id: unknown; multiple?: boolean };

function toSet(currentValue: unknown): Set<unknown> {
	if (currentValue == null) return new Set();
	return new Set(Array.isArray(currentValue) ? currentValue : [currentValue]);
}

function toValue(set: Set<unknown>, multiple?: boolean): unknown {
	const arr = Array.from(set);
	if (!arr.length) return null;
	return multiple ? arr : arr[0];
}

/**
 * Applies a click on `id`. In multiple mode the id is toggled; in single mode it
 * replaces the current selection.
 */
export function toggleSelection({ currentValue, id, multiple }: SelectionArgs): unknown {
	const set = toSet(currentValue);
	if (multiple) {
		if (set.has(id)) set.delete(id);
		else set.add(id);
	} else {
		set.clear();
		set.add(id);
	}
	return toValue(set, multiple);
}

/** Removes `id` from the current selection (used by chip removal). */
export function removeSelection({ currentValue, id, multiple }: SelectionArgs): unknown {
	const set = toSet(currentValue);
	set.delete(id);
	return toValue(set, multiple);
}
