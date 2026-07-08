
export function getStatusBadgeVariant (status: string): 'default' | 'secondary' | 'destructive' | 'outline'{
  switch (status) {
    case 'Accepted':
      return 'default';
    case 'Wrong Answer':
    case 'Runtime Error':
      return 'destructive';
    default:
      return 'outline';
  }
};