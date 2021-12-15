import React from 'react';

export type LoginProps = { email: string; password: string };

export type LoginPageProps = React.FC<{
  login: (payload: LoginProps) => Promise<void>;
}>;
