export interface ModuleRef {
  id: string;
  title: string;
}

export interface Course {
  id: string;
  title: string;
  desc: string;
  image: string;
  level: string;
  duration: string;
  students: string;
  instructor: string;
  role: string;
  outcomes: string[];
  modules: ModuleRef[];
}
