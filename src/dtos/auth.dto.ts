export interface RegisterRequestDTO {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  id: string;
  email: string;
  createdAt: Date;
}

export interface UserDTO {
  id: string;
  email: string;
  createdAt: Date;
}


export interface LoginDTO {
  accessToken: string;
  refreshToken?: string;
}

export interface RefreshTokenDTO {
  accessToken: string;
  refreshToken?: string;
}


