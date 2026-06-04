import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function apiRequest<TRequest, TResponse>(
  endpoint: string,
  data: TRequest,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );

    const payload: ApiResponse<TResponse> =
      await res.json();

    if ('code' in payload) {
      return { ok: false, error: payload.message };
    }

    return { ok: true, data: payload };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : 'Something went wrong',
    };
  }
}

export function createAuthenticatedHandler<T>(
  endpoint: string,
) {
  return async (req: NextRequest) => {
    try {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token?.accessToken) {
        return NextResponse.json(
          {
            message: 'token not provided',
            code: 401,
          },
          { status: 401 },
        );
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          token: token.accessToken as string,
        },
      });

      const data: ApiResponse<T> = await response.json();

      if ('code' in data) {
        return NextResponse.json(
          {
            message: data.message,
            code: data.code,
          },
          { status: data.code },
        );
      }

      return NextResponse.json(data);
    } catch (error) {
      console.error('API Handler Error:', error);
      return NextResponse.json(
        {
          message:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred',
          code: 500,
        },
        { status: 500 },
      );
    }
  };
}
