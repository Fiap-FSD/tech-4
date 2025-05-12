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
  PostDetail: { id: string }; // Aqui definimos que PostDetail espera um `id`
  EditPostScreen: { postId: string }; // Aqui definimos que Edit espera um `postId`
};