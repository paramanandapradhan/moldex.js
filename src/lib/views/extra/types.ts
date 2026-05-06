export type Country = {
    isoCode: string;
    dialCode: string;
    name: string;
};

export type Currency = {
    code: string;
    name: string;
    symbol: string;
};

export type Timezone = {
    name: string;
    offset: string;
    offsetMinutes: number;
    longName: string;
    city: string;
    region: string;
};

export type DateTimeFormat = {
    format: string;
    group: 'date' | 'time' | 'datetime';
    preview?: string;
};
