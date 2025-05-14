export interface IPost{
  _id?: string;
  title: string;
  author: string;
  content: string;
  intro: string;
  imageUrl: string;
  videoUrl: string;
}

export interface PostFormProps {
  initialData?: IPost;
  onSubmit: (values: IPost) => Promise<void>;
}

export interface IUser{
  _id?: string;
  name: string;
  email: string;
  role: string;
  senha: string;
}

export interface IUserEdit{
  _id?: string;
  name: string;
  currentPassword: string;
  password: string;
}

export interface UserFormProps {
  initialData?: IUserEdit;
  onSubmit: (values: IUserEdit) => Promise<void>;
}

export interface IAuthContextProps {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  name: string | null;
}

export type RootStackParamList = {
  Home: undefined;
  PostDetail: { id: string }; 
  EditPostScreen: { postId: string };
  EditAlunoScreen: { alunoId: string };
  AlunoDetail: { id: string };
  EditDocenteScreen: { professorId: string };
  DocenteDetail: { id: string }; 
};