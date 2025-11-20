import type { DialogSizeEnum, OutputImageFormats } from "$lib/services";
import type { Snippet } from "svelte";

export type CropperDialogProps = {
    outputAspectRatio?: number;
    outputWidth?: number;
    outputFormat?: OutputImageFormats;
    outputQuality?: number;
    outputType?: 'file' | 'base64';
    inputImageFile?: File | null;
    className?: string;
};

export type DialogCloseButtonClickFunction = (ev: MouseEvent | TouchEvent) => Promise<boolean>;

export type DialogSize =
    | DialogSizeEnum.XS
    | DialogSizeEnum.SM
    | DialogSizeEnum.MD
    | DialogSizeEnum.LG
    | DialogSizeEnum.XL
    | DialogSizeEnum.FULL;

export type DialogProps = {
    backdropClassName?: string;
    bodyClassName?: string;
    bodyComponent?: any;
    cancelable?: boolean;
    scrollable?: boolean;
    children?: Snippet;
    className?: string;
    component?: any;
    containerClassName?: string;
    footerClassName?: string;
    footerCloseButtonClassName?: string;
    footerCloseButtonLabel?: string;
    footerOkButtonClassName?: string;
    footerOkButtonEnabled?: boolean;
    footerOkButtonSpinner?: boolean;
    footerOkButtonType?: 'button' | 'submit' | 'reset';
    footerOkButtonLabel?: string;
    hasFooter?: boolean;
    hasFooterCloseButton?: boolean;
    hasFooterOkButton?: boolean;
    hasFooterShadow?: boolean;
    hasHeader?: boolean;
    hasHeaderBack?: boolean;
    hasHeaderClose?: boolean;
    hasHeaderShadow?: boolean;
    hasSubtitle?: boolean;
    hasTitle?: boolean;
    hasHeaderOkButton?: boolean;
    headerBackButtonClassName?: string;
    headerBackIconClassName?: string;
    headerBackIconPath?: string;
    headerClassName?: string;
    headerCloseButtonClassName?: string;
    headerCloseIconClassName?: string;
    headerCloseIconPath?: string;
    headerOkButtonClassName?: string;
    headerOkButtonLabel?: string;
    headerOkButtonIconPath?: string;
    headerOkButtonIconClassName?: string;
    id?: string;
    onClose?: () => void;
    onCloseClick?: DialogCloseButtonClickFunction;
    onOkClick?: (ev: MouseEvent | TouchEvent, options: DialogExports) => void;
    onResult?: (value: any) => void;
    onData?: (data: any) => void;
    props?: any;
    size?: DialogSize;
    targetFormId?: string;
    subtitle?: string;
    subtitleClassName?: string;
    title?: string;
    titleClassName?: string;
};

export type DialogExports = {
    closeDialog: (result?: any) => void;
    setResult: (result: any) => void;
    setOkSpinner: (enable: boolean) => void;
    setOkEnabled: (enable: boolean) => void;
    setOnOkClick: (onclick: (ev: MouseEvent | TouchEvent) => void) => void;
    setOnCloseClick: (onclick: DialogCloseButtonClickFunction) => void;
    setOnData: (listener: (data: any) => void) => void;
    setHeaderSnippet: (snippet: Snippet) => void;
    setFooterSnippet: (snippet: Snippet) => void;
    setDialogTitle: (title: string) => void;
};

export type PickerDialogProps = {
		items?: string[] | any[];
		multiple?: boolean;
		value?: any;
		identityFieldName?: string;
		titleFieldName?: string;
		searchFieldName?: string;
		subtitleFieldName?: string;
		hasCheckbox?: boolean;
		hasArrow?: boolean;
		maxlength?: number;
		maxlengthMsg?: string;
		checkboxIconPath?: string;
		uncheckboxIconPath?: string;
		checkboxIconClassName?: string;
		uncheckboxIconClassName?: string;
		checkboxClassName?: string;
		arrowIconPath?: string;
		arrowClassName?: string;
		hasIcon?: boolean;
		iconPath?: string;
		iconClassName?: string;
		isCircularIcon?: boolean;
		circularIconClassName?: string;
		itemTileSnippet?: Snippet<[item: any, index: number]>;
	};