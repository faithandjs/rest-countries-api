export interface items {
    flags: string;
    name: string;
    population: number;
    region: string;
    capital: string[];
}
export interface arrItem {
    flags: {
        png: string;
    };
    name: {
        common:string;
    };
    population: number;
    region: string;
    capital: [];
}
export interface contextType {
    data: arrItem[];
    details: detailsType;
    currentIcons: { src: string; arrow: string; };
    changeClasses: () => void;
    settingDetails: (n: number) => void;
}
export interface detailsType{
    flag: string;
    name: string;
    nativeName: string;
    population: string;
    region: string;
    subRegion: string;
    capital: string;
    tld: string;
    currencies: string[];
    languages: string[];
    borderCountries: string[];
}