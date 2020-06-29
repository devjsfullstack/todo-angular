export interface Data{
  _id?: string;
  name?: string;
}

export interface Todos {
  doc: Data[];
  current: number;
  pages: number;
}

export interface Todo {
  error?: {
    required?: string,
    invalid?: string
  },
  name?: string;
}
