import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";

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
    <div className="min-h-screen bg-background">
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Card className="w-full max-w-md space-y-6 overflow-hidden glass-card border-0 p-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Connexion
            </h1>
            <p className="text-sm text-muted-foreground">
              Connectez-vous pour accéder à votre espace
            </p>
          </div>
          
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              extend: true,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(240 58% 70%)',
                    brandAccent: 'hsl(240 58% 65%)',
                  }
                }
              },
              className: {
                container: 'space-y-4',
                button: 'w-full',
                input: 'rounded-md border-input bg-background',
                label: 'hidden',
                anchor: 'last:hidden',
              }
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: '',
                  password_label: '',
                  email_input_placeholder: 'Email',
                  password_input_placeholder: 'Mot de passe',
                  button_label: 'Se connecter',
                  loading_button_label: 'Connexion en cours...',
                  social_provider_text: 'Se connecter avec {{provider}}',
                },
                forgotten_password: {
                  link_text: 'Mot de passe oublié ?',
                  email_label: '',
                  password_label: '',
                  email_input_placeholder: 'Email',
                  button_label: 'Envoyer les instructions',
                  loading_button_label: 'Envoi des instructions...',
                  confirmation_text: 'Vérifiez vos emails pour réinitialiser votre mot de passe',
                },
              },
            }}
            theme="light"
            providers={[]}
            view="sign_in"
            showLinks={true}
          />
        </Card>
      </div>
    </div>
  );
}