import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative">
        <Card className="ring-1 ring-foreground/10 rounded-xl">
          <CardContent className="p-8 text-center">
            <div className="text-7xl font-bold text-muted-foreground/30 mb-4">
              404
            </div>
            <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
