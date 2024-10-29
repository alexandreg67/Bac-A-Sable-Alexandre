export interface Repo {
  id: string;
  name: string;
  url: string;
  isPrivate?: number;
  status: { id: number; label: string };
  langs: { id: number; label: string }[];
  comments?: Comment[] | null;
}

export interface Lang {
  id: number;
  label: string;
}
