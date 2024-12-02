import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/equipe");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white rounded-lg shadow-sm border border-border p-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Connexion
          </h1>
          <p className="text-content-tertiary">
            Connectez-vous pour accéder à votre espace
          </p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#8989DE',
                  brandAccent: '#7171d1',
                }
              }
            },
            className: {
              container: 'space-y-4',
              button: 'w-full',
              input: 'rounded-md border-input bg-white',
            }
          }}
          theme="light"
          providers={[]}
          view="sign_in"
        />
      </div>
    </div>
  );
}