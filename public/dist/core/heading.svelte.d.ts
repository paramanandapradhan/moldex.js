interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports;
    z_$$bindings?: Bindings;
}
declare const Heading: $$__sveltets_2_IsomorphicComponent<{
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children?: any;
    style?: string;
    clazz?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type Heading = InstanceType<typeof Heading>;
export default Heading;
