import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound({ message }: { message?: string }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="text-6xl font-bold text-muted-foreground/30">404</div>
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground text-center max-w-md">
        {message || "The page you're looking for doesn't exist or has been moved."}
      </p>
      <Button
        variant="outline"
        className="gap-2 mt-2"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4" />
        Go Home
      </Button>
    </div>
  );
}
