"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@mui/material";

export function Home() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <>
          <pre>{JSON.stringify(session.user, null, 2)}</pre>
          <Button
            variant="contained"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            signIn();
          }}
        >
          Sign in
        </Button>
      )}
    </>
  );
}
