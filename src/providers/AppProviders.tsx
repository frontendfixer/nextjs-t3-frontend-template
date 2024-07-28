'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Toaster } from '~/components/ui/toaster';
import { useToast } from '~/components/ui/use-toast';

import QueryProvider from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

export interface App {
  toastPrimary: (message: string, title?: string) => void;
  toastSuccess: (message: string, title?: string) => void;
  toastError: (message: string, title?: string) => void;
  toastWarn: (message: string, title?: string) => void;
  replaceTo: (destination: string) => void;
  goTo: (destination: string) => void;
  reload: () => void;
}

interface AppContextProps {
  app: App;
}

const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export function useAppContext() {
  return React.useContext(AppContext);
}

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const app: App = {
    toastPrimary: (message: string, title?: string) => {
      toast({
        title: title,
        description: message,
      });
    },
    toastSuccess: (message: string, title?: string) => {
      toast({
        variant: 'success',
        title: title,
        description: message,
      });
    },
    toastError: (message: string, title?: string) => {
      toast({
        variant: 'destructive',
        title: title,
        description: message,
      });
    },
    toastWarn: (message: string, title?: string) => {
      toast({
        variant: 'warning',
        title: title,
        description: message,
      });
    },

    replaceTo: (destination: string) => {
      router.replace(destination);
    },
    goTo: (destination: string) => {
      router.push(destination);
    },
    reload: () => {
      router.refresh();
    },
  };
  return (
    <AppContext.Provider value={{ app }}>
      <ThemeProvider>
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
      <Toaster />
    </AppContext.Provider>
  );
}
