
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Edit, 
  Copy, 
  Trash2, 
  MoreVertical, 
  Eye, 
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SavedFlow } from '@/pages/Messaging';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

interface SavedFlowsListProps {
  flows: SavedFlow[];
  isLoading: boolean;
  onLoadFlow: (flow: SavedFlow) => void;
  onDuplicateFlow: (flow: SavedFlow) => void;
  onDeleteFlow: (flowId: string) => void;
}

const SavedFlowsList: React.FC<SavedFlowsListProps> = ({
  flows,
  isLoading,
  onLoadFlow,
  onDuplicateFlow,
  onDeleteFlow
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewFlow, setPreviewFlow] = useState<SavedFlow | null>(null);
  
  // Filter flows based on search term
  const filteredFlows = flows.filter(flow => 
    flow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (flow.description && flow.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'draft':
        return 'bg-yellow-500';
      case 'archived':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (flows.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md">
        <p className="text-muted-foreground">No saved flows found. Create a flow in the Outreach Flow tab.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search flows..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Flows table */}
      <ScrollArea className="h-[500px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flow Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFlows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No flows match your search. Try a different term.
                </TableCell>
              </TableRow>
            ) : (
              filteredFlows.map((flow) => (
                <TableRow key={flow.id} className="hover:bg-muted/50 cursor-pointer" onClick={() => onLoadFlow(flow)}>
                  <TableCell className="font-medium">{flow.name}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(flow.status)} hover:${getStatusColor(flow.status)}`}>
                      {flow.status.charAt(0).toUpperCase() + flow.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(flow.createdAt)}</TableCell>
                  <TableCell>{formatDate(flow.updatedAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onLoadFlow(flow);
                        }}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          setPreviewFlow(flow);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onDuplicateFlow(flow);
                        }}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteFlow(flow.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      
      {/* Flow preview dialog */}
      {previewFlow && (
        <Dialog open={!!previewFlow} onOpenChange={() => setPreviewFlow(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{previewFlow.name}</DialogTitle>
              <DialogDescription>
                {previewFlow.description || 'No description provided'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="bg-muted p-4 rounded-md h-[400px] overflow-auto">
                <h3 className="text-lg font-semibold mb-2">Flow Details</h3>
                <div className="space-y-2">
                  <p><strong>Status:</strong> {previewFlow.status.charAt(0).toUpperCase() + previewFlow.status.slice(1)}</p>
                  <p><strong>Created:</strong> {formatDate(previewFlow.createdAt)}</p>
                  <p><strong>Last Modified:</strong> {formatDate(previewFlow.updatedAt)}</p>
                  <p><strong>Nodes:</strong> {previewFlow.flow.nodes.length}</p>
                  <p><strong>Connections:</strong> {previewFlow.flow.edges.length}</p>
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">Flow Structure</h3>
                <div className="space-y-2">
                  {previewFlow.flow.nodes.map((node, index) => (
                    <div key={node.id} className="bg-background p-3 rounded border">
                      <p><strong>Node {index + 1}:</strong> {node.data?.label || node.type}</p>
                      {node.data?.message && <p className="text-sm text-muted-foreground mt-1">{node.data.message}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setPreviewFlow(null)}>
                Close
              </Button>
              <Button onClick={() => {
                onLoadFlow(previewFlow);
                setPreviewFlow(null);
              }}>
                Edit This Flow
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SavedFlowsList;
