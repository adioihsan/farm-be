export interface RegisterRequestDTO {
  email: string;
  name:string;
  password: string;
  confirmPassword:string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterResponseDTO {
  id: string;
  email: string;
  createdAt: Date;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  createdAt: Date;
}


export interface LoginResponseDTO {
  token: string;
}
