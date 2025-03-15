
import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  BarChart3, 
  PieChart, 
  LineChart,
  Users, 
  MessageSquare,
  Download,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReportsDashboard from '@/components/reports/ReportsDashboard';
import CampaignReports from '@/components/reports/CampaignReports';
import LeadReports from '@/components/reports/LeadReports';
import TeamReports from '@/components/reports/TeamReports';
import MessagingReports from '@/components/reports/MessagingReports';
import ReportsFilters from '@/components/reports/ReportsFilters';

const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleExport = (format: 'csv' | 'pdf' | 'excel') => {
    console.log(`Exporting in ${format} format`);
    // In a real app, this would trigger an API call to generate the export
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-semibold">Reports & Analytics</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExport('csv')}
            >
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExport('excel')}
            >
              <Download className="h-4 w-4 mr-2" />
              Excel
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExport('pdf')}
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <ReportsFilters 
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedCampaigns={selectedCampaigns}
          setSelectedCampaigns={setSelectedCampaigns}
          selectedTeamMembers={selectedTeamMembers}
          setSelectedTeamMembers={setSelectedTeamMembers}
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
        />
      )}
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Campaign Reports</span>
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Lead Reports</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Team Performance</span>
          </TabsTrigger>
          <TabsTrigger value="messaging" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Messaging Reports</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="pt-4">
          <ReportsDashboard 
            dateRange={dateRange}
            selectedCampaigns={selectedCampaigns}
            selectedTeamMembers={selectedTeamMembers}
            selectedPlatforms={selectedPlatforms}
          />
        </TabsContent>
        
        <TabsContent value="campaigns" className="pt-4">
          <CampaignReports 
            dateRange={dateRange}
            selectedCampaigns={selectedCampaigns}
            selectedTeamMembers={selectedTeamMembers}
            selectedPlatforms={selectedPlatforms}
          />
        </TabsContent>
        
        <TabsContent value="leads" className="pt-4">
          <LeadReports 
            dateRange={dateRange}
            selectedCampaigns={selectedCampaigns}
            selectedTeamMembers={selectedTeamMembers}
            selectedPlatforms={selectedPlatforms}
          />
        </TabsContent>
        
        <TabsContent value="team" className="pt-4">
          <TeamReports 
            dateRange={dateRange}
            selectedCampaigns={selectedCampaigns}
            selectedTeamMembers={selectedTeamMembers}
            selectedPlatforms={selectedPlatforms}
          />
        </TabsContent>
        
        <TabsContent value="messaging" className="pt-4">
          <MessagingReports 
            dateRange={dateRange}
            selectedCampaigns={selectedCampaigns}
            selectedTeamMembers={selectedTeamMembers}
            selectedPlatforms={selectedPlatforms}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
