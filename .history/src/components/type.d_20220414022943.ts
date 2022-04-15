
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
    selectedCountry: number;
    src: React.MutableRefObject<string>;
    back: React.MutableRefObject<string>;
    changeClasses: () => void;
    settingDetails: () => void;
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