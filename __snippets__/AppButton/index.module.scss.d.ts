export type Styles = {
  buttonBlue: string;
  mySpecialStyle: string;
  mySpecialTitle: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
