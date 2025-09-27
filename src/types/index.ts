// filepath: c:\Users\28187\Desktop\myWeb\src\types\index.ts

export interface TempText {
  name: string;
  age: number;
  jianjie: string;
}

export interface Icon {
  name: string;
  icon: string;
  url: string;
}

export interface Audio {
  name: string;
  artist: string;
  url: string;
  cover: string;
}
export interface Document {
  id: number;
  title: string;
  file_path: string;
  html_path: string;
  tags: string[];
  file_size: number;
  proportional_content:string
}
