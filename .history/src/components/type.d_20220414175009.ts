export interface items {
    flags: string;
    name: string;
    population: number;
    region: string;
    capital: string[];
}
interface dynamic {
    [key:string]: {
        official: string;
        common: string;
    };
}
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
    currencies : [];//1
    languages: [];//2
    borderCountries: string[];
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
    languages: string[];
    borders: string[];
}