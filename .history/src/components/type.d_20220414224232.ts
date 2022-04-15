export interface items {
    flags: string;
    name: string;
    population: number;
    region: string;
    capital: string[];
}
export interface dynamic {
    [key:string]: {
        [key:string]: string;
        [key:string]: string;
    };
}
export interface currentIconsType {
    src: string;
    arrow: string;
    text: string;
}
//interface dArr [key: string]: string
export interface arrItem {
    flags: {
        png: string;
        svg: string;
    };
    name: {
        common:string;
        nativeName: { dynamic};
    };
    population: number;
    region: string;
    subregion: string;
    capital: [];
    tld: [];
    currencies : { dynamic};//1
    languages: {};//2
    borders: string[];
}
export interface contextType {
    data: arrItem[];
    details: detailsType;
    currentIcons: { src: string; arrow: string; };
    changeClasses: () => void;
    settingDetails: (obj: items) => void;
}
export interface detailsType{
    flag: string;
    name: string;
    nativeName: string;
    population: number;
    region: string;
    subRegion: string;
    capital: string[];
    tld: string[];
    currencies: string[];
    languages: {};
    borders: string[];
}